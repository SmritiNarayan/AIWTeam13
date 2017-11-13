x=document.createElement("button");
			x.onclick=store;
			x.innerHTML="Submit";
			console.log(document.getElementById("formm"));
			document.getElementById("formm").appendChild(x);
			function store(){
				x=document.getElementById("usage");
				console.log(x.options[x.selectedIndex].text)
				localStorage.setItem("usage",x.options[x.selectedIndex].text);
				chrome.tabs.update({'url':'seventh.html'});
				console.log("weird")
			}