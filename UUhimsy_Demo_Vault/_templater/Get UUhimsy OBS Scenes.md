<%* 
const wssDetails = await tp.user.websocketDetails();
const obs = await tp.user.obsWebsocket(wssDetails)

//console.log("obs",obs)
await createSceneTemplateNotes();
await createCameraTemplateNotes();
setTimeout(() => obs.disconnect(), 3000);

async function createSceneTemplateNotes() {
const sceneList = await obs.call("GetSceneList");
sceneList.scenes.forEach(async (scene, index) => {
// find scenes starting with "Scene"
if (scene.sceneName.startsWith("scene|||")) {
const sceneName = scene.sceneName.split("|||");

let fileName = `Entrance Scene - ${sceneName[1]}`;

let existing = tp.file.find_tfile(`_templates/${fileName}`);

if (!existing) {
await tp.file.create_new(
`<!-- slide data-scene-entrance="${sceneName[1]}" --> `,
`_templates/${fileName}`);
}

fileName = `Exit Scene - ${sceneName[1]}`;
existing = tp.file.find_tfile(`_templates/${fileName}`);

if (!existing) {
await tp.file.create_new(
`<!-- slide data-scene-exit="${sceneName[1]}" --> `,
`_templates/${fileName}`);
}
}
});
}

async function createCameraTemplateNotes() {
let cameraSources = await obs.call("GetSceneItemList", { sceneName: "Camera" });

cameraSources.sceneItems.forEach(async(source, index) => {

let fileName = `Entrance Camera - ${source.sourceName}`;
let existing = tp.file.find_tfile(`_templates/${fileName}`);

if (!existing) {
await tp.file.create_new(
`<!-- slide data-camera-entrance="${source.sourceName}" --> `, `_templates/${fileName}`);
}

fileName = `Exit Camera - ${source.sourceName}`;
existing = tp.file.find_tfile(`_templates/${fileName}`);

if (!existing) {
await tp.file.create_new(`<!-- slide data-camera-exit="${source.sourceName}" --> `, `_templates/${fileName}`);
}
});
}
%>