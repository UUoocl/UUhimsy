var handEltWidth, handEltHeight, handCanvasElement;
console.log("hand-broadcast started");
//add canvas element
var handCanvasElement = document.createElement("canvas");
handCanvasElement.setAttribute("class", "output_canvas");
handCanvasElement.setAttribute("id", "hand_canvas");
handCanvasElement.setAttribute(
  "style",
  "height: 100px;"
);

document.getElementById("handLandmarks").append(handCanvasElement);

var v = document.getElementById("videoStream");

v.addEventListener(
  "loadedmetadata",
  function (e) {
    (handEltWidth = this.videoWidth), (handEltHeight = this.videoHeight);
    handCanvasElement.setAttribute("width", handEltWidth);
    handCanvasElement.setAttribute("height", handEltHeight);
  },
  false
);

import {
  HandLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "../mediapipe_tasks/tasks-vision/vision_bundle.mjs";
//console.log("listening for rtc-connected-",rtcID )
//console.log("Module started");

var handLandmarker = undefined;

async function createHandLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "mediapipe_tasks/tasks-vision/wasm"
  );
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `mediapipe_models/hand_landmarker.task`,
      delegate: "GPU",
    },
    runningMode: "VIDEO",
    numHands: 2,
  }).then((handLandmarker) => {
    var lastVideoTime = -1;
    let handLandmarkerResult = undefined;

    const video = document.getElementById("videoStream");
    const handCanvasElement = document.getElementById("hand_canvas");
    const canvasCtx = handCanvasElement.getContext("2d");
    const drawingUtils = new DrawingUtils(canvasCtx);

    renderLoop();

    function renderLoop() {
      let startTimeMs = performance.now();
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        handLandmarkerResult = handLandmarker.detectForVideo(
          video,
          startTimeMs
        );
        canvasCtx.save();
        canvasCtx.clearRect(
          0,
          0,
          handCanvasElement.width,
          handCanvasElement.height
        );

        if (handLandmarkerResult.landmarks) {
          for (const landmarks of handLandmarkerResult.landmarks) {
            drawingUtils.drawConnectors(
              landmarks,
              HandLandmarker.HAND_CONNECTIONS,
              {
                color: "#00FF00",
                lineWidth: 5,
              }
            );
            drawingUtils.drawLandmarks(landmarks, {
              color: "#FF0000",
              lineWidth: 2,
            });
          }

          let handLandmarkEventData = JSON.stringify(
            handLandmarkerResult.landmarks
          );
          //processResults(poseLandmarkerResult.landmarks[0]);
          //send results to OBS Browser Source
          obs.call("CallVendorRequest", {
            vendorName: "obs-browser",
            requestType: "emit_event",
            requestData: {
              event_name: "hand-landmarks",
              event_data: { handLandmarkEventData },
            },
          });

          //send results to Advanced Scene Switcher
          // const AdvancedSceneSwitcherMessage =
          // JSON.stringify(handLandmarkerResult);
          // obs.call("CallVendorRequest", {
          //   vendorName: "AdvancedSceneSwitcher",
          //   requestType: "AdvancedSceneSwitcherMessage",
          //   requestData: {
          //     message: AdvancedSceneSwitcherMessage,
          //   },
          // });
        }

        //console.log(handLandmarkerResult);
      }
      canvasCtx.restore();
      // Call this function again to keep predicting when the browser is ready.
      window.requestAnimationFrame(renderLoop);
    }
  });
}
createHandLandmarker();
