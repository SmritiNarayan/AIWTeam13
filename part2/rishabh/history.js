document.addEventListener('DOMContentLoaded', init);

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
      if(results.length<result1){
        console.log("deleted");        
        localStorage.endTime = (new Date()).getTime();
        localStorage.eighth = localStorage.endTime - localStorage.startTime;
        chrome.tabs.update({'url':'ninth.html'});}
      else{
        console.log("not deleted");
        notComplete();
        //put negative time in db
      }
    }
  );
  console.log("abababa22");
}

function downloadHistory(){  
  fetchHistory().then(function(historyItem){
    return Promise.all(historyItem.map(getVisits));
  }).then(function(results){
    result1=results.length
    console.log("frst")
    console.log(results.length);
  });
  console.log("abababa21");
}

function deleteTask(){
  b.innerHTML = "Submit";
  b.onclick = downloadHistory2;
  t.innerHTML = "Delete the history item 'www.example.com' from your browser history and click the button below";
  downloadHistory();
}

function linkClicked(){
  chrome.tabs.create({'url':'http://www.example.com'});
  p.style.display = 'none';
  b.onclick = deleteTask;
}

function notComplete(){
  p.style.display = 'block';
}

function storeInDb(){
  //store in Db that he skipped or a negative time
  localStorage.eighth = -1;
  chrome.tabs.update({'url':'ninth.html'});
}

function init(){
 // console.log("abababa");
  result1 = 0;
  localStorage.startTime = (new Date()).getTime();
  b=document.getElementById("myButton");
  a=document.getElementById("link");
  p=document.getElementById("p");
  t=document.getElementById("task");
  x=document.getElementById("skipButton");
  x.onclick=storeInDb;
  a.onclick = linkClicked;
  b.onclick = notComplete;
}