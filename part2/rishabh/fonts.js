document.addEventListener('DOMContentLoaded', init);
fontChange=false;
function init(){
	localStorage.startTime = (new Date()).getTime();
	var button = document.getElementById("button");
	var here = document.getElementById("here");
	var hidden = document.getElementById("hidden");
	hidden.style.display = 'none';
	button.onclick = submit;
	here.onclick = reveal;
	fontChange=false;
	chrome.fontSettings.onDefaultFontSizeChanged.addListener(callback);
}

function callback(details){
	fontSize = details.pixelSize;
	fontChange = true;
	button.value = fontSize;
}

function reveal(){
	hidden.style.display = 'block';
	// user may not be an expert!!
	// update in db
	localStorage.help = parseInt(localStorage.help) + 1;
}

function submit(){
	chrome.fontSettings.onDefaultFontSizeChanged.removeListener(callback);
	//update in db
	localStorage.endTime = (new Date()).getTime();
	if(fontChange == true)
		localStorage.third = localStorage.endTime - localStorage.startTime;
	else
		localStorage.third=-1;
	chrome.tabs.update({'url':'fourth.html'});
}