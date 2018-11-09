alert("Watching for All In");

var config = {attributes: true, childList: true, characterData: true};

var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.target.className == "player_name" && mutation.target.innerText == 'ALL IN') {
            console.log("first player went all in");
            observer.disconnect();
            var cards = document.getElementById("community_cards");
            observer.observe(cards, config);
        } else if (mutation.target.id == 'community_cards' && mutation.target.childElementCount > 0) {
            console.log("game is all in");
            var assets = document.getElementsByClassName("card");
            getCards(assets);
        } else if (mutation.target.id == 'community_cards' && mutation.target.childElementCount == 0) {
            console.log("resetting script");
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

function getCards(cards) {
    var assetsArr = [];
    for(i=0;i<cards.length;i++){
        var imgUrl = cards[i].src
        var imgUrlSpl = imgUrl.split("/")
        var card = imgUrlSpl[imgUrlSpl.length-1];
        assetsArr.push(card);
        if(i == cards.length-1){
            var cardsArr = checkDictionary(assetsArr);
            saveSim(cardsArr);
        }
    }
}

function checkDictionary(cards) {
    var cardValues = [];
    var dictionary = { "0.png":"2c", "1.png":"2d", "2.png":"2h", "3.png":"2s", "4.png":"3c", "5.png":"3d", "6.png":"3h", "7.png":"3s", "8.png":"4c", "9.png":"4d", "10.png":"4h", "11.png":"4s", "12.png":"5c", "13.png":"5d", "14.png":"5h", "15.png":"5s", "16.png":"6c", "17.png":"6d", "18.png":"6h", "19.png":"6s", "20.png":"7c", "21.png":"7d", "22.png":"7h", "23.png":"7s", "24.png":"8c", "25.png":"8d", "26.png":"8h", "27.png":"8s", "28.png":"9c", "29.png":"9d", "30.png":"9h", "31.png":"9s", "32.png":"Tc", "33.png":"Td", "34.png":"Th", "35.png":"Ts", "36.png":"Jc", "37.png":"Jd", "38.png":"Jh", "39.png":"Js", "40.png":"Qc", "41.png":"Qd", "42.png":"Qh", "43.png":"Qs", "44.png":"Kc", "45.png":"Kd", "46.png":"Kh", "47.png":"Ks", "48.png":"Ac", "49.png":"Ad", "50.png":"Ah", "51.png":"As" };
    for(i=0;i<cards.length;i++){
        var cardValue = dictionary[cards[i]];
        cardValues.push(cardValue);
        if(i==cards.length-1){
            return cardValues;
        }
    }
}

function getTableId() {
    var url = location.href;
    var temp = url.split(":");
    var id = temp[2];
    return id;
}

function getGame() {
    var info = document.getElementsByClassName("table_info")[0].textContent;
    if(info.indexOf("Omaha")>0 && info.indexOf("Hi-Lo")>0 && info.indexOf("5")>0){
        return "OmahaHiLo5";
    } else if(info.indexOf("Omaha")>0 && info.indexOf("Hi-Lo") && info.indexOf("5")<0) {
        return "OmahaHiLo";
    }
}

function getCommunityCardsSize() {
    communityCards = document.getElementById("community_cards").childNodes;
    return communityCards.length;
}

function saveSim(cards){
    var tableId = getTableId();
    var game = getGame();
    var totCCards = getCommunityCardsSize();
    chrome.storage.local.set({"key":{"id":tableId,"game":game,"cards":cards, "totCCards":totCCards}});
}