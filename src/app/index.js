const speechElement = new webkitSpeechRecognition(); //hiermit nutzen wir die Web API
speechElement.lang = 'de-DE'; //Sprache
speechElement.interimResults = true; //default-Wert = false; 
speechElement.continuous = true; //Sprachsteuerung hört NICHT auf(continuous), wenn man aufhört zu sprechen
let final_transcript = '';

speechElement.onstart = function liveTranscription() {}

speechElement.onresult = function liveTranscription(event) {
	let interim_transcript = ''; //der Text, den wir gerade sprechen, der aber noch nicht final ist
	for (let i = event.resultIndex; i < event.results.length; ++i) { // i = das Gesprochene / Sprachaufnahme
		if (event.results[i].isFinal) {
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

function playButton() {
	console.log("Transkription startet");
	speechElement.start();
	document.getElementById('interim').innerHTML = "START";
}

function pauseButton() {
	console.log("Transkription pausiert");
	speechElement.stop();
	document.getElementById('interim').innerHTML = "PAUSE";
}

function stopButton() {
	console.log("Transkription pausiert");
	speechElement.stop();
	document.getElementById('interim').innerHTML = "STOP";
}

//Download
const downloadToFile = (content, filename, contentType) => {
	const a = document.createElement('a');
	const file = new Blob([content], {
		type: contentType
	});

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
};

document.querySelector('#cmd').addEventListener('click', () => {
	const textArea = document.querySelector('textarea');

	downloadToFile(textArea.value, 'my-new-file.txt', 'text/plain');
})
//als PDf speichern
let doc = new jsPDF();
let specialElementHandlers = {
	'#editor': function (element, renderer) {
		return true;
	}
};
$('#btnSave').click(function () {
	doc.fromHTML(
		$('#final').html(), 15, 15, {
			'width': 170,
			'elementHandlers': specialElementHandlers
		});
	doc.save('Reason.pdf');
});

//Audiofile einbinden
const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("openFile");
const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function () {
	realFileBtn.click();
});

realFileBtn.addEventListener("change", function () {
	if (realFileBtn.value) {
		customTxt.innerHTML = realFileBtn.value.match(
			/[\/\\]([\w\d\s\.\-\(\)]+)$/
		)[1];
	} else {
		customTxt.innerHTML = "No file chosen, yet.";
	}
});

let $audio = $('#myAudio');
$('input').on('change', function (e) {
	let target = e.currentTarget;
	let file = target.files[0];
	let reader = new FileReader();

	console.log($audio[0]);
	if (target.files && file) {
		let reader = new FileReader();
		reader.onload = function (e) {
			$audio.attr('src', e.target.result);
			$audio.play();
		}
		reader.readAsDataURL(file);
	}
});