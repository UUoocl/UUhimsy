// Enable WEBMIDI.js and trigger the onEnabled() function when ready
WebMidi.enable()
  .then(onEnabled)
  .catch((err) => alert(err));

// Function triggered when WEBMIDI.js is ready
function onEnabled() {
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
    //document.body.innerHTML += "No device detected.";
  } else {
    WebMidi.inputs.forEach((device, index) => {
      addDeviceListener(index);     
      const midiElem = document.createElement('div');
      midiElem.id = `midi-${index}`; 
      midiElem.innerHTML = `<b>${index}: "midi-${device.name}"<b> <br>`;
      document.getElementById("midi").appendChild(midiElem);
      const midiDataElem = document.createElement('div');
      midiDataElem.id = `midi-${index}-data`; 
      document.getElementById(`midi-${index}`).appendChild(midiDataElem);
    });
    // WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));
    // let output = WebMidi.outputs[0];
    // let channel7 = output.channels[7];
    // let channel1 = output.channels[1];
    // channel7.playNote(32, {rawAttack: 5});
    // channel1.playNote(100, {rawAttack: 1});
  }
  
  // Listen to 'midi message' events on channels 1, 2 and 3 of the selected input MIDI device
  function addDeviceListener(index) {
    WebMidi.inputs[index].addListener(
      "midimessage",(e) => sendMidiMessage(e)
    );

    //send message to OBS Browser and Advanced Scene Switcher
    function sendMidiMessage(e){
      console.log(e)
        document.getElementById(`midi-${index}-data`).innerHTML = `channel:${JSON.stringify(e.message.channel)}, command:${JSON.stringify(e.message.command)}, type:${JSON.stringify(e.message.type)}, rawData:${JSON.stringify(e.message.rawData)}` ;
        const midiEvent = JSON.stringify(e.message)
        const deviceName = e.port._midiInput.name
    //send results to OBS Browser Source

     obs.call("CallVendorRequest", {
        vendorName: "obs-browser",
        requestType: "emit_event",
        requestData: {
          event_name: `midi-message`,
          event_data: { deviceName, midiEvent },
        },
      });
      
      //send results to Advanced Scene Switcher
      obs.call("CallVendorRequest", {
        vendorName: "AdvancedSceneSwitcher",
        requestType: "AdvancedSceneSwitcherMessage",
        requestData: {
          "message": { deviceName, midiEvent },
        },
      });
      }
    }
}