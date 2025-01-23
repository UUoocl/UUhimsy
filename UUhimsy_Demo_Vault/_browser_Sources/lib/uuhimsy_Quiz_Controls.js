Reveal.on( 'ready', event => {
  console.log("I'm Ready 7!",obs)
    Reveal.slide(0,0);
      window.addEventListener( "message", function( event ) {
        console.log(event)
      } 
    );
});

  Reveal.on('slidechanged', event => {
    console.log("slide Changed", event)
    Reveal.sync();
    let slideNotes = JSON.stringify(Reveal.getSlideNotes())
    obs.call("CallVendorRequest", {
      vendorName: "obs-browser",
      requestType: "emit_event",
      requestData: {
        event_name: "quizHostUpdate",
        event_data: { 
          app: "uuhimsyQuiz",
          gameState: `${gameState}`,
          slideNotes: `${slideNotes}`
        },
      },
    });
  });

  let YesReacts = ["Thumb-up.gif", "Ecstatic-Animation1 1 (Small).gif", "none-Cheer 1.gif", "none-Cheer.gif"];
  let NoReacts = ["Disappointed-Animation2 1.gif", "none-Angry.gif", "Thumb-down.gif"];
  let GameData = [];
  let voices = [];
  let msg = new SpeechSynthesisUtterance();
  let getUserInput, gameState = 0;

  function ClueSelected(){
      Reveal.slide(1,0);
      return new Promise((resolve) => {
          const listener = (e) => {
            document.removeEventListener("keydown", listener); 
            resolve(); }
            document.addEventListener("keydown",listener);
      })
  }
  
  function ReadClue() {
      console.log("function read clue called")
      var elem = document.getElementById("question-template");
      console.log(elem)
      elem.getElementById
      var mediaElem = elem.querySelector(`[id=media]`);
      console.log(mediaElem)
      //var clueText = document.querySelector(`[id=clueIndex]`).innerHTML;
      //console.log(clueText)
      
      Reveal.slide(1,1);
      return new Promise((resolve) => {
        const listener = (e) => {
          /* console.log("Read listener function")
          console.log(e.keyCode)
          console.log(e)
           */
          document.removeEventListener("keydown", listener);
          switch (true) {
              case e.keyCode == 49:
                  document.removeEventListener("keydown", listener);
                  Reveal.slide(1,2);
                  resolve();
                  break;
              case e.keyCode == 48:
                  if(mediaElem) {
                    mediaElem.play();
                  }
                  document.removeEventListener("keydown", listener);
                  startReadClue();
                  break;
              case e.keyCode == 51:
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
                  document.removeEventListener("keydown", listener);
                  startReadClue();
                  break;
              default:
                  console.log("Default read")
                  document.removeEventListener("keydown", listener);
                  startReadClue();
                  break;
          }         
        }
        document.addEventListener("keydown",listener);
      })
    }
  
    function getPlayer() {
      console.log("function get player called")
      //console.log("make a guess")
      
      var elem = document.getElementById("ShowPlayerName1");
      var elem2 = document.getElementById("ShowPlayerName2");
      var elem3 = document.getElementById("ShowPlayerName3");
      return new Promise((resolve) => {
        const listener = (e) => {
          document.removeEventListener("keydown", listener);
        /*   console.log("get player listener function")
          console.log(e.key)
          console.log(e) */
          //add player name to slides
          console.log(e)
          switch (true) {
              case e.keyCode == 124:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 1`;
                  elem2.innerHTML = `Player 1`;
                  elem3.innerHTML = `Player 1`;
                  resolve();
                  break;
              case e.keyCode == 125:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 2`;
                  elem2.innerHTML = `Player 2`;
                  elem3.innerHTML = `Player 2`;
                  resolve(); 
                  break;
              case e.keyCode == 126:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 3`;
                  elem2.innerHTML = `Player 3`;
                  elem3.innerHTML = `Player 3`;
                  resolve(); 
                  break;
              case e.keyCode == 127:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 4`;
                  elem2.innerHTML = `Player 4`;
                  elem3.innerHTML = `Player 4`;
                  resolve(); 
                  break;
              case e.keyCode == 128:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 5`;
                  elem2.innerHTML = `Player 5`;
                  elem3.innerHTML = `Player 5`;
                  resolve(); 
                  break;
              case e.keyCode == 129:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 6`;
                  elem2.innerHTML = `Player 6`;
                  elem3.innerHTML = `Player 6`;
                  resolve(); 
                  break;
              case e.keyCode == 130:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 7`;
                  elem2.innerHTML = `Player 7`;
                  elem3.innerHTML = `Player 7`;
                  resolve(); 
                  break;
              case e.keyCode == 131:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 8`;
                  elem2.innerHTML = `Player 8`;
                  elem3.innerHTML = `Player 8`;
                  resolve(); 
                  break;
              case e.keyCode == 132:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 9`;
                  elem2.innerHTML = `Player 9`;
                  elem3.innerHTML = `Player 9`;
                  resolve(); 
                  break;
              case e.keyCode == 133:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 10`;
                  elem2.innerHTML = `Player 10`;
                  elem3.innerHTML = `Player 10`;
                  resolve(); 
                  break;
              case e.keyCode == 134:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 11`;
                  elem2.innerHTML = `Player 11`;
                  elem3.innerHTML = `Player 11`;
                  resolve(); 
                  break;
              case e.keyCode == 135:
                  document.removeEventListener("keydown", listener);
                  elem.innerHTML = `Player 12`;
                  elem2.innerHTML = `Player 12`;
                  elem3.innerHTML = `Player 12`;
                  resolve(); 
                  break;
              case e.keyCode == 50:
                  document.removeEventListener("keydown", listener);
                  console.log(hello)
                  Reveal.slide(0,0);
                  resolve();
                  break;
              default:
                  console.log("Default get player")
                  document.removeEventListener("keydown", listener);
                  startGetPlayer();
                  break;
          }
        }
        document.addEventListener("keydown",listener);
      })
    }
    


    function getJudgeResponse() {
      console.log("function judge called")
      return new Promise((resolve) => {
        const listener = (e) => {
          /* console.log("judge listener function")*/
          var Judged = true;
          var player = document.getElementById("ShowPlayerName1").innerHTML;
          var score = Number(document.getElementById(`${player}-score`).innerHTML);
          var point = Number(clueElement.Number)*100;
          console.log(point)
          switch (true) {
            case e.keyCode == 49:
              document.removeEventListener("keydown", listener);
              Reveal.slide(1,3);
              document.getElementById(`${player}-score`).innerHTML = score + point;
              document.getElementById(`score-notes`).innerHTML = document.getElementById(`score-table`).outerHTML
              resolve();
              break;
            case e.keyCode == 48   :  
              document.removeEventListener("keydown", listener);
              Reveal.slide(1,4);
              document.getElementById(`${player}-score`).innerHTML = score - point;
              document.getElementById(`score-notes`).innerHTML = document.getElementById(`score-table`).outerHTML
              resolve();
              break;
            default:
              document.removeEventListener("keydown", listener);
              startJudgeResponse();
          }
        }
        document.addEventListener("keydown",listener);
      })
    }
    
    async function nextGuess() {
      console.log("back to board or get player")
      return new Promise((resolve) => {
        const listener = (e) => {
          /* console.log("next guess function")
          console.log(e.keyCode) */
          switch (e.keyCode) {
            case 49:
              document.removeEventListener("keydown", listener);
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
              resolve();
              break;
            case 48:  
              document.removeEventListener("keydown", listener);
              const elem = document.getElementById("ShowPlayerName1");
              elem.innerHTML = `Take a Guess!`;
              Reveal.slide(1,2);
              startGetPlayer();
              resolve();
              break;
            default:
              document.removeEventListener("keydown", listener);
              startnextGuess();
            }
        }
        document.addEventListener("keydown",listener);
      })
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
              document.querySelector(`[id=question-template]`).innerHTML = `<h2 onclick= \"window.opener.keySim(49)\" class=\"button-10\">${clueElement.Clue}</h2><aside class=\"notes\" id=\"temp-notes1\">template notes 📝</aside>`;
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
      var navOptions1 = "<b onclick= \"sendNextSlide();\" class=\"button-10\">(1): get response,</b><br> <b onclick= \"sendPlayMedia()\" class=\"button-10\">(0): Play media</b><br> <b onclick= \"sendReadAloud()\" class=\"button-10\">(3): read aloud</b><br>";
      var navOptions2 = "<table style=\"width:100%\"><tr><td><b onclick= \"window.opener.keySim(124)\" class=\"button-10\"> 1 </b></td><td> <b onclick= \"window.opener.keySim(125)\" class=\"button-10\"> 2 </b></td><td><b onclick= \"window.opener.keySim(126)\" class=\"button-10\"> 3 </b></td><td> <b onclick= \"window.opener.keySim(127)\" class=\"button-10\"> 4 </b></td><td><b onclick= \"window.opener.keySim(128)\" class=\"button-10\"> 5 </b></td><td> <b onclick= \"window.opener.keySim(129)\" class=\"button-10\"> 6 </b></tr><tr><td><b onclick= \"window.opener.keySim(130)\" class=\"button-10\"> 7 </b></td><td> <b onclick= \"window.opener.keySim(131)\" class=\"button-10\"> 8 </b></td><td><b onclick= \"window.opener.keySim(132)\" class=\"button-10\"> 9 </b></td><td> <b onclick= \"window.opener.keySim(133)\" class=\"button-10\"> 10 </b></td><td><b onclick= \"window.opener.keySim(134)\" class=\"button-10\"> 11 </b></td><td> <b onclick= \"window.opener.keySim(135)\" class=\"button-10\"> 12 </b> </td></tr></table> <br><b onclick= \"window.opener.keySim(49)\" class=\"button-10\">(1): Correct response,</b><br> <b onclick= \"window.opener.keySim(48)\" class=\"button-10\">(0): Incorrect response</b><br>"
      var navOptions3 = "<b onclick= \"sendGoToSlide(0,0)\" class=\"button-10\">(1): Back to Game Board,</b><br> <b onclick= \"sendGoToSlide(1,1); \" class=\"button-10\">(0): Get more responses</b><br>"
           
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
                  clearKeyboardEvent()};
      
  }
      
  //clear the intitial keyboard event that called the clue
    function doNothing(){
      console.log("function do nothing called")
      //Reveal.slide(1,0);
      return new Promise((resolve) => {
        const listener = (e) => {
          /* console.log("do nothing listener function")
          console.log(e.keyCode)
          console.log(e) */
          document.removeEventListener("keydown", listener);
          resolve();
        }
        document.addEventListener("keydown",listener);
      })
    }
     
    async function clearKeyboardEvent(){
      console.log("clear clue select key press")
      await doNothing();
      Reveal.slide(1,0);
      startClueSelected();
    }
  
    async function startClueSelected(){
      console.log("clue selected")
      gameState ="clueSelected"
      Reveal.slide(1,0);
      // await ClueSelected();
      // startReadClue();
    }
    
    async function startReadClue(){
      console.log("starting Q&A")
      Reveal.slide(1,0);
      await ReadClue();
      startGetPlayer();
    }
  
    async function startGetPlayer(){
      console.log("Starting get player func")
      await getPlayer();
      startJudgeResponse();
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

      //send websocket to OBS Browser source only
      let slideNotes = JSON.stringify(Reveal.getSlideNotes())
      obs.call("CallVendorRequest", {
        vendorName: "obs-browser",
        requestType: "emit_event",
        requestData: {
            event_name: "quizHostUpdate",
            event_data: { 
              app: "uuhimsyQuiz",
              gameState: gameState,
              slideNotes: `${slideNotes}`
            },
        },
      });

      // OBS websocket Custom Broadcast Request to all clients
      // obs.call("BroadcastCustomEvent", {
      //   eventData: {
      //     event_name: "quizBoard",
      //     event_data:{ data }
      //   },
      // })
      // },
      // false
      // );
  }

  window.addEventListener( 'loadQuizBoard', function( event ) {
    var data = JSON.parse( event.detail.data );
    gameState="gameBoard"
    initializeGameBoard(data)
  })

  window.addEventListener( 'quizBoardUpdate', function( event ) {
    console.log("message Event received",event)
    var data = JSON.parse( event.detail.slideNotes );
    console.log(data)
    const element = document.querySelector(`[data-question-value="${data}"]`); 
    // Replace 'data-attribute' and 'value' with your attribute and its value
    element.click();
  })

  window.addEventListener( 'revealNextSlide', function( event ) {
    Reveal.next()
  })

  function keySim(k){
      document.dispatchEvent(
          new KeyboardEvent("keydown", {
              keyCode: k  
          })
      );   
  }
  