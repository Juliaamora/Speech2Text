const speechElement = new webkitSpeechRecognition(); //hiermit nutzen wir die Web API
speechElement.lang = 'de-DE'; //Sprache
speechElement.interimResults = true; //default-Wert = false; 
speechElement.continuous = true; //Sprachsteuerung hört NICHT auf(continuous), wenn man aufhört zu sprechen
let final_transcript = '';
const playButtonHTML = document.getElementById("play-button");
let k=1;

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

    
    function savetxt() {
    const textArea = document.querySelector('textarea');
    downloadToFile(textArea.value, 'my-new-speechie.txt', 'text/plain');
};

function playButton() {
    if(k==1){
    playButtonHTML.classList.remove("fa-play-circle");
    playButtonHTML.classList.add("fa-pause-circle")
    k=2;
    console.log("IF geht");
    console.log("Transkription startet");
    speechElement.start();
    document.getElementById('interim').innerHTML = "START";
    
    } else{
    playButtonHTML.classList.remove("fa-pause-circle");
    playButtonHTML.classList.add("fa-play-circle")
    k=1;
    console.log("Else geht");
    console.log("Transkription pausiert");
    speechElement.stop();
    document.getElementById('interim').innerHTML = "PAUSE";
    
    }
    
    }


//als PDf speichern -->CAVE nur 1mal ausführbar error. toFixed undefined
let doc = new jsPDF();
let specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};
$('#btnSavePDF').click(save)

    
    function save () {
    doc.fromHTML(
        $('#final').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
    doc.save('speechie.pdf');}


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
