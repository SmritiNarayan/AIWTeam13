document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	x=document.getElementById("skipButton");
	x.onclick=storeInDb;
	chrome.bookmarks.onRemoved.addListener(removeBookmark);
}

function removeBookmark(id, removed)
{
	localStorage.endTime = (new Date()).getTime();
	localStorage.fifth = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'sixth.html'});
}

function storeInDb(){
	//store in Db that he skipped or a negative time
	localStorage.fifth = -1;
	chrome.bookmarks.onRemoved.removeListener(removeBookmark);
    chrome.tabs.update({'url':'sixth.html'});
}