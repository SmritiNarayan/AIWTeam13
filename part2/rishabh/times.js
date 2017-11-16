document.addEventListener('DOMContentLoaded', init);

function init(){
	button = document.getElementById("download");
	button.onclick = download;

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
		str="Num,First,Second,Third,Fourth,Fifth,Sixth,Seventh,Eighth,Score,Help,Purpose,Usage\n";
		for(i in data){
			str = str+i+","+data[i]+"\n";
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