document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	x=document.getElementById("skipButton");
	x.onclick=storeInDb;
}

function storeInDb(){
	//store in Db that he skipped or a negative time
	localStorage.fifth = -1;
    chrome.tabs.update({'url':'sixth.html'});
}