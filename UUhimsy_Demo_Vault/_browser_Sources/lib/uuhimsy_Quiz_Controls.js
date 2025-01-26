Reveal.on( 'ready', event => {
  console.log("I'm Ready!",obs)
    Reveal.slide(0,0);
    //   window.addEventListener( "message", function( event ) {
    //     console.log(event)
    //   } 
    // );

      //If the CustomEvent name matches a function, then run the matching function
  obs.on("CustomEvent", function (event) {
    if (typeof window[event.event_name] === 'function') {
      console.log("CustomEvent Received",event)
      window[event.event_name](event);
    }
  });
});

  Reveal.on('slidechanged', event => {
    console.log("slide Changed", event)
    Reveal.sync();
    let slideNotes = JSON.stringify(Reveal.getSlideNotes())
    
    obs.call("BroadcastCustomEvent",{
      eventData:{
          event_name: "quizHostUpdate",
          event_data: { 
            app: "uuhimsyQuiz",
            gameState: `${gameState}`,
            slideNotes: `${slideNotes}`
          },
        }
    })
      
    // obs.call("CallVendorRequest", {
    //   vendorName: "obs-browser",
    //   requestType: "emit_event",
    //   requestData: {
    //     event_name: "quizHostUpdate",
    //     event_data: { 
    //       app: "uuhimsyQuiz",
    //       gameState: `${gameState}`,
    //       slideNotes: `${slideNotes}`
    //     },
    //   },
    // });
  });

  let YesReacts = ["Thumb-up.gif", "Ecstatic-Animation1 1 (Small).gif", "none-Cheer 1.gif", "none-Cheer.gif"];
  let NoReacts = ["Disappointed-Animation2 1.gif", "none-Angry.gif", "Thumb-down.gif"];
  let GameData = [];
  let voices = [];
  let msg = new SpeechSynthesisUtterance();
  let getUserInput, gameState = 0;
  let playerScores = new Map();
  let elem, mediaElem;

  function readClue(event) {
    console.log("function read clue called")
    elem = document.getElementById("question-template");
    console.log(elem)
    elem.getElementById
    mediaElem = elem.querySelector(`[id=media]`);
    console.log(mediaElem)
    //var clueText = document.querySelector(`[id=clueIndex]`).innerHTML;
    //console.log(clueText)
    
    Reveal.slide(1,1);
    switch (true) {
      case event.keyCode == 49:
        Reveal.slide(1,2);
        gameState = "getPlayer"
        break;
      case event.keyCode == 48:
        if(mediaElem) {
          mediaElem.play();
        }
        break;
      case event.keyCode == 51:
        //Read aloud
        msg.text = document.querySelector(`[id=temp-notes1-Question]`).innerHTML;
        voices = window.speechSynthesis.getVoices();
        console.log(voices)
        voices = voices.filter(function (el) {
            return el.lang.startsWith("en")});
            console.log(voices)
        msg.lang = "en-US";
        msg.voice = voices[Math.floor(Math.random()*voices.length)];
        console.log(msg)
        speechSynthesis.speak(msg);    
        break;
      default:
          break;
    }         
  }
  
    function getPlayer(event) {
      gameState = "0";
      console.log("Player selected")
      //console.log("make a guess")
      
      var elem1 = document.getElementById("ShowPlayerName1");
      var elem2 = document.getElementById("ShowPlayerName2");
      var elem3 = document.getElementById("ShowPlayerName3");
      elem1.innerHTML = `${event.playerName}`;
      elem2.innerHTML = `${event.playerName}`;
      elem3.innerHTML = `${event.playerName}`;
    }

    function updatePlayerScore(player,point,operator){
      const operations = {
        "+": (x, y) => x + y,
        "-": (x, y) => x - y,
      };
      if (playerScores.has(player)) {
        // Key exists, proceed to update
        const currentValue = playerScores.get(player);
        if (operations[operator]) {
          let result = operations[operator](currentValue, point);
          console.log(result); 
          playerScores.set(player,result)
        } else {
          console.log("Invalid operator");
        }
      } else {
        // Key doesn't exist, add a new entry
        let result = operations[operator](0, point);
        playerScores.set(player,result)
      }
    }

    function getJudgeResponse(event) {
      console.log("function judge called")
      let Judged = true;
      let player = document.getElementById("ShowPlayerName1").innerHTML;
      // let score = Number(document.getElementById(`${player}-score`).innerHTML);
      let point = Number(clueElement.Number)*100;
      console.log(point)
      switch (event.judgesResponse) {
        case 49:
          Reveal.slide(1,3);
//Change to update Map entry
         updatePlayerScore(player, point,'+')
         // document.getElementById(`${player}-score`).innerHTML = score + point;
         // document.getElementById(`score-notes`).innerHTML = document.getElementById(`score-table`).outerHTML
         break;
         case 48:  
         Reveal.slide(1,4);
         updatePlayerScore(player, point,'-')
          //document.getElementById(`${player}-score`).innerHTML = score - point;
          //document.getElementById(`score-notes`).innerHTML = document.getElementById(`score-table`).outerHTML
          break;
        default:
          break;  
      }
    }
    
async function nextGuess(event) {
  console.log("back to board or get player")
  switch (event.nextGuess) {
    case 49:
      Reveal.slide(0,0);
      document.querySelector(`[id=clue-selected]`).innerHTML = "";
      document.querySelector(`[id=question-template]`).innerHTML = "";
      document.querySelector(`[id=ShowPlayerName1]`).innerHTML = "";
      document.querySelector(`[id=ShowPlayerName2]`).innerHTML = "";
      document.querySelector(`[id=get-player]`).innerHTML = "";
      document.querySelector(`[id=response-correct]`).innerHTML = "";
      document.querySelector(`[id=YesReact]`).src = "";
      document.querySelector(`[id=NoReact]`).src = "";
      document.querySelector(`[id=response-wrong]`).innerHTML = "";
      break;
    case 48:  
      const elem = document.getElementById("ShowPlayerName1");
      elem.innerHTML = `Take a Guess!`;
      Reveal.slide(1,2);
      gameState = "getPlayer"
      break;
    default:
      break;  
    }
  }
       
    
  var clueElement;  
  function updateClue(t,n) {
      var clue = t.getAttribute("data-question-value");
      clue = clue.replace("notes-","");
      console.log(t)
      //remove clue value and index attribute
      document.querySelector(`[data-question-value=notes-${clue}]`).removeAttribute("class")
      document.querySelector(`[data-question-value=notes-${clue}]`).innerHTML ="";
      
      document.querySelector(`[data-question-value=${clue}]`).removeAttribute("tabindex")
      document.querySelector(`[data-question-value=${clue}]`).innerHTML ="";
  
      //document.querySelector(`[id=clueIndex]`).innerHTML = clue;
      
  //copy clue text to templates
      const elem = document.getElementById("ShowPlayerName1");
      elem.innerHTML = `Take a Guess!`;
      clueElement = GameData.find(({ ID }) => ID === clue);
      //document.getElementById("category1").innerHTML= clueElement.Category;
      //document.querySelector(`[id=question-template]`).innerHTML = "";
  console.log(clueElement)
  console.log(clueElement.Type)
  
      switch(clueElement.Type){
          case 'Text':
              document.querySelector(`[id=question-template]`).innerHTML = `<h2 onclick= \"readClueOptions(49)\" class=\"button-10\">${clueElement.Clue}</h2><aside class=\"notes\" id=\"temp-notes1\">template notes 📝</aside>`;
              break;
          case 'Image':
              document.querySelector(`[id=question-template]`).innerHTML = `<p>${clueElement.Clue}</p><img src=\"media/${clueElement.File}\" class=\"r-stretch\"></img><aside class=\"notes\" id=\"temp-notes1\">template notes 📝</aside>`;
              break;
          case 'Video':
              document.querySelector(`[id=question-template]`).innerHTML = `<p>${clueElement.Clue}</p><video id=\"media\" src=\"media/${clueElement.File}\" class=\"r-stretch\"></video><aside class=\"notes\" id=\"temp-notes1\">template notes 📝</aside>`
              break;
          case 'Audio':
              document.querySelector(`[id=question-template]`).innerHTML = `<p>${clueElement.Clue}</p><br><audio controls id=\"media\" src=\"media/${clueElement.File}\"></audio><aside class=\"notes\" id=\"temp-notes1\">template notes 📝</aside>`;
              break;
      }
  
      //document.querySelector(`[id=question-template]`).innerHTML = clueElement.Clue;
      document.querySelector(`[id=clue-selected]`).innerHTML = `<h2>${clueElement.Category}<br>${clueElement.Number*100}</h2><aside class="notes" id="temp-notes0"><p  onclick= \"sendNextSlide();\" class=\"button-10\">Click to go to the clue</p></aside>`;
      document.querySelector(`[id=get-player]`).innerHTML = clueElement.Clue;
      document.querySelector(`[id=response-correct]`).innerHTML = clueElement.Answer;
      document.querySelector(`[id=response-wrong]`).innerHTML = clueElement.Clue; 
      document.querySelector(`[id=YesReact]`).src = "outcome/" + YesReacts[Math.floor(Math.random()*YesReacts.length)];
  
  //update template notes
      var navOptions1 = "<b onclick= \"readClueOptions(49)\" class=\"button-10\">(1): get response,</b><br> <b onclick= \"readClueOptions(48)\" class=\"button-10\">(0): Play media</b><br> <b onclick= \"readClueOptions(51)\" class=\"button-10\">(3): read aloud</b><br>";
      var navOptions2 = "<table style=\"width:100%\"><tr><td><b onclick= \"sendSelectedPlayer('Player 1')\" class=\"button-10\"> 1 </b></td><td> <b onclick= \"sendSelectedPlayer('Player 2')\" class=\"button-10\"> 2 </b></td><td><b onclick= \"sendSelectedPlayer('Player 3')\" class=\"button-10\"> 3 </b></td><td> <b onclick= \"sendSelectedPlayer('Player 4')\" class=\"button-10\"> 4 </b></td><td><b onclick= \"sendSelectedPlayer('Player 5')\" class=\"button-10\"> 5 </b></td><td> <b onclick= \"sendSelectedPlayer('Player 6')\" class=\"button-10\"> 6 </b></tr><tr><td><b onclick= \"sendSelectedPlayer('Player 7')\" class=\"button-10\"> 7 </b></td><td> <b onclick= \"sendSelectedPlayer('Player 8')\" class=\"button-10\"> 8 </b></td><td><b onclick= \"sendSelectedPlayer('Player 9')\" class=\"button-10\"> 9 </b></td><td> <b onclick= \"sendSelectedPlayer('Player 10')\" class=\"button-10\"> 10 </b></td><td><b onclick= \"sendSelectedPlayer('Player 11')\" class=\"button-10\"> 11 </b></td><td> <b onclick= \"sendSelectedPlayer('Player 12')\" class=\"button-10\"> 12 </b> </td></tr></table> <br><b onclick= \"sendJudgesResponse(49)\" class=\"button-10\">(1): Correct response,</b><br> <b onclick= \"sendJudgesResponse(48)\" class=\"button-10\">(0): Incorrect response</b><br>"
      var navOptions3 = "<b onclick= \"sendNextGuess(49)\" class=\"button-10\">(1): Back to Game Board,</b><br> <b onclick= \"sendNextGuess(48); \" class=\"button-10\">(0): Get more responses</b><br>"
           
      document.querySelector(`[id=temp-notes1]`).innerHTML = navOptions1 +" <b>Question:</b><p id=\"temp-notes1-Question\">" + clueElement.Clue + "</P><b>Answer:</b></br>" + clueElement.Answer;
      document.querySelector(`[id=temp-notes2]`).innerHTML = navOptions2 +" <b>Question:</b></br>" + clueElement.Clue + "</br><b>Answer:</b></br>" + clueElement.Answer;
      document.querySelector(`[id=temp-notes3]`).innerHTML = navOptions3 +" <b>Question:</b></br>" + clueElement.Clue + "</br><b>Answer:</b></br>" + clueElement.Answer;
      document.querySelector(`[id=temp-notes4]`).innerHTML = navOptions3 +" <b>Question:</b></br>" + clueElement.Clue + "</br><b>Answer:</b></br>" + clueElement.Answer;
      //Reveal.slide(0,0);
      
      Reveal.sync();
  
   //start review
    if(n == 0){console.log("on click update")
      startClueSelected()};
    if(n == 1){console.log("key press update")
      startClueSelected()
    };
  }
      
    async function startClueSelected(){
      console.log("clue selected")
      gameState ="clueSelected"
      Reveal.slide(1,0);
    }
    
    async function startReadClue(){
      console.log("starting Q&A")
      Reveal.slide(1,0);
      Reveal.next;
     }
  
    async function startGetPlayer(){
      console.log("Starting get player func")
      await obs.call("SetInputSettings", {
        inputName: "hotkeyText",
        inputSettings: {
          text: ""
        }
      });
    }
  
    async function startJudgeResponse(){
      console.log("start judging")
      await getJudgeResponse();
      startnextGuess();
    }
  
    async function startnextGuess(){
      console.log("where to go next?")
      await nextGuess();
      console.log("all done")
    }
  
  async function initializeGameBoard(fileString) {  
      GameData=[];  
      var item; 
              
      //populate Array of Game Objects
      fileString.forEach(element => {
          //console.log(element)
        item = JSON.parse(element);
        delete item.Blank;
        GameData.push(item);
      });    
  
      console.log(GameData);
      
      var clueElement;
      clueElement = GameData.find(({ ID }) => ID === "c1r1");
      console.log(clueElement)
      //Load game board categories
      document.getElementById("category1").innerHTML= clueElement.Category;
      document.getElementById("notesCat1").innerHTML= clueElement.Category;
      document.getElementById("notesCat1Description").innerHTML= clueElement.Description;
  
      clueElement = GameData.find(({ ID }) => ID === "c2r1");
      document.getElementById("category2").innerHTML= clueElement.Category;
      document.getElementById("notesCat2").innerHTML= clueElement.Category;
      document.getElementById("notesCat2Description").innerHTML= clueElement.Description;
  
      clueElement = GameData.find(({ ID }) => ID === "c3r1");
      document.getElementById("category3").innerHTML= clueElement.Category;
      document.getElementById("notesCat3").innerHTML= clueElement.Category;
      document.getElementById("notesCat3Description").innerHTML= clueElement.Description;
  
      clueElement = GameData.find(({ ID }) => ID === "c4r1");
      document.getElementById("category4").innerHTML= clueElement.Category;
      document.getElementById("notesCat4").innerHTML= clueElement.Category;
      document.getElementById("notesCat4Description").innerHTML= clueElement.Description;
  
      clueElement = GameData.find(({ ID }) => ID === "c5r1");
      document.getElementById("category5").innerHTML= clueElement.Category;
      document.getElementById("notesCat5").innerHTML= clueElement.Category;
      document.getElementById("notesCat5Description").innerHTML= clueElement.Description;
  
      clueElement = GameData.find(({ ID }) => ID === "c6r1");
      document.getElementById("category6").innerHTML= clueElement.Category;
      document.getElementById("notesCat6").innerHTML= clueElement.Category;
      document.getElementById("notesCat6Description").innerHTML= clueElement.Description;
  
      Reveal.slide(0,0);
      Reveal.sync();
      //send websocket to OBS Browser source only
      let slideNotes = JSON.stringify(Reveal.getSlideNotes())
      // obs.call("CallVendorRequest", {
      //   vendorName: "obs-browser",
      //   requestType: "emit_event",
      //   requestData: {
      //       event_name: "quizHostUpdate",
      //       event_data: { 
      //         app: "uuhimsyQuiz",
      //         gameState: gameState,
      //         slideNotes: `${slideNotes}`
      //       },
      //   },
      // });

      // OBS websocket Custom Broadcast Request to all clients
      obs.call("BroadcastCustomEvent", {
        eventData: {
          event_name: "quizHostUpdate",
          event_data:{
            slideNotes: `${slideNotes}`,
            app: "uuhimsyQuiz",
            gameState: gameState
          }
        }
      })
      // },
      // false
      // );
  }

  function loadQuizBoard(event){
    console.log("load quiz function", event)
    let data = JSON.parse( event.data );
    gameState="gameBoard"
    initializeGameBoard(data)
  }

  // window.addEventListener( 'loadQuizBoard', function( event ) {
  //   var data = JSON.parse( event.detail.data );
  //   gameState="gameBoard"
  //   initializeGameBoard(data)
  // })

  function quizBoardUpdate(event){
    console.log("message Event received",event)
    var data = JSON.parse( event.detail.slideNotes );
    console.log(data)
    const element = document.querySelector(`[data-question-value="${data}"]`); 
    // Replace 'data-attribute' and 'value' with your attribute and its value
    element.click();
  }

  function scoreBoardUpdate(){
    revealGoToSlide({h:2,v:0});
    const scoreTable = document.getElementById("score-table")
    const tableBody = scoreTable.getElementsByTagName("tbody")[0];
    tableBody.innerHTML ="";
    tableBody.innerHTML = `<tr><th>Players</th><th>Score</th></tr>`
    
    //Sort the players by score descending
    // Convert Map to an array of [key, value] pairs
    const entries = Array.from(playerScores.entries());

    // Sort the array by value descending order
    entries.sort((a, b) => b[1] - a[1]);

    // Create a new Map from the sorted array
    const sortedScores = new Map(entries);
    
    //single line to sort Map by value
    //playerScores = new Map([...playerScores.entries()].sort((a, b) => Number(b[1]) - Number(a[1])));

    sortedScores.forEach((value, key) => {
      const row = scoreTable.insertRow();
      const playerCell = row.insertCell();
      const scoreCell = row.insertCell();
      
      playerCell.textContent = key;
      scoreCell.textContent = value;
    });
  }

  // window.addEventListener( 'quizBoardUpdate', function( event ) {
  //   console.log("message Event received",event)
  //   var data = JSON.parse( event.detail.slideNotes );
  //   console.log(data)
  //   const element = document.querySelector(`[data-question-value="${data}"]`); 
  //   // Replace 'data-attribute' and 'value' with your attribute and its value
  //   element.click();
  // })

  function revealNextSlide( event ) {
    Reveal.next()
  }

  function revealGoToSlide( event ) {
    Reveal.slide(event.h,event.v)
  }

  window.addEventListener( 'revealNextSlide', function( event ) {
    Reveal.next()
  })

  function keySim(k){
    console.log("keysim func",k)
      document.dispatchEvent(
          new KeyboardEvent("keydown", {
              keyCode: k  
          })
      );   
  }

  window.addEventListener("osc-message", function (event) {
    console.log("osc-message received: ", event);
    if(event.detail.webSocketMessage.includes("/emojiChanged") && gameState === "getPlayer"){
      let wsMessage = { playerName: JSON.parse(event.detail.webSocketMessage)[2]}
      getPlayer(wsMessage)
      //console.log( JSON.stringify(event.detail.webSocketMessage))
    }
  });
  