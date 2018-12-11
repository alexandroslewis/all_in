function init() {
    console.log('init')
    var config = {attributes: true, childList: true, characterData: true};
    var els = document.querySelectorAll(".table_info span");
    console.log('gametype')
    console.log(els[0].textContent)
    // var composeBox = document.querySelectorAll(".no")[2];
    // if(!els[0]) {
    //     console.log('node doesnt exist')

    //     setTimeout(function () {
    //         init()
    //     }, 5000);
    //     //The node we need does not exist yet.
    //     //Wait 500ms and try again
    //     // var observer = new MutationObserver(callback_parent);
    //     // window.setTimeout(init,500);
    //     return;
    // } else {
    console.log('observer triggered')
    observer.observe(els[0], config);
    checkTable(els[0].textContent)
// }
}

// var callback_parent = function(mutationsList, observer) {
//     console.log('callback parent')
//     for(var mutation of mutationsList) {
//         if(mutation.addedNodes.length>0){
//             var els = document.querySelectorAll(".table_info span");
//             // var table = mutation.addedNodes[0].textContent;
//             if(els[0]){
//                 init();
//             }
//         }
//     }
// }

var callback = function(mutationsList, observer) {
    console.log('callback')
    for(var mutation of mutationsList) {
        if(mutation.addedNodes.length>0){
            var table = mutation.addedNodes[0].textContent;
            if(table.indexOf("Omaha") > 0 || table.indexOf("Holdem") > 0){
                checkTable(table);
            }
        }
    }
}
console.log('table checker')
var observer = new MutationObserver(callback);
// var observer2 =  new MutationObserver(callback_parent);
// window.onload = function () { 
//     init ();
    // alert("It's loaded!") 
// }
init ();

// function checkTable(table) {
//     console.log('checkTables')
//     console.log('OmahaHiLo5')
//     console.log(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")>0)
//     console.log('OmahaHiLo4')
//     console.log(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")<0)
//     console.log('OmahaHi5')
//     console.log(table.indexOf("Omaha")>0 && table.indexOf("5 Card")>0)
//     console.log('OmahaHi4')
//     console.log(table.indexOf("Omaha")>0)
//     console.log('Holdem')
//     console.log(table.indexOf("Holdem")>0)
//     if(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")>0){
//         chrome.runtime.sendMessage("runScript");
//     } else if(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")<0){
//         chrome.runtime.sendMessage("runScript");
//     } else if(table.indexOf("Omaha")>0 && table.indexOf("5 Card")>0){
//         chrome.runtime.sendMessage("runScript");
//     } else if(table.indexOf("Omaha")>0){
//         chrome.runtime.sendMessage("runScript");
//     } else if(table.indexOf("Holdem")>0){
//         chrome.runtime.sendMessage("runScript");
//     }
// }
function checkTable(table) {
    console.log('checkTables')
    console.log('OmahaHiLo5')
    console.log(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")>0)
    console.log('OmahaHiLo4')
    console.log(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")<0)
    console.log('OmahaHi5')
    console.log(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")<0 && table.indexOf("5 Card")>0)
    console.log('OmahaHi4')
    console.log(table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")<0 && table.indexOf("5 Card")<0)
    console.log('Holdem')
    console.log(table.indexOf("Holdem")>0)
    chrome.storage.sync.get(["settings"], function(result) {
        if(result.settings){
            var settings = result.settings;
            for(var i=0;i<settings.length;i++){
                if(settings[i].enabled == true){
                    if(settings[i].option == 1 && table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")>0){
                        chrome.runtime.sendMessage("runScript");
                    } else if(settings[i].option == 2 && table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")>0 && table.indexOf("5 Card")<0){
                        chrome.runtime.sendMessage("runScript");
                    } else if(settings[i].option == 3 && table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")<0 && table.indexOf("5 Card")>0){
                        chrome.runtime.sendMessage("runScript");
                    } else if(settings[i].option == 4 && table.indexOf("Omaha")>0 && table.indexOf("Hi-Lo")<0 && table.indexOf("5 Card")<0){
                        chrome.runtime.sendMessage("runScript");
                    } else if(settings[i].option == 5 && table.indexOf("Holdem")>0){
                        chrome.runtime.sendMessage("runScript");
                    }
                }
            }
        } else {
            console.err("Extension settings have not been saved.")
        }
    });
}