var pptwin;
var kingwin;
document.getElementById("start-allin").onclick = function() {
  chrome.tabs.create({ url: "http://propokertools.com/simulations" });
  chrome.tabs.create({ url: "https://kingsclubpkr.com" });
};
//Below code is for testing purposes.
document.getElementById("test").onclick = checkDictionary;


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
}
