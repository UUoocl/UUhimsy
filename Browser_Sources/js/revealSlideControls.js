//OBS HotKey Controls
obs.on("SceneItemEnableStateChanged", async function(event) {
    //if slide control source changed
    if (event.sceneItemEnabled === true && event.sceneName === "Slide Controls") {
      //get source name
      const sceneItem = await obs.call("GetSceneItemSource", {
        sceneName: "Slide Controls",
        sceneItemId: event.sceneItemId,
      })
   
      console.log("hi",sceneItem)
      const control = sceneItem.sourceName;
   
      //if next
      switch (control) {
        case "NextSlide":
            Reveal.next();
            break;
        case "PreviousSlide":
            Reveal.prev();
            break;
        case "Play-Pause":
        //  togglePlayPause();
          break;
        case "Text Smaller":
        //  changeTeleprompterSize({ data: { change: -1 } });
          break;
        case "Text Bigger":
        //  changeTeleprompterSize({ data: { change: 1 } });
          break;
        case "Scroll Slower":
        //  changeTeleprompterSpeed({ data: { change: -1 } });
          break;
        case "Scroll Faster":
        //  changeTeleprompterSpeed({ data: { change: 1 } });
          break;
      }
  
      await obs.call("SetSceneItemEnabled", {
        sceneName: "Slide Controls",
        sceneItemId: event.sceneItemId,
        sceneItemEnabled: false
      });
    }
  });

var currentSlideAttributes, currentfragment, currentEvent;

//Set Reveal Slide Data Attribute test
function setCurrentSlideAttribute(event, key, value){
    currentEvent.currentSlide.dataset[key] = value
}

Reveal.on('slidechanged', (event) => {
    console.log(event)
    // const dataAttr = JSON.parse(JSON.stringify(event.previousSlide.dataset));
    currentEvent = event
    currentSlideAttributes = {...event.previousSlide.dataset};
    setCurrentSlideAttribute(event,"candy","cane")
    console.log(currentSlideAttributes)
    
    for (let [key, value] of Object.entries(currentSlideAttributes)) {
        if(key){
            console.log(`Key found ${key}, with value ${value}`);
        }
    }
})

Reveal.on('fragmentshown', (event) => {
    console.log(event)
    // const dataAttr = JSON.parse(JSON.stringify(event.previousSlide.dataset));
    event.fragment.dataset.fun = "coding"
    const dataAttr = {...event.fragment.dataset};
    console.log(dataAttr)
    
    for (let [key, value] of Object.entries(dataAttr)) {
        if(key){
            console.log(`Key found ${key}, with value ${value}`);
        }
    }
})

//     let slideTitle = Reveal.getCurrentSlide().attributes.id ? Reveal.getCurrentSlide().attributes.id.value : ""
//     let slideNotes = Reveal.getSlideNotes()
//     let slideScene = ''
//     //if notes contains '|' split text. 
//     if(slideNotes.includes("|")){
        
//         slideNotes = slideNotes.split("|")
//         slideScene = slideNotes[0];
//         slideNotes = slideNotes[1];
//     }

//     //Get Available Routes
//     let currentIndex = Reveal.getIndices()
// //    console.log(JSON.stringify(currentIndex))
//     let availableRoutes = Reveal.availableRoutes();
//     // console.log(Reveal.availableRoutes());
//     // console.log(availableRoutes);
//     // console.log(availableRoutes.down);
//     // console.log(availableRoutes.right);
//     //If Down route available, Get Down Slide ID and Notes
//     let nextSlideTitle,nextSlideNotes, nextSlideScene="";
//     if(availableRoutes.down === true){
//         nextSlideTitle = Reveal.getSlide(currentIndex.h,currentIndex.v+1).attributes.id ? Reveal.getSlide(currentIndex.h,currentIndex.v+1).attributes.id.value : "";
//         nextSlideNotes = Reveal.getSlideNotes(Reveal.getSlide(currentIndex.h,currentIndex.v+1))
//     }
//     //else If Right, get Right Slide ID and Notes
//     else if(availableRoutes.right === true){
//         nextSlideTitle = Reveal.getSlide(currentIndex.h+1).attributes.id ? Reveal.getSlide(currentIndex.h+1).attributes.id :""
//         nextSlideNotes = Reveal.getSlideNotes(Reveal.getSlide(currentIndex.h+1))
//     }
//     //else end of slides
//     else{
//         nextSlideTitle = "End of Slides"
//         nextSlideNotes = "End of Slides"
//     }

//     if(nextSlideNotes.includes("|")){
//         nextSlideNotes = nextSlideNotes.split("|")
//         nextSlideScene = nextSlideNotes[0];
//         nextSlideNotes = nextSlideNotes[1];
//     }else{nextSlideScene = ""}
  
// let results = `{"app":"reveal","actionName":"${direction}", "slideNumber": "","slideScene":${JSON.stringify(slideScene)}, "slideNotes": ${JSON.stringify(slideNotes)}, "slideTitle": ${JSON.stringify(slideTitle)},"nextSlideNumber": "","nextSlideScene":${JSON.stringify(nextSlideScene)}, "nextSlideNotes": ${JSON.stringify(nextSlideNotes)}, "nextSlideTitle": ${JSON.stringify(nextSlideTitle)}}`

// results = JSON.stringify(results);
// //console.log(results)
// //results = results.replace('“','"').replace('”','"').replace('“','"').replace('”','"')
// //send results to OBS Browser Source

// //when slide changes send new notes to teleprompter. 
// // console.log("currentIndex.h === previousSlideIndex.h", currentIndex.h , previousSlideIndex.h, currentIndex.h === previousSlideIndex.h)
// // console.log("currentIndex.v === previousSlideIndex.v", currentIndex.v , previousSlideIndex.v, currentIndex.v === previousSlideIndex.v)

// if(!((currentIndex.h === previousSlideIndex.h) && (currentIndex.v === previousSlideIndex.v))){
//     console.log("Send results")
//     previousSlideIndex = currentIndex;
// obs.call("CallVendorRequest", {
//     vendorName: "obs-browser",
//     requestType: "emit_event",
//     requestData: {
//         event_name: "slideChangeResult",
//         event_data: { results },
//     },
// });
// }