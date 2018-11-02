var config = {attributes: true, childList: true, characterData: true};

var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        console.log(mutation.target.innerText)
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

function checkDictionary(cards) {
    var cards = ["34.png","41.png", "7.png"];
    var type = "comm";
    var ccardsstr ="";
    var pcardsstr="";
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
          
        }
    });
    dictionary.send(); 
    chrome.storage.local.clear();
    chrome.storage.local.set({"hands":pcardsstr});
    chrome.storage.local.set({"board":ccardsstr});
    chrome.runtime.sendMessage("runSimulation");
}