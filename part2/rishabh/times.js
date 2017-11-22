document.addEventListener('DOMContentLoaded', init);

function init(){
	button = document.getElementById("download");
	button.onclick = download;
	button = document.getElementById("classify");
	button.onclick = classify;

	list = document.createElement('ol');
	createItem(localStorage.name);
	createItem(localStorage.first);
	createItem(localStorage.second);
	createItem(localStorage.third);
	createItem(localStorage.fourth);
	createItem(localStorage.fifth);
	createItem("Purpose: "+localStorage.purpose);
	createItem("Usage: "+localStorage.usage);
	createItem(localStorage.eighth);
	createItem("Score: "+localStorage.score);
	createItem("Help: "+localStorage.help);
	document.body.appendChild(list);
	chrome.storage.local.get(function(items){
		// createItem(JSON.stringify(localStorage.bleh));
		oldList = items.data;
		newList = [localStorage.name, localStorage.first, localStorage.second, localStorage.third, localStorage.fourth, localStorage.fifth, localStorage.purpose, localStorage.usage, localStorage.eighth, localStorage.score, localStorage.help]
		localStorage.test = newList;
		if(!oldList)
			oldList = []
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

function download(){
	chrome.storage.local.get(function(items){
		data = items.data
		str="Name,First,Second,Third,Fourth,Fifth,Purpose,Usage,Eighth,Score,Help\n";
		for(i in data){
			str = str+data[i]+"\n";
		}
		createItem(str);
		file = new Blob([str], {type: 'text/plain'});
		a = document.createElement("a");
	    url = URL.createObjectURL(file);
	    a.href = url;
	    a.download = "training_data.csv";
	    document.body.appendChild(a);
	    a.click();
	    chrome.storage.local.clear();
	});
}

function classify(){
	chrome.tabs.update({'url':'classify.html'})
}