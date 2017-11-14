document.addEventListener('DOMContentLoaded', init);
function init(){
	x=document.getElementById("skipButton");
	x.onclick=storeInDb;
}
function storeInDb(){
	//store in Db that he skipped or a negative time
        chrome.tabs.update({'url':'second.html'});
}