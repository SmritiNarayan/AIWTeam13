//arr=["youtube.com,searchengine","flipkart.com,ecommerce","facebook.com,socialmedia","twitter.com,socialmedia","ebay.com,ecommerce","netflix.com,others"];
// arr=["youtube.com","instagram.com","gmail.com","facebook.com","ask.com","flipkart.com","twitter.com","netflix.com","ebay.com"]
brr={'pottermore.com': 'others', 'web.whatsapp.com': 'others', 'coursera.org': 'others', 'imdb.com': 'others', 'wordpress.com': 'socialmedia', 'pinterest.com': 'others', 'change.org': 'others', 'webmd.com': 'others', 'icici.com': 'others', 'bookmyshow.com': 'others', 'hdfcbank.com': 'others', 'adobe.com': 'others', 'netflix.com': 'others', 'storypick.com': 'others', 'businessinsider.com': 'others', 'ieeexplore.ieee.org': 'others', 'buzzfeed.com': 'others', 'urbandictionary.com': 'others', 'softonic.com': 'others', 'blogspot.com': 'others', 'gmail.com': 'socialmedia', 'glassdoor.co.in': 'others', 'w3schools.com': 'others', 'tripadvisor.in': 'others', 'wikipedia.org': 'others', 'tripoto.com': 'others', 'thesaurus.com': 'others', 'indiatimes.com': 'others', 'wikiofthrones.com': 'others', 'picasa.com': 'others', 'ask.com': 'searchengine', 'tumblr.com': 'socialmedia', 'geeksforgeeks.org': 'others', 'dropbox.com': 'others', 'quickr.com': 'ecommerce', 'ebay.com': 'ecommerce', 'lbb.in': 'others', 'zapak.com': 'others', 'thelogicalindian.com': 'others', 'linkedin.com': 'socialmedia', 'bharatmatrimony.com': 'searchengine', 'stumbleupon.com': 'others', 'justbooks.com': 'ecommerce', 'youtube.com': 'socialmedia', 'baidu.com': 'others', 'snapdeal.com': 'ecommerce', 'gsmarena.com': 'others', 'hotstar.com': 'others', 'flipkart.com': 'ecommerce', 'jabong.com': 'ecommerce', 'yahoo.com': 'searchengine', 'hangouts.google.com': 'socialmedia', 'kaggle.com': 'others', 'piratebay.com': 'others', 'microsoft.com': 'others', 'bigsmall.in': 'ecommerce', 'github.com': 'socialmedia', 'goodreads.com': 'others', 'facebook.com': 'socialmedia', 'streetstylestore.com': 'ecommerce', 'quora.com': 'socialmedia', 'nykaa.com': 'ecommerce', 'myntra.com': 'ecommerce', 'irctc.com': 'others', 'moneycontrol.com': 'others', 'reddit.com': 'socialmedia', 'tarladalal.com': 'others', 'makemytrip.com': 'others', 'bing.com': 'searchengine', 'deccanherald.com': 'others', 'pes.edu': 'others', 'timesofindia.com': 'others', 'soundcloud.com': 'socialmedia', 'espncricinfo.com': 'others', 'paytm.com': 'others', 'kickasstorrents.com': 'others', 'amazon.com': 'ecommerce', 'steamcommunity.com': 'socialmedia', 'instagram.com': 'socialmedia', 'zomato.com': 'searchengine', 'eztv.ag': 'others', 'healthline.com': 'others', 'cracked.com': 'others', 'stackoverflow.com': 'others', 'yelp.com': 'searchengine', 'cricbuzz.com': 'others', 'aol.com': 'searchengine', 'google.com': 'searchengine', 'miniclip.com': 'others', 'twitter.com': 'socialmedia'};
arr = []
chrome.storage.local.get(function(items){
	topsite = items['topsite'];
	console.log(topsite);
	for(var i=0;i<10;i++){
		arr.push(topsite[i]);
	}
	create();
});

function create(){
	console.log(arr);
	for (each=0;each<arr.length;each++)
	{
		console.log(each);
	    key=arr[each];
	    val=brr[key];
	    console.log(key);
	    console.log(val);
	    //val=arr[each].split(",")[1];
	    imgname=key.substr(0,key.length-4);
	    imagecat=val;

	    d=document.createElement('div');
	    d.className="portfolio-item grid "+imagecat;
	    //num=2*(arr.length-each);console.log(num);d.style="width:"+num+"%";
	    

	    d2=document.createElement('div');
	    d2.className="portfolio";

	    a1=document.createElement('a');
	    a1.className="portfolio-image";
	    a1.href="https://www."+key;

	    img1=document.createElement('img');
	    img1.src="logos/"+key.split(".")[0]+".png";
	    img1.alt="";
	    img1.style="width: 80%";

	    d3=document.createElement('div');
	    d3.className="portfolio-overlay";

	    d4=document.createElement('div');
	    d4.className="thumb-info";

	    h=document.createElement('h5');
	    h.innerHTML=key.split(".")[0];
	    d4.appendChild(h);
	    d3.appendChild(d4);
	    a1.appendChild(img1);
	    a1.appendChild(d3);
	    d2.appendChild(a1);
	    d.appendChild(d2);

	    document.getElementById("portfolio-wrap").appendChild(d);
	    console.log(document.getElementById("portfolio-wrap"));

	}
}