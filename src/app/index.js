var speechElement = new webkitSpeechRecognition();
speechElement.lang = 'de-DE';
speechElement.interimResults = true;
speechElement.continuous = true;
var final_transcript = '';
speechElement.start();

speechElement.onstart = function() {
}

speechElement.onresult = function(event) {
	var interim_transcript = '';
	for(var i = event.resultIndex; i < event.results.length; ++i) {
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