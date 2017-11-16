document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	x=document.getElementById("skipButton");
	x.onclick=storeInDb;
	chrome.bookmarks.onCreated.addListener(addBookmark);
}

function addBookmark(id, bookmark)
	{
		if(bookmark.url){
			localStorage.endTime = (new Date()).getTime();
			localStorage.first = localStorage.endTime - localStorage.startTime;
			chrome.tabs.update({'url':'second.html'});
		}
	}

function storeInDb(){
	//store in Db that he skipped or a negative time
	localStorage.first = -1;
	chrome.bookmarks.onCreated.removeListener(addBookmark);;
    chrome.tabs.update({'url':'second.html'});
}