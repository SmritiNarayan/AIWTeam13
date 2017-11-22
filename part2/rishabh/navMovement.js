document.addEventListener('DOMContentLoaded', init);

function init(){
x=document.getElementById("xclosenav");
x.onclick=closeNav;
y=document.getElementById("xxspan");
y.onclick = openNav;
z= document.getElementById("sbsbutton");
z.onmouseover = randomweirdfn;
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
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    
}

function randomweirdfn() {
	mm=document.getElementById('name').value;
	document.getElementById('ff').action+=mm;
	console.log(document.getElementById('ff').action);
}