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
function stopButton(){
	console.log("Transkription pausiert");
	speechElement.stop();
	document.getElementById('interim').innerHTML = "STOP";
}

const downloadToFile = (content, filename, contentType) => {
	const a = document.createElement('a');
	const file = new Blob([content], {type: contentType});
	
	a.href= URL.createObjectURL(file);
	a.download = filename;
	a.click();
	
	URL.revokeObjectURL(a.href);
  };
  
  document.querySelector('#btnSave').addEventListener('click', () => {
	const textArea = document.querySelector('textarea');
	
	downloadToFile(textArea.value, 'my-new-file.txt', 'text/plain');
  });