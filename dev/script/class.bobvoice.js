'use strict';

class bobvoice{
	constructor(lang) {
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
	
	Config() {
		for(let properties in this.config){
			this.ura[properties] = this.config[properties];
		}
	}

	Speak(essay) {
		//let _essay = essay.split(('!'||'.'||'...'||'?'));
		
		for(let i in essay) {
			console.log(essay[i]);
			
			this.ura.text = essay[i];
			
			speechSynthesis.speak(this.ura);

			console.log('bobvoice: ', this);
		}
	}

	FirstEnd(callback) {
		this.ura.onend = function(event) {
			//captVoice.start();
			callback;
			console.log('Finished in ' + event.elapsedTime + ' seconds.');
		};
	}

	End() {
		this.ura.onend = function(event) {
			console.log('Finished in ' + event.elapsedTime + ' seconds.');
		};
	}
}