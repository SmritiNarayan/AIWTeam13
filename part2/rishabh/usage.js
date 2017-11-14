document.addEventListener('DOMContentLoaded', init);
function init(){
	x=document.getElementById("myButton");
	x.onclick=store;
}

function store(){
	x=document.getElementById("usage");
	console.log(x.options[x.selectedIndex].text)
	localStorage.setItem("usage",x.options[x.selectedIndex].text);
	chrome.tabs.update({'url':'seventh.html'});
	//console.log("weird")
}