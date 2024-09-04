window.addEventListener("nextSlide", function (event) {
    //console.log("message received: ",event)
    Reveal.next();
    changeSlide("reveal_nextSlide")
})

window.addEventListener("previousSlide", function (event) {
    //console.log("message received: ",event)
    Reveal.prev();
    changeSlide("reveal_previousSlide");
})

let previousSlideIndex = {"h" : -1, "v" : -1};

function changeSlide(direction){
    //After changing slides, create an object with the notes for the current slide and the next slide. 
    //Get current Slide ID and Notes
    let slideTitle = Reveal.getCurrentSlide().attributes.id ? Reveal.getCurrentSlide().attributes.id.value : ""
    let slideNotes = Reveal.getSlideNotes()
    let slideScene = ''
    //if notes contains '|' split text. 
    if(slideNotes.includes("|")){
        slideNotes = slideNotes.split("|")
        slideScene = slideNotes[0];
        slideNotes = slideNotes[1];
    }

    //Get Available Routes
    let currentIndex = Reveal.getIndices()
    console.log(JSON.stringify(currentIndex))
    let availableRoutes = Reveal.availableRoutes();
    console.log(Reveal.availableRoutes());
    console.log(availableRoutes);
    console.log(availableRoutes.down);
    console.log(availableRoutes.right);
    //If Down route availble, Get Down Slide ID and Notes
    let nextSlideTitle,nextSlideNotes, nextSlideScene="";
    if(availableRoutes.down === true){
        nextSlideTitle = Reveal.getSlide(currentIndex.h,currentIndex.v+1).attributes.id ? Reveal.getSlide(currentIndex.h,currentIndex.v+1).attributes.id.value : "";
        nextSlideNotes = Reveal.getSlideNotes(Reveal.getSlide(currentIndex.h,currentIndex.v+1))
    }
    //else If Right, get Right Slide ID and Notes
    else if(availableRoutes.right === true){
        nextSlideTitle = Reveal.getSlide(currentIndex.h+1).attributes.id ? Reveal.getSlide(currentIndex.h+1).attributes.id :""
        nextSlideNotes = Reveal.getSlideNotes(Reveal.getSlide(currentIndex.h+1))
    }
    //else end of slides
    else{
        nextSlideTitle = "End of Slides"
        nextSlideNotes = "End of Slides"
    }

    if(nextSlideNotes.includes("|")){
        nextSlideNotes = nextSlideNotes.split("|")
        nextSlideScene = nextSlideNotes[0];
        nextSlideNotes = nextSlideNotes[1];
    }else{let nextSlideScene = ""}
  
let results = `{"actionName":"${direction}", "slideNumber": "","slideScene":${JSON.stringify(slideScene)}, "slideNotes": ${JSON.stringify(slideNotes)}, "slideTitle": ${JSON.stringify(slideTitle)},"nextSlideNumber": "","nextSlideScene":${JSON.stringify(nextSlideScene)}, "nextSlideNotes": ${JSON.stringify(nextSlideNotes)}, "nextSlideTitle": ${JSON.stringify(nextSlideTitle)}}`

results = JSON.stringify(results);
console.log(results)
//results = results.replace('“','"').replace('”','"').replace('“','"').replace('”','"')
//send results to OBS Browser Source

//when slide changes send new notes to teleprompter. 
console.log("currentIndex.h === previousSlideIndex.h", currentIndex.h , previousSlideIndex.h, currentIndex.h === previousSlideIndex.h)
console.log("currentIndex.v === previousSlideIndex.v", currentIndex.v , previousSlideIndex.v, currentIndex.v === previousSlideIndex.v)

if(!((currentIndex.h === previousSlideIndex.h) && (currentIndex.v === previousSlideIndex.v))){
    console.log("Send results")
    previousSlideIndex = currentIndex;
obs.call("CallVendorRequest", {
    vendorName: "obs-browser",
    requestType: "emit_event",
    requestData: {
        event_name: "slideChangeResult",
        event_data: { results },
    },
});
}
}