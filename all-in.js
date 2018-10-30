function checkWin() {
    url = window.location.href;
    if(url.indexOf("?mode=table")>0){
        instantiateObservers();
    }
}

checkWin();

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
    var playerNames = document.getElementsByClassName("player_name");
    for(i=0;i<playerNames.length;i++){
        observer.observe(playerNames[i], config);
    }
}

//instantiateObservers(); //For Testing

function getPlayerCards() {
    var playerCardsArr = [];
    var playerCards = document.getElementById("player_cards").childNodes;
    for(i=0;i<playerCards.length;i++){
        var imgUrl = playerCards[i].src
        var imgUrlSpl = imgUrl.split("/")
        var card = imgUrlSpl[imgUrlSpl.length-2]+":"+imgUrlSpl[imgUrlSpl.length-1];
        playerCardsArr.push(card);
        }
    }
    checkDictionary(playerCardsArr);
}

function getCommunityCards() {
    var communityCards = document.getElementById("community_cards").childNodes;
    if(communityCards.length > 0){
        var communityCardsArr = [];
        for(i=0;i<communityCards.length;i++){
            var imgUrl = communityCards[i].src
            var imgUrlSpl = imgUrl.split("/");
            var card = imgUrlSpl[imgUrlSpl.length-2]+":"+imgUrlSpl[imgUrlSpl.length-1];
            communityCardsArr.push(card);
        } 
        checkDictionary(communityCardsArr);
    } 
}

function checkDictionary(cards) {
    var dictionary = new XMLHttpRequest();
    dictionary.open("GET","dictionary.csv");
    dictionary.addEventListener("load", function() {
        initialArray = JSON.parse(dictionary.response);
        console.log(initialArray);
    });
    dictionary.send();
}

function createSimulation(ccards, pcards) {
    if(!window.open("","com_poker_simualtionwindow")){
        var pptwin = window.open("propokertools.com/simulations", "com_poker_simualtionwindow");
    } else {
        var pptwin = window.open("","com_poker_simualtionwindow");
    }
    pptwin.focus();
    pptwin.onload = function() {
        clearAllInputs();
        pptwin.document.getElementById("gameSelector").value = "o85";
        pptwin.document.getElementById("boardField").value = ccards;
        if(pcards.length>2){
            toggleHands();
        }
        for(i=0;i<pcards.length;i++){
            var hIn = "h" + (i+1);
            pptwin.document.getElementById(hIn).value = pcards[i];
            if(i == (pcards.length-1)){
                addSimResults();
            }
        }
    }

}