document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	x=document.getElementById("myButton");
	x.onclick=store;
}

function store(){
	x=document.getElementById("usage");
	console.log(x.options[x.selectedIndex].text)
	localStorage.purpose = x.options[x.selectedIndex].text;
	localStorage.endTime = (new Date()).getTime();
	localStorage.sixth = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'seventh.html'});
	//console.log("weird")
}