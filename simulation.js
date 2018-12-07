chrome.storage.local.get(["key"], function(result) {
    clearSimulation();
    selectGame(result.key.game, result.key.cards, result.key.totCCards);
});

function clearSimulation() {
    var clear = document.querySelector('[title="Clear all inputs"]');
    clear.click();
}

function selectGame(game, cards, totCCards) {
    var numHands;
    if(game=="OmahaHiLo5"){
        document.getElementById("gameSelector").value = "o85";
        numHands = (cards.length - totCCards)/5;
        parseCards(cards, 5, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="OmahaHiLo"){
        document.getElementById("gameSelector").value = "o8";
        numHands = (cards.length - totCCards)/4;
        parseCards(cards, 4, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="OmahaHi5"){
        document.getElementById("gameSelector").value = "oh5";
        numHands = (cards.length - totCCards)/5;
        parseCards(cards, 5, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="OmahaHi"){
        document.getElementById("gameSelector").value = "oh";
        numHands = (cards.length - totCCards)/4;
        parseCards(cards, 4, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="Razz"){
        document.getElementById("gameSelector").value = "rz";
        numHands = (cards.length - totCCards)/7;
        parseCards(cards, 7, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="StudHi"){
        document.getElementById("gameSelector").value = "st";
        numHands = (cards.length - totCCards)/7;
        parseCards(cards, 7, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="StudHiLo"){
        document.getElementById("gameSelector").value = "s8";
        numHands = (cards.length - totCCards)/7;
        parseCards(cards, 7, totCCards, numHands);
        toggleHands(numHands);
    } else if (game=="Holdem"){
        document.getElementById("gameSelector").value = "he";
        numHands = (cards.length - totCCards)/2;
        parseCards(cards, 2, totCCards, numHands);
        toggleHands(numHands);
    }
}

function toggleHands(hands) {
    var toggle = document.getElementById("handToggler");
    if(hands>2 && toggle.innerText == "More hands"){
        toggle.click();
    } else if(hands==2 && toggle.innerText == "Fewer hands"){
        toggle.click();
    }
}

function parseCards(cards, handSize, totCCards, numHands) {
    var hands = [];
    var boards = [];
    var pcards = cards.slice(totCCards,cards.length);
    var ccards = cards.slice(0,totCCards);
    boards.push(ccards.slice(0,3));
    if(totCCards==7){
        boards.push(ccards.slice(0,4));
        ccards.splice(3,1);
        boards.push(ccards.slice(0,4));
    } else if(totCCards==10){
        boards.push(ccards.slice(0,4), ccards.slice(5,8), ccards.slice(5,9));
    } else {
        boards.push(ccards.slice(0,4));
    }
    for(var i=0;i<pcards.length;i+handSize){
        var hand = pcards.splice(i,i+handSize);
        hands.push(hand);
        if(hands.length==numHands){
            createSimulation(boards, hands);
        }
    } 
}

function createSimulation(boards, hands) {
    chrome.storage.local.clear();
    for(var i=0;i<boards.length;i++){
        clearSimulation();
        document.getElementById("boardField").value = boards[i].join("");
        submitSimulation(hands);
    }
}

function submitSimulation(hands) {
    for(var i=0;i<hands.length;i++){
        var hIn = "h" + (i+1);
        document.getElementById(hIn).value = hands[i].join("");
        if(i == (hands.length-1)){
            var submit = document.querySelector('[title="Simulate an all-in race"]');
            submit.click();
        }
    }
}


