chrome.runtime.onMessage.addListener(function(message, sender){
    if(message == "runScript"){
        chrome.tabs.executeScript(sender.tab.id, {file:"all_in.js"}, _=>{
            let e = chrome.runtime.lastError;
            if(e !== undefined){
                console.log(sender.tab.id, _, e);
            }
        });
    }
});

chrome.storage.onChanged.addListener(function(change){
    if(change.key && change.key.hasOwnProperty("newValue")){
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