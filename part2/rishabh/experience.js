document.addEventListener('DOMContentLoaded', init);
function init(){
	x=document.getElementById("myButton");
	x.onclick=store;
}

function store(){
	x=document.getElementById("duration");
	console.log(x.options[x.selectedIndex].text)
	localStorage.setItem("usage",x.options[x.selectedIndex].text);
	chrome.tabs.update({'url':'eighth.html'});
	//console.log("weird")
}