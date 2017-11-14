document.addEventListener('DOMContentLoaded', init);

function init(){
	localStorage.startTime = (new Date()).getTime();
	x=document.getElementById("myButton");
	x.onclick=store;
}

function store(){
	x=document.getElementById("duration");
	console.log(x.options[x.selectedIndex].text)
	localStorage.usage = x.options[x.selectedIndex].text;
	localStorage.endTime = (new Date()).getTime();
	localStorage.seventh = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'times.html'});
	//console.log("weird")
}