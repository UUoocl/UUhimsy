<%*
const wssDetails = await tp.user.websocketDetails();
const obs = await tp.user.obsWebsocket(wssDetails)
let vaultPath = await tp.app.vault.adapter.basePath
vaultPath = `${vaultPath}/_scripts`

var previousPTZ ="";

const id = setInterval(async () => {
// getCurrentValues()
pt = await tp.user.getCameraPanTilt(vaultPath)
z = await tp.user.getCameraZoom(vaultPath)
ptzMessage = `${pt}${z}}`
console.log(ptzMessage)

//send results to text source
await obs.call("SetInputSettings", {
inputName: 'PTZ values',
inputSettings: {
text: `${ptzMessage}`,
}
});

//send results to OBS
if(ptzMessage != previousPTZ){
previousPTZ = ptzMessage
//send results to OBS Browser Source
await obs.call("CallVendorRequest", {
vendorName: "obs-browser",
requestType: "emit_event",
requestData: {
event_name: "ptz-message",
event_data: {ptzMessage},
},
});

}
}, 2000);
//clearInterval(id);
%>