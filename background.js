chrome.runtime.onMessage.addListener(function(message){
    if(message == "runSimulation"){
        chrome.tabs.query({url:"http://propokertools.com/simulations"}, function (tab) {
            if(tab.length>0){
                console.log(tab);
              var tabId = tab[0].id;
              chrome.tabs.update(tabId, {"active":true}, function(tab){
                chrome.tabs.executeScript({
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