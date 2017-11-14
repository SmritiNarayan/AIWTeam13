chrome.bookmarks.onCreated.addListener(function(id, bookmark)
{
	if(bookmark.url){
		localStorage.endTime = (new Date()).getTime();
		localStorage.first = localStorage.endTime - localStorage.startTime;
		chrome.tabs.update({'url':'second.html'});
		localStorage.startTime = (new Date()).getTime();
	}
	else{
		localStorage.endTime = (new Date()).getTime();
		localStorage.second = localStorage.endTime - localStorage.startTime;
		chrome.tabs.update({'url':'third.html'});
	}
});

chrome.windows.onCreated.addListener(function(window)
{
	//works only for keys that dont already have meanings
	chrome.tabs.update({'url':'abc'});
});

chrome.bookmarks.onRemoved.addListener(function(id, removed)
{
	localStorage.endTime = (new Date()).getTime();
	localStorage.fifth = localStorage.endTime - localStorage.startTime;
	chrome.tabs.update({'url':'sixth.html'});
});

// chrome.signedInDevices.onDeviceInfoChange.addListener(function(devices)
// {
// 	chrome.tabs.update({'url':'deviceChange'});
// });
// chrome.downloads.onChanged.addListener(function(id)
// {
// 	chrome.tabs.update({'url':'downloadRemoved'});
// });
chrome.commands.onCommand.addListener(function(commandName)
{
	//works only for keys that dont already have meanings
	chrome.tabs.update({'url':'abc'});
});
// chrome.cookies.onChanged.addListener(function(myobj){
// 	chrome.tabs.create({'url':'test'});
// });