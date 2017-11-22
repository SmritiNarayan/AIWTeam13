a = document.getElementById("settings");
a.onclick = function(){
	chrome.tabs.update({'url':'chrome://settings'});
};
b = document.getElementById("bookmarks");
b.onclick = function(){
	chrome.tabs.update({'url':'chrome://bookmarks'});
};
c = document.getElementById("history");
c.onclick = function(){
	chrome.tabs.update({'url':'chrome://history'});
};
d = document.getElementById("downloads");
d.onclick = function(){
	chrome.tabs.update({'url':'chrome://downloads'});
};
e = document.getElementById("newtab");
e.onclick = function(){
	chrome.tabs.update({'url':'chrome://newtab'});
};
f = document.getElementById("version");
f.onclick = function(){
	chrome.tabs.update({'url':'chrome://version'});
};