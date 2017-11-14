function processData(data)
{
  //console.log(data);
  var linesL = data.split('\n');
  var headers = linesL[0].split(',');
  var lines = [];

  for (var i=1; i<linesL.length; i++) 
  {
      //console.log(linesL[i]+'\n\n');
      var data = linesL[i].split(',');
      //console.log(data);
      if (data.length == headers.length) {

          var tarr = [];
          tarr[headers[0]] = data[0];
          var url = data[1];
          if (url.indexOf('https://')==0)
            url = url.slice(8,url.length);
          else if (url.indexOf('http://')==0)
            url = url.slice(7,url.length);
          if (url.indexOf('/')>0)
            url = url.slice(0,url.indexOf('/'));
          else if (url.indexOf('?')>0)
            url = url.slice(0,url.indexOf('?'));
          if (url.indexOf('www')==0)
            url = url.slice(4,url.length);
          tarr[headers[1]] = url;
          for (var j=2; j<headers.length; j++) {
              tarr[headers[j]] = data[j];
          }
          lines.push(tarr);
      }
  }

  condensedLines = [];
  for (var i=0; i<lines.length; i++)
  {
    if (lines[i]['URL'] in condensedLines)
    {  
      condensedLines[lines[i]['URL']]['Visits'] += parseInt(lines[i]['Visits']);
      if (lines[i]['Time'] < condensedLines[lines[i]['URL']]['Time'])
        condensedLines[lines[i]['URL']]['Time'];
    }
    else
    {
      condensedLines[lines[i]['URL']] = []
      condensedLines[lines[i]['URL']]['Visits'] = parseInt(lines[i]['Visits']);
      condensedLines[lines[i]['URL']] = lines[i]['Time'];
    }
  }

  weighted = [];
  weights = [];

  //MODIFY WEIGHTS
  weightVisits = 0.8;
  weightTimeSpent = 0;
  weightRecency = 0.000002;

  for (var key in condensedLines)
  {
    weightedVal = weightVisits*condensedLines[key]['Visits'] + weightRecency*condensedLines[key]['Time'];
    var tarr;
    if (weightedVal in weighted)
    {
      tarr = weighted[weightedVal];
    }
    else
      tarr = [];
    tarr.push(key);
    weighted[weightedVal] = tarr;
    weights.push(weightedVal);
  }

  for (var i=0; i<weights.length; i++)
  {
    var smIndex = i;
    var item = weights[i];
    for (var j=i+1; j<weights.length; j++)
    {
      if (item < weights[j])
      {
        smIndex = j;
        item = weights[j];
      }
    }
    if (smIndex != i)
    {
      weights[smIndex] = weights[i];
      weights[i] = item;
    }
  }

  //Remove duplicates
  w = [];
  for (var i=0; i<weights.length; i++)
  {
    //if (weights[i] in w)
    if (w.indexOf(weights[i]) == -1)
      w.push(weights[i]);
  }
  weights = w;

  //SUGGESTIONS REQUIRED FOR URLs in suggested array
  suggestions = [];
  for (var i=0; i<weights.length; i++)
  {
    urls = weighted[weights[i]];
    for (var j=0; j<urls.length; j++)
    {
      suggestions.push(urls[j]);
    }
  }

  //FINDING SUGGESTIONS/RECOMMENDATIONS using similarity metrics
  recommendations = []
  for (var i=0; i<suggestions.length; i++)
  {
    if (sites.indexOf(suggestions[i]) != -1)
      recommendations[suggestions[i]] = top10[sites.indexOf(suggestions[i])];
  }
  console.log(recommendations);
}

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);

window.str = new String("ID,URL,Visits,Transition,Time\n");
window.str2 = new String("ID,URL,Visits,Time\n");

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

fetchHistory().then(function(historyItem){
  return Promise.all(historyItem.map(getVisits));
}).then(function(results){
  // var an = document.getElementById("checkPage");
  // an.innerHTML = results;
  results.forEach(function(result){
    window.str+=result.historyItem.id+","+result.historyItem.url+","+result.historyItem.visitCount;
    window.str2+=result.historyItem.id+","+result.historyItem.url+","+result.historyItem.visitCount;
    var lstTime = 6000000000;
    result.visitItem.forEach(function(visit){
      tempTime=(new Date()).getTime() - visit.visitTime;
      if (tempTime < lstTime)
        lstTime = tempTime;
      //console.log(visit+'; '+tempTime);
      window.str+=","+visit.transition+","+(new Date(visit.visitTime)).toString();
    });
    window.str2+=","+lstTime.toString()+"\n";
    window.str+="\n";
  });
  processData(window.str2);
  var file = new Blob([window.str], {type: 'text/plain'});
  var a = document.createElement("a");
  url = URL.createObjectURL(file);
  a.href = url;
  a.download = 'history.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);  
  }, 0);
});

// function call(results){
//   var an = document.getElementById("checkPage");
//   an.innerHTML = "Hello";
//   // for (var i = 0; i < results.length; i++) {
//   //   window.str+=results[i].id+","+results[i].url+","+results[i].visitCount;
//   //   function callback(visits){
//   //     for (var i = 0; i < visits.length; i++){
//   //       window.str += ","+visits[i].transition;
//   //     }
//   //   }
//   //   chrome.history.getVisits({url: results[i].url}, callback);
//   //   window.str+="\n";
//   // }
//   return Promise.all(results.map(getVisits));
//   var file = new Blob([window.str], {type: 'text/plain'});
//   var a = document.createElement("a");
//   url = URL.createObjectURL(file);
//   a.href = url;
//   a.download = 'newFile.txt';
//   document.body.appendChild(a);
//   a.click();
//   setTimeout(function() {
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);  
//   }, 0);
// }

// chrome.history.search({text:''}, call);