document.addEventListener('DOMContentLoaded', init);

function init(){
	var button = document.getElementById("button");
	var here = document.getElementById("here");
	var hidden = document.getElementById("hidden");
	var list = document.getElementById("list");
	hidden.style.display = 'none';
	button.onclick = submit;
	here.onclick = reveal;
	score = 0;
	//we can set different weights to different settings based on ease of access
	
	function autofill(details){
		list.removeChild(document.getElementById("autofill"));
		score++;
		chrome.privacy.services.autofillEnabled.onChange.removeListener(autofill);
	}
	chrome.privacy.services.autofillEnabled.onChange.addListener(autofill);

	function spell(details){
		list.removeChild(document.getElementById("spell"));
		score++;
		chrome.privacy.services.spellingServiceEnabled.onChange.removeListener(spell);
	}
	chrome.privacy.services.spellingServiceEnabled.onChange.addListener(spell);

	function cookie(details){
		list.removeChild(document.getElementById("cookie"));
		score++;
		chrome.privacy.websites.thirdPartyCookiesAllowed.onChange.removeListener(cookie);
	}
	chrome.privacy.websites.thirdPartyCookiesAllowed.onChange.addListener(cookie);

	function translate(details){
		list.removeChild(document.getElementById("translate"));
		score++;
		chrome.privacy.services.translationServiceEnabled.onChange.removeListener(translate);
	}
	chrome.privacy.services.translationServiceEnabled.onChange.addListener(translate);

	function password(details){
		list.removeChild(document.getElementById("password"));
		score++;
		chrome.privacy.services.passwordSavingEnabled.onChange.removeListener(password);
	}
	chrome.privacy.services.passwordSavingEnabled.onChange.addListener(password);
}

function reveal(){
	hidden.style.display = 'block';
	// user may not be an expert!!
	// update in db
}

function submit(){
	//update score in db
	chrome.tabs.update({'url':'fifth.html'});
}