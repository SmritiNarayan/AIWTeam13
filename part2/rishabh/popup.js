// document.addEventListener('DOMContentLoaded', function() 
// {
//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() 
//   {
//     chrome.tabs.getSelected(null, function(tab) 
//     {
//       d = document;
//       var f = d.createElement('form');
//       f.action = 'http://gtmetrix.com/analyze.html?bm';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);

window.str = new String("ID,URL,Visits,Transition,Time\n");

function getVisits(historyItem){
  return new Promise(function(resolve, reject){
    chrome.history.getVisits({url: historyItem.url}, function(visitItem){
      resolve({
        historyItem: historyItem,
        visitItem: visitItem
      });
    });
  });
}

function fetchHistory(){
  return new Promise(function(resolve,reject){
    chrome.history.search({text:''}, function(historyItem){
      resolve(historyItem);
    });
  });
}

function downloadHistory()
{
  console.log("abababa");
  fetchHistory().then(function(historyItem)
  {
    return Promise.all(historyItem.map(getVisits));
  }
  ).then(function(results)
  {
    results.forEach(function(result){
      window.str+=result.historyItem.id+","+result.historyItem.url+","+result.historyItem.visitCount;
      result.visitItem.forEach(function(visit)
      {
        window.str+=","+visit.transition+","+(new Date(visit.visitTime)).toString();
      }
      );
      window.str+="\n";
    }
    );
    var file = new Blob([window.str], {type: 'text/plain'});

    console.log("abababa22");
    var a = document.createElement("a");
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'history.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() 
    {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);  
    }, 0);
  }
  );
}
function onAnchorClick(event) {
  chrome.tabs.create({ url: event.srcElement.href });
  return false;
}

// Given an array of URLs, build a DOM list of these URLs in the
// browser action popup.
function buildPopupDom(mostVisitedURLs) {
  var popupDiv = document.getElementById('mostVisited_div');
  var ol = popupDiv.appendChild(document.createElement('ol'));

  for (var i = 0; i < mostVisitedURLs.length; i++) {
    var li = ol.appendChild(document.createElement('li'));
    var a = li.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
    a.addEventListener('click', onAnchorClick);
  }
}

chrome.topSites.get(buildPopupDom);
chrome.tabs.create({'url':'zeroeth.html'});
// function bookmarkCreation(){
//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.innerHTML = "SET";
//   chrome.bookmarks.onCreated.addListener(function(id, bookmark)
//   {
//     chrome.bookmarks.update(bookmark.id, {'title': 'Created Successfully', 'url':'https://googlee.com'});
//   });
//   chrome.bookmarks.create({'title':'NewB', 'url':'https://google.com'});
// }

 //downloadHistory();
// bookmarkCreation();
// function cookieinfo(){
//     chrome.cookies.getAll({},function (cookie){
//         console.log(cookie.length);
//         for(i=0;i<cookie.length;i++){
//             console.log(JSON.stringify(cookie[i]));
//         }
//     });
//     cookieinfo();
//window.onload=cookieinfo;