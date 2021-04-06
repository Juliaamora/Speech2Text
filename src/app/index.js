var speechElement = new webkitSpeechRecognition(); 		//hiermit nutzen wir die Web API
speechElement.lang = 'de-DE'; 		//Sprache
speechElement.interimResults = true; 		//default-Wert = false; 
speechElement.continuous = true;		//Sprachsteuerung hört NICHT auf(continuous), wenn man aufhört zu sprechen
var final_transcript = '';


speechElement.onstart = function() {
}

speechElement.onresult = function(event) {
	var interim_transcript = ''; //der Text, den wir gerade sprechen, der aber noch nicht final ist
	for(var i = event.resultIndex; i < event.results.length; ++i) {		// i = das Gesprochene / Sprachaufnahme
		if(event.results[i].isFinal) {
			final_transcript += event.results[i][0].transcript;
            console.log("HalloIF");
		} else {
			interim_transcript += event.results[i][0].transcript;
            console.log("HalloELSE");
		}
	}
	document.getElementById('final').innerHTML = final_transcript;
	document.getElementById('interim').innerHTML = interim_transcript;
}


function playButton(){
	console.log("Transkription startet");
	speechElement.start();
	document.getElementById('interim').innerHTML = "START";
}
function pauseButton(){
	console.log("Transkription pausiert");
	speechElement.stop();
	document.getElementById('interim').innerHTML = "PAUSE";
	
}



const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("openFile");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function() {
  realFileBtn.click();
});

realFileBtn.addEventListener("change", function() {
  if (realFileBtn.value) {
    customTxt.innerHTML = realFileBtn.value.match(
      /[\/\\]([\w\d\s\.\-\(\)]+)$/
    )[1];
  } else {
    customTxt.innerHTML = "No file chosen, yet.";
  }
});

