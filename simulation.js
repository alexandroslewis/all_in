chrome.storage.local.get(['board','hands'], function(result) {
    var clear = document.querySelector('[title="Clear all inputs"]');
    clear.click();
    createSimulation(result.board, result.hands);
});

function createSimulation(ccards, pcards) {
    document.getElementById("gameSelector").value = "o85";
    document.getElementById("boardField").value = ccards;
    if(pcards.length>2){
        var toggle = document.getElementById("handToggler");
        toggle.click();
    }
    for(i=0;i<pcards.length;i++){
        var hIn = "h" + (i+1);
        document.getElementById(hIn).value = pcards[i];
        if(i == (pcards.length-1)){
            var submit = document.querySelector('[title="Simulate an all-in race"]');
            submit.click();
        }
    }
}