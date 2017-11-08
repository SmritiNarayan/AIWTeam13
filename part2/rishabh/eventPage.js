chrome.bookmarks.onCreated.addListener(function(id, bookmark)
{
	if(bookmark.url)
		chrome.tabs.update({'url':'bookmarkCreated'});
	else
		chrome.tabs.update({'url':'folderCreated'});
});

chrome.bookmarks.onRemoved.addListener(function(id, removed)
{
	chrome.tabs.update({'url':'bookmarkRemoved'});
});