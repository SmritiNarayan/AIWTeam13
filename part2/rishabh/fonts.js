document.addEventListener('DOMContentLoaded', init);
fontChange=false;
function init(){
	localStorage.startTime = (new Date()).getTime();
	p = document.getElementById("p");
	var button = document.getElementById("button");
	var here = document.getElementById("here");
	var hidden = document.getElementById("hidden");
	hidden.style.display = 'none';
	button.onclick = notComplete;
	here.onclick = reveal;
	fontChange=false;
	chrome.fontSettings.onDefaultFontSizeChanged.addListener(callback);
}

function callback(details){
	fontSize = details.pixelSize;
	chrome.fontSettings.onDefaultFontSizeChanged.removeListener(callback);
	//update in db
	localStorage.endTime = (new Date()).getTime();
	localStorage.third = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'fourth.html'});
	// button.value = fontSize;
}

function notComplete(){
	localStorage.third=-1;
	chrome.tabs.update({'url':'fourth.html'});
}

function reveal(){
	hidden.style.display = 'block';
	// user may not be an expert!!
	// update in db
	localStorage.help = parseInt(localStorage.help) + 1;
}