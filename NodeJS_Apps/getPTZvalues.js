console.log("hello node");

var path = require('path');
const OBSWebSocket = require("obs-websocket-js").default;
var fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//const subProcess = require('child_process');

var websocketIP = "localhost";
var websocketPort = "4455";
var websocketPassword = process.argv[2];

startOBSconnection(
  websocketIP,
  websocketPort,
  websocketPassword,
);

var obs
async function startOBSconnection(
  websocketIP,
  websocketPort,
  websocketPassword,
) {
  
  /*
  *Connect this app to OBS
  * 
  */
 
 obs = new OBSWebSocket(websocketIP, websocketPort, websocketPassword);
 try {
   const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
     `ws://${websocketIP}:${websocketPort}`,
     websocketPassword,
     {
       rpcVersion: 1,
      }
    );
    console.log(
      `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
    );
  } catch (error) {
    console.error("Failed to connect", error.code, error.message);
  }
  obs.on("error", (err) => {
    console.error("Socket error:", err);
  });
  console.log(`ws://${websocketIP}:${websocketPort}`);
}

//get UVC camera values
async function getPT() {
  try {
    const { stdout, stderr } = await exec(`${__dirname}/uvc-util -I 0 -o pan-tilt-abs`);
    //console.log('stdout:', stdout);
    //console.log('stderr:', stderr);
    pt = stdout.toString();
    result = pt.replace(/\n/g,'').replace('{','{ actionName: "usbPTZ", ').replace('}',', zoom: ').replace(/=/g,': ').replace(/,/g,', ')
    return result;
    
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

async function getZ() {
  try {
    const { stdout, stderr } = await exec(`${__dirname}/uvc-util -I 0 -o zoom-abs`);
    //console.log('stdout:', stdout.replace(/\n/g, ""));
    //console.log('stderr:', stderr);
    return stdout.replace(/\n/g, "");
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

var previousPTZ ="";
const id = setInterval(async () => {
  //  getCurrentValues()
  pt = await getPT()
  z = await getZ()
  ptzMessage = `${pt}${z}}`
  console.log(ptzMessage)
  //send results to OBS
  if(ptzMessage != previousPTZ){
    previousPTZ = ptzMessage
     //send results to OBS Browser Source
     obs.call("CallVendorRequest", {
      vendorName: "obs-browser",
      requestType: "emit_event",
      requestData: {
        event_name: "ptz-position-message",
        event_data: { ptzMessage },
      },
    });
  }
}, 2000);

//clearInterval(id);