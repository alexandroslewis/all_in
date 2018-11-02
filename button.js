var pptwin;
var kingwin;
document.getElementById("start-allin").onclick = function() {
  chrome.tabs.create({ url: "http://propokertools.com/simulations" });
  chrome.tabs.create({ url: "https://kingsclubpkr.com" });
};