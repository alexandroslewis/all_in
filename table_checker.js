var config = {attributes: true, childList: true, characterData: true};

function checkTable() {
    var els = document.querySelectorAll(".table_info span");
    observer.observe(els[0], config);
    
}

var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if(mutation.addedNodes.length>0){
            var game = mutation.addedNodes[0].textContent;
            if(game.indexOf("Omaha") > 0 || game.indexOf("Holdem")>0){
                chrome.runtime.sendMessage("runScript");
            }
        }
    }
}

var observer = new MutationObserver(callback);

checkTable();