var currentSlideAttributes, currentfragment, currentEvent, teleprompterSpeed;
//OBS HotKey Controls
obs.on("SceneItemEnableStateChanged", async function (event) {
  //if slide control source changed
  if (event.sceneItemEnabled === true && event.sceneName === "Slide Controls") {
    //get source name
    const sceneItem = await obs.call("GetSceneItemSource", {
      sceneName: "Slide Controls",
      sceneItemId: event.sceneItemId,
    });

    console.log("change", sceneItem);
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
      sceneItemEnabled: false,
    });
  }
});

obs.on("InputSettingsChanged", async function(event){
  let tags = ["SceneTag", "CameraTag"];
  if(tags.includes(event.inputName)){
    console.table(event.inputSettings.text)
    //split tag 
    tag = event.inputSettings.text.split("|")
    //let currentSlide = document.querySelector(".present")
    //add tag to slide attributes
    let currentSlide = document.getElementsByClassName("present")[0]
    console.log(currentSlide.dataset);
    currentSlide.dataset[`${tag[0]}`] = tag[1];
    console.log(currentSlide.dataset[`${tag[0]}`])
    console.log(tag[0])
    console.log(tag[0].startsWith('scene'))
    //change to selected tag scene 
    switch(tag[0].slice(0,8)){
      case ('sceneEnt'):
        console.log("switch 1 true", tag[1])
      obs.call('SetCurrentProgramScene', {sceneName: `scene|||${tag[1]}`})
      break;
      case ('cameraEn'):
        console.log("switch 2 true", tag[1])
        //obs.call("SetCurrentProgramScene", { sceneName: `scene|||${tag[1]}` });
        let cameraSources = await obs.call("GetSceneItemList", {
          sceneName: "Camera",
        });
        cameraSources.sceneItems.forEach(async (source) => {
          if (source.sourceName === tag[1]) {
            await obs.call("SetSceneItemEnabled", {
              sceneName: "Camera",
              sceneItemId: source.sceneItemId,
              sceneItemEnabled: true,
            });
          }
          if (source.sourceName !== tag[1]) {
            await obs.call("SetSceneItemEnabled", {
              sceneName: "Camera",
              sceneItemId: source.sceneItemId,
              sceneItemEnabled: false,
            });
          }
        });
      break;
    }
  }
});

//Set Reveal Slide Data Attribute test
function setCurrentSlideAttribute(event, key, value){
    currentEvent.currentSlide.dataset[key] = value
}

//Reveal Slide transition started https://revealjs.com/events/#slide-changed
Reveal.on('slidechanged', async (event) => {
  //get on exit attributes
    console.log(event)
    // const dataAttr = JSON.parse(JSON.stringify(event.previousSlide.dataset));
    currentEvent = event
    currentSlideAttributes = {...event.previousSlide.dataset};
    if(currentSlideAttributes.hasOwnProperty("sceneExit")){
        console.log("exit scene found")
      obs.call('SetCurrentProgramScene', {sceneName: `scene|||${currentSlideAttributes.sceneExit}`})
    }

    //Enable Source in Camera Scene 
    if(currentSlideAttributes.hasOwnProperty("cameraExit")){
      console.log("exit camera found")
      let cameraSources = await obs.call("GetSceneItemList", { sceneName: "Camera" });
      cameraSources.sceneItems.forEach(async (source) => {
        if (source.sourceName === currentSlideAttributes.cameraExit ) {
          await obs.call("SetSceneItemEnabled", {
            sceneName: "Camera",
            sceneItemId: source.sceneItemId,
            sceneItemEnabled: true
          });
        } 
        if (source.sourceName !== currentSlideAttributes.cameraExit){
          await obs.call("SetSceneItemEnabled", {
            sceneName: "Camera",
            sceneItemId: source.sceneItemId,
            sceneItemEnabled: false
          });
        }
      });
    }

    //setCurrentSlideAttribute(event,"key","value")
    //console.log(currentSlideAttributes)
    
    //for (let [key, value] of Object.entries(currentSlideAttributes)) {
      //  if(key){
       //     console.log(`Key found ${key}, with value ${value}`);
        //}
   // }

    let slideNotes = Reveal.getSlideNotes()
    console.log(slideNotes)
    console.log(typeof slideNotes)
    console.log(slideNotes.length)

    await obs.call("SetInputSettings", {
      inputName: "Slide Notes Text",
      inputSettings: {
        text: slideNotes
      }
    });

    //await getTeleprompterSpeed() 
    
    //Reset the teleprompter
    await obs
    .call("SetSourceFilterSettings", {
      sourceName: "Slide Notes Text",
      filterName: "Scroll",
      filterSettings: {
        speed_y: 0
      }
    })
    .then(
      setTimeout(async () => {
        await obs.call("SetSourceFilterSettings", {
          sourceName: "Slide Notes Text",
          filterName: "Scroll",
          filterSettings: {
            speed_y: 15 //teleprompterSpeed
          }
        });
      }, 1000)
    );
  })

  //Reveal Slide Transition ended https://revealjs.com/events/#slide-transition-end
  Reveal.on('slidetransitionend', async (event) => {
    //get on exit attributes
      console.log(event)
      // const dataAttr = JSON.parse(JSON.stringify(event.previousSlide.dataset));
      currentEvent = event
      currentSlideAttributes = {...event.previousSlide.dataset};
      if(currentSlideAttributes.hasOwnProperty("sceneEntrance")){
          console.log("exit scene found")
        obs.call('SetCurrentProgramScene', {sceneName: `scene|||${currentSlideAttributes.sceneExit}`})
      }
  
      //Enable Source in Camera Scene 
      if(currentSlideAttributes.hasOwnProperty("cameraEntrance")){
        console.log("exit camera found")
        let cameraSources = await obs.call("GetSceneItemList", { sceneName: "Camera" });
        cameraSources.sceneItems.forEach(async (source) => {
          if (source.sourceName === currentSlideAttributes.cameraExit ) {
            await obs.call("SetSceneItemEnabled", {
              sceneName: "Camera",
              sceneItemId: source.sceneItemId,
              sceneItemEnabled: true
            });
          } 
          if (source.sourceName !== currentSlideAttributes.cameraExit){
            await obs.call("SetSceneItemEnabled", {
              sceneName: "Camera",
              sceneItemId: source.sceneItemId,
              sceneItemEnabled: false
            });
          }
        });
      }
  })

  async function getTeleprompterSpeed() {
    teleprompterSpeed = await obs.call("GetSourceFilter", {
      sourceName: "Slide Notes Text",
      filterName: "Scroll"
    });
    teleprompterSpeed = teleprompterSpeed.filterSettings.speed_y;
    //document.getElementById("speedValue").value = teleprompterSpeed;
  }

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