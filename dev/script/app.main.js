var btn = document.querySelector('#btnCaptureVoice'),
    texto = document.querySelector("#textSpoken");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


if (!window.SpeechRecognition) {
    console.log('Doesn\'t support voice recognition.');
}
else {
	var captVoice = new window.SpeechRecognition();

	captVoice.continuous = true;
    captVoice.interimResults = true;

	captVoice.onresult = function(event){
        console.log( event );
		
        for (var i = event.resultIndex; i < event.results.length; i++) {
			if(event.results[i].isFinal){
				//texto.textContent = "";
                //texto.textContent = event.results[i][0].transcript;
			}else{
                texto.textContent += event.results[i][0].transcript + " ";
                //texto.texContent += "<br/>";
                console.log('Acerto');
			}
		}
	}

	btn.addEventListener("click",function(){
        captVoice.start();
	});
}