function saveSettings() {
    var settingsArr = [];
    for(var i = 0; i < checkboxes.length; i++){
        var checkbox = checkboxes[i];
        var optionObj = {"option":checkbox.value, "enabled":checkbox.checked};
        settingsArr.push(optionObj);
    }
    chrome.storage.sync.set({"settings":settingsArr});
}

restoreSettings();

function restoreSettings() {
    chrome.storage.sync.get(["settings"], function(result) {
        if(result.settings){
            var settings = result.settings;
            for(var i=0;i<settings.length;i++){
                document.querySelector("input[value='" + settings[i].option + "']").checked = settings[i].enabled;
            }
        } else {
            saveSettings();
        }
    });
}

var checkboxes = document.querySelectorAll("input[type=checkbox]");
for(var i = 0; i < checkboxes.length; i++){
    checkboxes[i].onclick = function(){
        saveSettings();
    };
}