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
let summary = document.querySelector('summary')
let change = document.getElementById('change');
let redBtn = document.getElementById('redBtn');
let greenBtn = document.getElementById('greenBtn');
let purpleBtn = document.getElementById('purpleBtn');

let k = 1;
const interim = document.querySelector('.interim');
const final = document.querySelector('.final');
const datei = document.querySelector('#datei');
const coloredButtons = document.querySelector('.coloredButtons');
const helpButton = document.querySelector('#help-pulse');

let speaker = '';


function switchColor(color) {
  let test = color + ': ' + document.getElementById('final').appendChild(span);
  if (span.classList == 'speaker' + color) {
    span = document.createElement('p');
    console.log('remove');
    span.classList.remove('speaker' + color);
    final_transcript = '';
    setSpeaker(color);
    showChosenColor(color);
    console.log(showChosenColor);
  } else {
    span = document.createElement('p');
    console.log('addd');
    span.classList.add('speaker' + color);
    final_transcript = '';
    setSpeaker('speaker' + color);
    showChosenColor(color);
    console.log(showChosenColor);
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
    speaker = ' <br>';
  }
}

function showChosenColor(color) {
  if( document.getElementById(color+'Btn').classList.contains('clicked')){
    document.getElementById(color+'Btn').classList.remove('clicked');
    console.log("if");
  }  
  else if(redBtn.classList.contains('clicked') || greenBtn.classList.contains('clicked') || purpleBtn.classList.contains('clicked')){
        redBtn.classList.remove('clicked');
        greenBtn.classList.remove('clicked');
        purpleBtn.classList.remove('clicked');
        document.getElementById(color+'Btn').classList.add('clicked');
        console.log("if else");
    }else {
        document.getElementById(color+'Btn').classList.add('clicked');
        console.log("else");
    }
  };

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
  updateScroll();
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
  /* 
    doc.fromHTML(
        $('#final').html(), 15, 15, {
            'width': 170,
            //'elementHandlers': specialElementHandlers
        });
    doc.save('speechie.pdf'); */
}

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

})

//Anleitung

const tutorial = document.querySelector("#tutorial");
const roboter = document.querySelector("#roboter");
let infoText = document.querySelector("#info-text");


function startTutorial() {
    roboter.classList.replace("hidden","roboter-visible");
}

var clicks = 0;
function onClick() {
  clicks += 1;
  changePosition();
};

function changePosition () {
    console.log("changePosition")
    if(clicks===1){
        step1()
    } else if(clicks===2) {
        step2()
    } else if(clicks===3) {
        step3()
    } else if(clicks===4) {
        step4()
    } else if(clicks===5) {
        step5()
    } else if(clicks===6) {
        step6()
    } else if(clicks===7) {
        step7()
    } else if(clicks===8) {
        step8()
    }  else if(clicks===9) {
      step9()
  } 
}
let animationClass="roboter-visible";



function step1() {
    roboter.classList.replace(animationClass,"roboter-step1");
    setInfoText("Hier kannst du die Transkription starten und pausieren.");
    animationClass="roboter-step1";
    playButtonHTML.classList.add("pulse");
    window.scrollTo(0,document.body.scrollHeight);
  

}
function step2() {
    roboter.classList.replace(animationClass,"roboter-step2");
    setInfoText("Hier unten siehst du in Echtzeit, was Speechie aus dem Gesagten erkennt.");
    animationClass="roboter-step2";
    playButtonHTML.classList.remove("pulse");
    interim.classList.add("pulse-light");
}
function step3() {
    roboter.classList.replace(animationClass,"roboter-step3");
    setInfoText("Hier oben steht dann dein endgültiger Text.");
    animationClass="roboter-step3";
    interim.classList.remove("pulse-light");
    final.classList.add("pulse-light");
    document.documentElement.scrollTop;
}
function step4() {
    roboter.classList.replace(animationClass,"roboter-step4");
    setInfoText("Hier kannst du deine txt-Datei herunterladen und dann direkt bearbeiten");
    animationClass="roboter-step4";
    final.classList.remove("pulse-light");
    saveButton.classList.add("pulse");
}

function step5() {
    setInfoText("Diese Funktion ist ebenfalls durch das Menü erreichbar unter: Datei > Speichern"); 
    saveButton.classList.remove("pulse");
  
}

function step6() {
    roboter.classList.replace(animationClass,"roboter-step6");
    setInfoText("Hier kannst unter Datei > Öffnen Audiodateien öffnen und abspielen lassen");
    animationClass="roboter-step6";
    document.documentElement.scrollTop = 0;
    
    
}
function step7() {
    roboter.classList.replace(animationClass,"roboter-step7");
    setInfoText("Oh, deine Freunde sind auch mit dabei? Hiermit kannst du die Sprecher im Text unterschiedlich darstellen");
    animationClass="roboter-step7";
    datei.classList.remove("pulse-light");
    coloredButtons.classList.add("pulse-light");
    window.scrollTo(0,document.body.scrollHeight);


}
function step8() {
    roboter.classList.replace(animationClass,"roboter-visible");
    setInfoText("Alles klar? Dann kann es ja losgehen! Eine ausführliche Anleitung findest du oben im Menü.");
    animationClass="roboter-visible";
    coloredButtons.classList.remove("pulse-light");
    helpButton.classList.add("pulse-heavy");
    document.documentElement.scrollTop = 0;
}
function step9() {
  roboter.classList.replace(animationClass,"hidden");
  coloredButtons.classList.remove("pulse-light");
  saveButton.classList.remove("pulse");
  final.classList.remove("pulse-light");
  interim.classList.remove("pulse-light");
  playButtonHTML.classList.remove("pulse");
  helpButton.classList.remove("pulse-heavy");
  animationClass="roboter-visible";
  clicks=0;
  setInfoText("Hi ich bin Spexter, ich zeig dir wie meine Welt transkribiert!");
  document.documentElement.scrollTop = 0;
}

function setInfoText(text) {
    infoText.innerHTML = text;
    }

change.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  saveButton.classList.toggle('darkbuttons');
  playButtonHTML.classList.toggle('darkbuttons');
  audioText.classList.toggle('darkAudioText');
  summary.classList.toggle('darkSummary')
});

const anleitung = document.querySelector('.anleitung');
const closeButtonAnleitung = document.querySelector('.fa-times-circle');

closeButtonAnleitung.addEventListener('click', refresh);
helpButton.addEventListener('click', openAnleitung);

function refresh() {
  anleitung.classList.add('hidden');
  console.log("refresh")
}

function openAnleitung() {
  anleitung.classList.remove('hidden');
  console.log("öffne anleitung")
};

window.addEventListener("load", refresh);


function updateScroll(){
  let element = document.getElementById('final');
  element.scrollTop = element.scrollHeight;
}
