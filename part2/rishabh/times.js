document.addEventListener('DOMContentLoaded', init);

function init(){
	list = document.createElement('ol');
	createItem(localStorage.first);
	createItem(localStorage.second);
	createItem(localStorage.third);
	createItem(localStorage.fourth);
	createItem(localStorage.fifth);
	createItem(localStorage.sixth);
	createItem(localStorage.seventh);
	createItem("Score: "+localStorage.score);
	createItem("Help: "+localStorage.help);
	createItem("Purpose: "+localStorage.purpose);
	createItem("Usage: "+localStorage.usage);
	document.body.appendChild(list);
}

function createItem(item){
	i = document.createElement('li');
	i.innerHTML = item;
	list.appendChild(i);
}