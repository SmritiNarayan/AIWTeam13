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
	createItem(localStorage.eighth);
	createItem("Score: "+localStorage.score);
	createItem("Help: "+localStorage.help);
	createItem("Purpose: "+localStorage.purpose);
	createItem("Usage: "+localStorage.usage);
	document.body.appendChild(list);
	chrome.storage.local.get(function(items){
		// createItem(JSON.stringify(localStorage.bleh));
		oldList = items.data;
		newList = [localStorage.first, localStorage.second, localStorage.third, localStorage.fourth, localStorage.fifth, localStorage.sixth, localStorage.seventh, localStorage.eighth, localStorage.score, localStorage.help, localStorage.purpose, localStorage.usage]
		oldList.push(newList);
		chrome.storage.local.set({'data': oldList});
		for(i in oldList){
			createItem(oldList[i]);
		}
		// createItem(oldList.data);
	});
}

function createItem(item){
	i = document.createElement('li');
	i.innerHTML = item;
	list.appendChild(i);
}