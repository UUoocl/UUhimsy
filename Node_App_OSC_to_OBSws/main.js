console.log("hello node");

var { Client, Server, Message } = require("node-osc");
const OBSWebSocket = require("obs-websocket-js").default;

var websocketIP = "localhost";
var websocketPort = "4455";
var websocketPassword = "q3APlBJmKTmXojSl";
var oscIP = "localhost";
var oscInPORT = "4466";
var oscOutPORT = "4477";

setOSCconnection(
  websocketIP,
  websocketPort,
  websocketPassword,
  oscIP,
  oscInPORT,
  oscOutPORT
);

async function setOSCconnection(
  websocketIP,
  websocketPort,
  websocketPassword,
  oscIP,
  oscInPORT,
  oscOutPORT
) {
  
  /*
   *Connect this app to OBS
   * 
   */

  const obs = new OBSWebSocket(websocketIP, websocketPort, websocketPassword);
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
    //document.title = "connection set";
  } catch (error) {
    console.error("Failed to connect", error.code, error.message);
  }
  obs.on("error", (err) => {
    console.error("Socket error:", err);
  });
  console.log(`ws://${websocketIP}:${websocketPort}`);


/*
 *Create an OSC Server connection
 *OSC app -- to--> OBS
 */

var oscServer = new Server(oscInPORT, oscIP);

oscServer.on("listening", () => {
  console.log("OSC Server is listening.");
});

oscServer.on("message", (msg) => {
  console.log(`Message: ${msg}`);
  sendToOBS(msg, obs, "osc-message");
});

function sendToOBS(msgParam, obsParam, eventName) {
    console.log("sending message:", JSON.stringify(msgParam));
    const webSocketMessage = JSON.stringify(msgParam);
    //send results to OBS Browser Source
    obsParam.call("CallVendorRequest", {
      vendorName: "obs-browser",
      requestType: "emit_event",
      requestData: {
        event_name: eventName,
        event_data: { webSocketMessage },
      },
    });
  }

  /*
   *Create OSC Client Out Port
   *message from OBS --to--> OSC app
   */
   const oscClient = new Client(oscIP, oscOutPORT);
   console.log("oscClient", oscClient, oscIP, oscOutPORT, oscInPORT);
 
   obs.on("CustomEvent", function (event) {
     console.log("Message from OBS",event);
     if (event.event_name === "OSC-out") {
       const message = new Message(event.address);
       if (Object.hasOwn(event, "arg1")) {
         message.append(event.arg1);
         console.log("arg1", message);
       }
       if (Object.hasOwn(event, "arg2")) {
         message.append(event.arg2);
         console.log(message);
       }
       if (Object.hasOwn(event, "arg3")) {
         message.append(event.arg3);
         console.log(message);
       }
       if (Object.hasOwn(event, "arg4")) {
         message.append(event.arg4);
         console.log(message);
       }
       if (Object.hasOwn(event, "arg5")) {
         message.append(event.arg5);
         console.log(message);
       }
       if (Object.hasOwn(event, "arg6")) {
         message.append(event.arg6);
         console.log(message);
       }
       if (Object.hasOwn(event, "arg7")) {
         message.append(event.arg7);
         console.log(message);
       }
       console.log("message to OSC device", message);
       oscClient.send(message, (err) => {
         if (err) {
           console.error(new Error(err));
         }
       });
       //client.send(`${event.command} "${event.data}"`)
     }
  });
 }
