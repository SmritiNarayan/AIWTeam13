document.addEventListener('DOMContentLoaded', init);

function init(){
x=document.getElementById("xclosenav");
x.onclick=closeNav;
y=document.getElementById("xxspan");
y.onclick = openNav;
z= document.getElementById("sbsbutton");
z.onmouseover = randomweirdfn;
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