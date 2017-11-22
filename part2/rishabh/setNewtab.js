chrome.storage.local.get(function(items){
    newtab = items.newtab;
    if(newtab){
        if(newtab == 'Beginner'){
            chrome.tabs.update({'url':'beginner.html'});
        }
        else if(newtab == 'Intermediate'){
            chrome.tabs.update({'url':'itermediate.html'});
        }
        else if(newtab == 'Expert'){
            chrome.tabs.update({'url':'expert.html'});
        }
    }
});