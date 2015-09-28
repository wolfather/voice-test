'use strict';

var langSelection = {
	gb : 'en-GB',
	us : 'en-US',
	br : 'pt-BR'
};

class CaptVoice {

	contructor() {

		this.captvoice = 'SpeechRecognition' in window ? new SpeechRecognition() : 0;

		this.config = {
			continuous : true,
			interimResults : true,
			maxAlternatives : 5
		};

	}
	Config() {
		for(let _properties in this.config) {
			this.captvoice[_properties] = this.config[_properties];
		}
	}

	CheckGrammar(lang) {
		this.captVoice.grammars = 'webkitSpeechGrammarList' in window ? new webkitSpeechGrammarList() : 0;
		this.captVoice.grammars.lang = lang;
	}
	
	Listen() {

		this.captVoice.onresult = function(event) {

			console.log('event ', event );
			let lang = event.srcElement.lang;
			console.log(lang);
			event.srcElement.lang = 'pt-BR';


			for (let i = event.resultIndex; i < event.results.length; i++) {
				//texto.textContent = "";
			    if(event.results[i].isFinal){
					//texto.textContent = event.results[i][0].transcript;
				}
				else {

					//conteudo = event.results[i][0].transcript + " ";
					//console.log(conteudo);

					let transcript = event.results[i][0].transcript,
						searchField = document.querySelector('#searchterm');


					texto.textContent = transcript + " ";
					conteudo.push(transcript + " ");

					//console.log("TESTE", conteudo);

					let j = 0;
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

					}//end for

				}
			}
		}
	}
}
