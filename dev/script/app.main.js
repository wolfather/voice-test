var btn = document.querySelector('#btnCaptureVoice'),
    texto = document.querySelector("#textSpoken"),
    productSection = document.querySelector('#product');


var fn = {
	setColorBlue: function() {
		console.log(conteudo[j]);
		console.log("tem azul");
		document.querySelector('body').style.backgroundColor = '#00f';
	},
	
	setFieldFocus: function() {
		searchField.focus();

		searchField.value = transcript;

		console.log("Debug search: ", conteudo[j]);

		if( transcript.indexOf("cancel") !== -1 ) {
			searchField.value = "";
		}
		if( transcript.indexOf("submit") !== -1 ) {
			alert("Works!");
			//document.querySelector('name["searchForm"]').submit();
		}
	},

	setEditorVisible: function() {
		document.querySelector('#editor').classList.toggle('visible');
	}
};


//var padrao = /backspace/i;
var conteudo =[];
var splitText = texto.value.split('');


texto.addEventListener('change', function(){
    console.log(this.value );
    console.log(this.textContent);
}, false);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


var captVoice;
function alerta(){
    alert("Teste!");
}
if (!SpeechRecognition) {
	console.log('Doesn\'t support voice recognition.');
}
else {
	captVoice = new SpeechRecognition();
	console.log("CAPTAçÃO DE VOZ", captVoice);
	captVoice.grammars = new webkitSpeechGrammarList();
	captVoice.grammars.lang = 'pt-BR'; //'en-GB';//'pt-BR';//"en-US";

	captVoice.continuous = true;
	captVoice.maxAlternatives = 5;
	captVoice.interimResults = true;


	captVoice.onstart = function() {};
	captVoice.onend = function() {};
	captVoice.onerror = function(event) {};

	captVoice.onresult = function(event){

		console.log('event ', event );
		var lang = event.srcElement.lang;
		console.log(lang);
		event.srcElement.lang = 'pt-BR';



var val = e.results[i][0].transcript;
if (e.results[i].isFinal) {
	final_transcript += " " + val;
} else {
	interim_transcript += " " + val;
}
		for (var i = event.resultIndex; i < event.results.length; i++) {
			//texto.textContent = "";
		    if(event.results[i].isFinal){
				//texto.textContent = event.results[i][0].transcript;
			}
			else{
				//conteudo = event.results[i][0].transcript + " ";
				//console.log(conteudo);

				var j = 0,
					transcript = event.results[i][0].transcript,
					searchField = document.querySelector('#searchterm');


				texto.textContent = transcript + " ";
				conteudo.push(transcript + " ");

				//console.log("TESTE", conteudo);

				for(j; j < conteudo.length; j += 1) {
					//console.log("PALAVRAS", conteudo[j]);

					if( conteudo[j].indexOf("blue") !== -1 ){
						fn.setColorBlue();
					}

					if( conteudo[j].indexOf("search") !== -1 ) {
						fn.setFieldFocus();
					}

					if( (/essay/gi).test(conteudo[j])) {
						fn.setEditorVisible();
					}

					//focus product section
					if( conteudo[j].indexOf("product") !== -1 ) {
						productSection.focus();
					}
					
					if( conteudo[j].indexOf("stop listen") !== -1 ) {
						captVoice.stop();
					}


				}//end for

			}
		}
	}

	btn.addEventListener("click",function(){
		captVoice.start();
	});
}







var dictionaryMessages = {
	'en' : {
		lang: 'en-US',
		greetings: ['Hi!', 'Welcome!'],
		whatyouwanttodo: ['What you want to do?']
	},
	'pt' : {
		lang: 'pt-BR',
		greetings: ['Olá!', 'Seja bem vindo!'],
		whatyouwanttodo: ['O que quer fazer?']
	}
};

function BobVoice(lang) {
	this.ura = 'speechSynthesis' in window ? new SpeechSynthesisUtterance() : 0;

	this.getVoices = speechSynthesis.getVoices();

	this.ura.voice = this.getVoices.voice = this.getVoices.filter(function(voice) {
		return voice.name.indexOf('Alex') !== -1;
	})[0];

	this.config = {
		lang 	: lang, //dictionaryUraMessages.pt.lang,
		rate 	: 1.0,
		pitch 	: 1.0
	};
}
BobVoice.prototype.Config = function() {
	for(var properties in this.config){
		this.ura[properties] = this.config[properties];
	}
};

BobVoice.prototype.Speak = function(essay) {
	//var _essay = essay.split(('!'||'.'||'...'||'?'));
	
	for(var i in essay) {
			console.log(essay[i]);
			
			this.ura.text = essay[i];
			
			speechSynthesis.speak(this.ura);

			console.log('bobvoice: ', BobVoice);

	}
};

BobVoice.prototype.FirstEnd = function() {
	this.ura.onend = function(event) {
		captVoice.start();
		console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};
};
BobVoice.prototype.End = function() {
	this.ura.onend = function(event) {
		console.log('Finished in ' + event.elapsedTime + ' seconds.');
	};
};


(function(){
	var bob = new BobVoice(dictionaryMessages.pt.lang);
	bob.Config();
	bob.Speak(dictionaryMessages.pt.greetings);
	bob.FirstEnd();
	

}());













