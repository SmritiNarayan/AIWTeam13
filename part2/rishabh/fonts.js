document.addEventListener('DOMContentLoaded', init);

function init(){
	var button = document.getElementById("button");
	var here = document.getElementById("here");
	var hidden = document.getElementById("hidden");
	hidden.style.display = 'none';
	button.onclick = submit;
	here.onclick = reveal;
	chrome.fontSettings.onDefaultFontSizeChanged.addListener(callback);
}

function callback(details){
	fontSize = details.pixelSize;
	button.value = fontSize;
}

function reveal(){
	hidden.style.display = 'block';
	// user may not be an expert!!
	// update in db
}

function submit(){
	chrome.fontSettings.onDefaultFontSizeChanged.removeListener(callback);
	//update in db
	chrome.tabs.update({'url':'fourth.html'});
}