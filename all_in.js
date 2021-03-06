var config = {
  attributes: true,
  childList: true,
  characterData: true
};

var subtreeConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
};

var subnodeConfig = {
  childList: true,
  subtree: true
};

var ALLIN = false;
var PLAYEROBS = false;

// The idea is:
// First check for allins. Once allin is discovered.
// We monitor for non yellow backs. If real cards are present there is a showdown.
// Then we reset
// Potentially need to add the player cards to the community cards

var callback = function(mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (
      mutation.target.className == "player_name" &&
      mutation.target.innerText == "ALL IN"
    ) {
      console.log("Player went all in");
      observer.disconnect();
      ALLIN = true;
      PLAYEROBS = false;
      var playerIndCards = document.getElementsByClassName("noselect")[5][
        "childNodes"
      ][3]["children"];
      for (var i = 0; i < playerIndCards.length; i++) {
        observer.observe(playerIndCards[i], config);
      }
      playerNode = document.getElementById("player_cards");
      observer.observe(playerNode, subtreeConfig);
    } else if (mutation.target.className != "player_cards" && ALLIN == true) {
      // Check for yellow backs in player_cards. If yellow backs present then pass.
      // Else game is over and grab all cards
      var playerCards = document.getElementsByClassName("noselect")[5][
        "childNodes"
      ][3]["children"];
      let gameOver = true;
      if (!playerCards.length && PLAYEROBS == false) {
        //This only happens when ALLin player is uncalled and game has reset
        console.log("no length resetting script");
        observer.disconnect();
        instantiateObservers();
      } else if (playerCards.length > 0) {
        console.log("node triggered");
        // Only need to check first card
        for (var i = 0; i < playerCards.length; i++) {
          if (playerCards[i].alt == "X") {
            gameOver = false;
            break;
          }
        }
        if (gameOver == true) {
          //Game is over
          console.log("first card");
          console.log(playerCards[0]);
          console.log("game is all in");
          //grab hands and community cards
          var playerHands = document.getElementsByClassName("card");
          console.log("playerhands");
          console.log(playerHands);
          // var Ccards = getCommunityCards(
          //   document.getElementById("community_cards")
          // );
          // console.log("community cards");
          // console.log(Ccards);
          getCards(playerHands);
          console.log("resetting script");
          ALLIN = false;
          observer.disconnect();
          instantiateObservers();
        }
      }
    }
  }
};

var observer = new MutationObserver(callback);

function instantiateObservers() {
  console.log("working...");
  PLAYEROBS = true;
  var playerNames = document.getElementsByClassName("player_name");
  for (var i = 0; i < playerNames.length; i++) {
    observer.observe(playerNames[i], config);
  }
}

instantiateObservers();

function getCommunityCards(cards) {
  var communityCards = [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].style["display"] == "block") {
      var card = cards[i].alt;
      communityCards.push(card);
    }
  }
  return communityCards;
}

function getCards(cards) {
  var assetsArr = [];
  for (var i = 0; i < cards.length; i++) {
    // have to check whether the card is displayed or not
    if (cards[i].style["display"] == "block") {
      var imgUrl = cards[i].src;
      var imgUrlSpl = imgUrl.split("/");
      var card = imgUrlSpl[imgUrlSpl.length - 1];
      assetsArr.push(card);
      if (i == cards.length - 1) {
        console.log("prior to dictionary");
        console.log(assetsArr);
        var cardsArr = checkDictionary(assetsArr);
        saveSim(cardsArr);
      }
    }
  }
}

function checkDictionary(cards) {
  var cardValues = [];
  var dictionary = {
    "0.png": "2c",
    "1.png": "2d",
    "2.png": "2h",
    "3.png": "2s",
    "4.png": "3c",
    "5.png": "3d",
    "6.png": "3h",
    "7.png": "3s",
    "8.png": "4c",
    "9.png": "4d",
    "10.png": "4h",
    "11.png": "4s",
    "12.png": "5c",
    "13.png": "5d",
    "14.png": "5h",
    "15.png": "5s",
    "16.png": "6c",
    "17.png": "6d",
    "18.png": "6h",
    "19.png": "6s",
    "20.png": "7c",
    "21.png": "7d",
    "22.png": "7h",
    "23.png": "7s",
    "24.png": "8c",
    "25.png": "8d",
    "26.png": "8h",
    "27.png": "8s",
    "28.png": "9c",
    "29.png": "9d",
    "30.png": "9h",
    "31.png": "9s",
    "32.png": "Tc",
    "33.png": "Td",
    "34.png": "Th",
    "35.png": "Ts",
    "36.png": "Jc",
    "37.png": "Jd",
    "38.png": "Jh",
    "39.png": "Js",
    "40.png": "Qc",
    "41.png": "Qd",
    "42.png": "Qh",
    "43.png": "Qs",
    "44.png": "Kc",
    "45.png": "Kd",
    "46.png": "Kh",
    "47.png": "Ks",
    "48.png": "Ac",
    "49.png": "Ad",
    "50.png": "Ah",
    "51.png": "As"
  };
  for (var i = 0; i < cards.length; i++) {
    var cardValue = dictionary[cards[i]];
    cardValues.push(cardValue);
    if (i == cards.length - 1) {
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
  console.log("getGame");
  var info = document.getElementsByClassName("table_info")[0].textContent;
  if (
    info.indexOf("Omaha") > 0 &&
    info.indexOf("Hi-Lo") > 0 &&
    info.indexOf("5 Card") > 0
  ) {
    return "OmahaHiLo5";
  } else if (
    info.indexOf("Omaha") > 0 &&
    info.indexOf("Hi-Lo") > 0 &&
    info.indexOf("5 Card") < 0
  ) {
    return "OmahaHiLo";
  } else if (
    info.indexOf("Omaha") > 0 &&
    info.indexOf("5 Card") > 0 &&
    info.indexOf("Hi-Lo") < 0
  ) {
    return "OmahaHi5";
  } else if (
    info.indexOf("Omaha") > 0 &&
    info.indexOf("5 Card") < 0 &&
    info.indexOf("Hi-Lo") < 0
  ) {
    return "OmahaHi";
  } else if (info.indexOf("Holdem") > 0) {
    return "Holdem";
  }
}

function getCommunityCardsSize() {
  let communityCards = document.getElementById("community_cards")["children"];
  let count = 0;
  for (var i = 0; i < communityCards.length; i++) {
    if (communityCards[i].style["display"] == "block") {
      count++;
    }
  }
  console.log("community card length");
  console.log(count);
  return count;
}

function saveSim(cards) {
  var tableId = getTableId();
  var game = getGame();
  var totCCards = getCommunityCardsSize();
  console.log("saveSim");
  console.log(game);
  console.log(cards);
  chrome.storage.local.set({
    key: { id: tableId, game: game, cards: cards, totCCards: totCCards }
  });
}
