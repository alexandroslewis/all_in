var config = {attributes: true, childList: true, characterData: true};

var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.target.className == "player_name" && mutation.target.innerText == 'ALL IN') {
            observer.disconnect();
            var communityCards = document.getElementById("community_cards");
            observer.observe(communityCards, config);
        } else if (mutation.target.id == 'community_cards' && mutation.target.childElementCount > 0) {
            console.log("all in detected")
            getPlayerCards();
            getCommunityCards();
        } else if (mutation.target.id == 'community_cards' && mutation.target.childElementCount == 0) {
            console.log("resetting script")
            observer.disconnect();
            instantiateObservers();
        }
    }
};

var observer = new MutationObserver(callback);

function instantiateObservers() {
    console.log("working...");
    var playerNames = document.getElementsByClassName("player_name");
    for(i=0;i<playerNames.length;i++){
        observer.observe(playerNames[i], config);
    }
}

instantiateObservers();

function getPlayerCards() {
    var playerCardsArr = [];
    var playerCards = document.getElementById("player_cards").childNodes;
    for(i=0;i<playerCards.length;i++){
        var imgUrl = playerCards[i].src
        var imgUrlSpl = imgUrl.split("/")
        var card = imgUrlSpl[imgUrlSpl.length-1];
        playerCardsArr.push(card);
    }
    checkDictionary(playerCardsArr, "play");
}
    

function getCommunityCards() {
    var communityCards = document.getElementById("community_cards").childNodes;
    if(communityCards.length > 0){
        var communityCardsArr = [];
        for(i=0;i<communityCards.length;i++){
            var imgUrl = communityCards[i].src
            var imgUrlSpl = imgUrl.split("/");
            var card = imgUrlSpl[imgUrlSpl.length-1];
            communityCardsArr.push(card);
        } 
        checkDictionary(communityCardsArr, "comm");
    } 
}

function checkDictionary(cards, type) {
    var ccardsstr = "";
    var playerHands = [];
    var dictionary = new XMLHttpRequest();
    dictionary.open("GET", chrome.runtime.getURL("dictionary.json"), true);
    dictionary.addEventListener("load", function() {
        dictionaryArr = JSON.parse(dictionary.response);
        if(type == "comm"){
          for(i=0;i<cards.length;i++){
            var cardValue = dictionaryArr[cards[i]];
            ccardsstr += cardValue;
            if(i==cards.length-1){
              chrome.storage.local.set({"board":ccardsstr});
            }
          }
        } else if(type == "play"){
            var hand = "";
            var handSize = 5;
            var numHands = (cards.length/handSize);
            for(i=0;i<cards.length;i++){
              var card = dictionaryArr[cards[i]];
              hand += card;
              if((i+1)%5==0){
                playerHands.push(hand);
                hand = "";
              }
              if(playerHands.length == numHands){
                chrome.storage.local.set({"hands":playerHands}, function(){
                  simReady();
                });
              }
            }
        }
    });
    dictionary.send();
  }
  
  function simReady() {
    chrome.storage.local.get(['hands','board'], function(result){
        if(result.hands && result.board){
          chrome.runtime.sendMessage("runSimulation");
        } else {
          console.error("Either board or hands did not store properly");
        }
    });
  }