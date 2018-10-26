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

instantiateObservers();

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
    console.log(playerCardsArr);
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
        } console.log(communityCardsArr);
    } 
}