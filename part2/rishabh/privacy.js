document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	var button = document.getElementById("button");
	var here = document.getElementById("here");
	var hidden = document.getElementById("hidden");
	var list = document.getElementById("list");
	hidden.style.display = 'none';
	button.onclick = submit;
	here.onclick = reveal;
	localStorage.score = 0;
	//we can set different weights to different settings based on ease of access

	function autofill(details){
		list.removeChild(document.getElementById("autofill"));
		localStorage.score = parseInt(localStorage.score) + 1;
		chrome.privacy.services.autofillEnabled.onChange.removeListener(autofill);
	}
	chrome.privacy.services.autofillEnabled.onChange.addListener(autofill);

	function spell(details){
		list.removeChild(document.getElementById("spell"));
		localStorage.score = parseInt(localStorage.score) + 1;
		chrome.privacy.services.spellingServiceEnabled.onChange.removeListener(spell);
	}
	chrome.privacy.services.spellingServiceEnabled.onChange.addListener(spell);

	function cookie(details){
		list.removeChild(document.getElementById("cookie"));
		localStorage.score = parseInt(localStorage.score) + 1;
		chrome.privacy.websites.thirdPartyCookiesAllowed.onChange.removeListener(cookie);
	}
	chrome.privacy.websites.thirdPartyCookiesAllowed.onChange.addListener(cookie);

	function translate(details){
		list.removeChild(document.getElementById("translate"));
		localStorage.score = parseInt(localStorage.score) + 1;
		chrome.privacy.services.translationServiceEnabled.onChange.removeListener(translate);
	}
	chrome.privacy.services.translationServiceEnabled.onChange.addListener(translate);

	function password(details){
		list.removeChild(document.getElementById("password"));
		localStorage.score = parseInt(localStorage.score) + 1;
		chrome.privacy.services.passwordSavingEnabled.onChange.removeListener(password);
	}
	chrome.privacy.services.passwordSavingEnabled.onChange.addListener(password);
}

function reveal(){
	hidden.style.display = 'block';
	// user may not be an expert!!
	// update in db
	localStorage.help = parseInt(localStorage.help) + 1;
}

function submit(){
	//update score in db
	localStorage.endTime = (new Date()).getTime();
	localStorage.fourth = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'fifth.html'});
}