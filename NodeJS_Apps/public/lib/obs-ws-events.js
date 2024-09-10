obs.on("InputSettingsChanged", async function (event) {
    //console.log(event);
    switch (event.inputName) {
        case 'cursor':
            document.getElementById("obsws-mouse").innerHTML = event.inputSettings.text
            break;
        case 'hotkeyText':
            document.getElementById("obsws-keyboard").innerHTML = event.inputSettings.text
            break;
        default:
            break;
    }
})