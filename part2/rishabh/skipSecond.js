document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	x=document.getElementById("skipButton");
	x.onclick=storeInDb;
	chrome.bookmarks.onCreated.addListener(addFolder);
}

function addFolder(id, bookmark){
	localStorage.endTime = (new Date()).getTime();
	localStorage.second = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'third.html'});
}

function storeInDb(){
	//store in Db that he skipped or a negative time
	localStorage.second = -1;
    chrome.tabs.update({'url':'third.html'});
}