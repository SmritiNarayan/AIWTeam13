chrome.bookmarks.onCreated.addListener(function(id, bookmark)
{
	if(bookmark.url)
		chrome.tabs.update({'url':'http://index.html/bookmarkCreatedd'});
	else
		chrome.tabs.update({'url':'folderCreated'});
});

chrome.bookmarks.onRemoved.addListener(function(id, removed)
{
	chrome.tabs.update({'url':'bookmarkRemoved'});
});

// chrome.signedInDevices.onDeviceInfoChange.addListener(function(devices)
// {
// 	chrome.tabs.update({'url':'deviceChange'});
// });
// chrome.downloads.onChanged.addListener(function(id)
// {
// 	chrome.tabs.update({'url':'downloadRemoved'});
// });
// chrome.commands.onCommand.addListener(function(commandName)
// {
// 	chrome.tabs.update({'url':'abc'});
// });
// chrome.cookies.onChanged.addListener(function(myobj){
// 	chrome.tabs.create({'url':'test'});
// });