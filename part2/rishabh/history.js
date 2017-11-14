function fetchHistory(){
   var microsecondsBack = 1000 * 60 * 60 * 24 * 0.8;
    var starttime = (new Date).getTime() - microsecondsBack;
  return new Promise(function(resolve,reject){
    chrome.history.search({text:'', startTime: starttime }, function(historyItem){
      resolve(historyItem);
    });
  });
}
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
function downloadHistory2()
{
  fetchHistory().then(function(historyItem)
    {
      return Promise.all(historyItem.map(getVisits));
    }
  ).then(function(results)
    {
      console.log(results.length);
      if(results.length<result1)
       { console.log("deleted")
        chrome.tabs.update({'url':'ninth.html'});}
      else{

        console.log("not deleted")
        //put negative time in db
      }
    }
  );
  console.log("abababa22");
}
function downloadHistory()
{
 // console.log("abababa");
  p=document.getElementById("myButton");
  p.onclick=downloadHistory2;
  fetchHistory().then(function(historyItem)
    {
      return Promise.all(historyItem.map(getVisits));
    }
  ).then(function(results)
    {
      result1=results.length
      console.log("frst")
      console.log(results.length);
    }
  );
  console.log("abababa21");
}
result1=0;
downloadHistory();