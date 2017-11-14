document.addEventListener('DOMContentLoaded', init);
function init(){
	x=document.getElementById("startButton");
	x.onclick=storeInDb;
}
function storeInDb(){
	//store in Db that he skipped or a negative time
        chrome.tabs.update({'url':'first.html'});
}