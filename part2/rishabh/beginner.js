a = document.getElementById("a");
a.onclick = function(){
	chrome.tabs.update({'url':'chrome://settings'});
};