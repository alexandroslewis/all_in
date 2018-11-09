chrome.runtime.onMessage.addListener(function(message){
    if(message == "runScript"){
        chrome.tabs.query({"currentWindow":true}, function(tab) {
            chrome.tabs.executeScript(tab[0].id, {file:"all_in.js"});
        });
    }
});

chrome.storage.onChanged.addListener(function(change){
    if(change.key.hasOwnProperty("newValue")){
        console.log(change.key);
        chrome.tabs.query({url:"http://propokertools.com/simulations"}, function (tab) {
            if(tab.length>0){
              var tabId = tab[0].id;
              chrome.tabs.update(tabId, {"active":true}, function(tab){
                chrome.tabs.executeScript(tab.id,{
                    file:"simulation.js"
                });
              });
            } else {
              chrome.tabs.create({ url: "http://propokertools.com/simulations" }, function(tab){
                var tabId = tab.id;
                chrome.tabs.executeScript(tabId, {
                    file:"simulation.js"
                });
              });
            }
        });
    }
});