document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.help = 0;
	x=document.getElementById("startButton");
	x.onclick=storeInDb;
}

function storeInDb(){
	//store in Db that he skipped or a negative time
	n = document.getElementById('name');
	localStorage.name = n.value;
    chrome.tabs.update({'url':'first.html'});
}