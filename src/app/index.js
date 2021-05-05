const speechElement = new webkitSpeechRecognition(); //hiermit nutzen wir die Web API
speechElement.lang = 'de-DE'; //Sprache
speechElement.interimResults = true; //default-Wert = false;
speechElement.continuous = true; //Sprachsteuerung hört NICHT auf(continuous), wenn man aufhört zu sprechen
let final_transcript = '';
let interim_transcript;
let span = document.createElement('p');
const playButtonHTML = document.getElementById('play-button');
let saveButton = document.querySelector('#btnSave');
let audioText = document.querySelector('#custom-text');
let change = document.getElementById('change');
let k = 1;

let speaker = '';

function switchColor(color) {
  let test = color + ': ' + document.getElementById('final').appendChild(span);
  if (span.classList == 'speaker' + color) {
    span = document.createElement('p');
    console.log('remove');
    span.classList.remove('speaker' + color);
    final_transcript = '';
    setSpeaker(color);
  } else {
    span = document.createElement('p');
    console.log('addd');
    span.classList.add('speaker' + color);
    final_transcript = '';
    setSpeaker('speaker' + color);
  }
}

function setSpeaker(wort) {
  if (wort == 'speakerred') {
    speaker = 'Sprecher1: <br>';
  } else if (wort == 'speakerpurple') {
    speaker = 'Sprecher3: <br>';
  } else if (wort == 'speakergreen') {
    speaker = 'Sprecher2: <br>';
  } else {
    speaker = ' ';
  }
}

speechElement.onstart = function liveTranscription() {};

speechElement.onresult = function liveTranscription(event) {
  let interim_transcript = ''; //der Text, den wir gerade sprechen, der aber noch nicht final ist
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    // i = das Gesprochene / Sprachaufnahme
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
      console.log('HalloIF');
    } else {
      interim_transcript += event.results[i][0].transcript;
      console.log('HalloELSE');
    }
  }
  span.innerHTML = speaker + final_transcript;
  document.getElementById('interim').innerText = interim_transcript;
  document.getElementById('final').appendChild(span);
};

//Download
const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {
    type: contentType,
  });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

function savetxt() {
  const textArea = document.querySelector('#final').innerText;
  downloadToFile(textArea, 'my-new-speechie.txt', 'text/plain');
}

function playButton() {
  if (k == 1) {
    k = 2;
    playButtonHTML.classList.replace('fa-play-circle', 'fa-pause-circle');
    console.log('Transkription startet');
    speechElement.start();
    document.getElementById('interim').innerHTML = 'START';
  } else {
    k = 1;
    playButtonHTML.classList.replace('fa-pause-circle', 'fa-play-circle');
    console.log('Transkription pausiert');
    speechElement.stop();
    document.getElementById('interim').innerHTML = 'PAUSE';
  }
}

//als PDf speichern -->CAVE nur 1mal ausführbar error. toFixed undefined
let doc = new jsPDF();
let specialElementHandlers = {
  '#editor': function (element, renderer) {
    return true;
  },
};
$('#btnSavePDF').click(save);

function save() {
  doc.fromHTML($('#final').html(), 15, 15, {
    width: 170,
    elementHandlers: specialElementHandlers,
  });
  doc.save('speechie.pdf');
  /* =======
    doc.fromHTML(
        $('#final').html(), 15, 15, {
            'width': 170,
            //'elementHandlers': specialElementHandlers
        });
    doc.save('speechie.pdf');
>>>>>>> f7f62f398aa15954d3deb26a4b659940f22dcfdf
} */

  //Audiofile einbinden
  const realFileBtn = document.getElementById('real-file');
  const customBtn = document.getElementById('openFile');
  const customTxt = document.getElementById('custom-text');

  customBtn.addEventListener('click', function () {
    realFileBtn.click();
  });

  realFileBtn.addEventListener('change', function () {
    if (realFileBtn.value) {
      customTxt.innerHTML = realFileBtn.value.match(
        /[\/\\]([\w\d\s\.\-\(\)]+)$/
      )[1];
    } else {
      customTxt.innerHTML = 'No file chosen, yet.';
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
      };
      reader.readAsDataURL(file);
    }
  });
}

change.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  saveButton.classList.toggle('darkbuttons');
  playButtonHTML.classList.toggle('darkbuttons');
  audioText.classList.toggle('darkAudioText');
});
