historyOrdered = [];
suggestURLs = {};
suggestFreqs = {};
urlListTemp = [];
wordsToMap = [];
wordFreq = [];
divId = "word-cloud1";

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
      if (data.length == headers.length)
      {
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

  condensedLinesVisits = [];
  condensedLinesTime = [];
  for (var i=0; i<lines.length; i++)
  {
    if (lines[i]['URL'] in condensedLinesVisits)
    {  
      condensedLinesVisits[lines[i]['URL']]['Visits'] += parseInt(lines[i]['Visits']);
      if (lines[i]['Time'] < condensedLinesTime[lines[i]['URL']]['Time'])
        condensedLinesTime[lines[i]['URL']] = lines[i]['Time'];
    }
    else
    {
      condensedLinesVisits[lines[i]['URL']] = [];
      condensedLinesTime[lines[i]['URL']] = 0;
      condensedLinesVisits[lines[i]['URL']]['Visits'] = parseInt(lines[i]['Visits']);
      condensedLinesTime[lines[i]['URL']] = lines[i]['Time'];
    }
  }
  console.log(condensedLinesTime['google.com']);

  weighted = [];
  weights = [];

  //MODIFY WEIGHTS
  weightVisits = 0.8;
  weightTimeSpent = 0;
  weightRecency = 0.000002;

  for (var key in condensedLinesVisits)
  {
    weightedVal = weightVisits*condensedLinesVisits[key]['Visits'] + weightRecency*condensedLinesTime[key];
    var tarr;
    if (weightedVal in weighted)
    {
      tarr = weighted[weightedVal];
      console.log(weightedVal+' in weighted');
    }
    else
      tarr = [];
    tarr.push(key);
    weighted[weightedVal] = tarr;
    weights.push(weightedVal);
    //console.log(weights);
  }
  console.log('weighted');
  console.log(weighted);

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
  console.log(suggestions);

  //FINDING SUGGESTIONS/RECOMMENDATIONS using similarity metrics
  //Store in suggestURLs (global)
  for (var i=0; i<suggestions.length; i++)
  {
    if (sites.indexOf(suggestions[i]) != -1)
      suggestURLs[suggestions[i]] = top10[sites.indexOf(suggestions[i])];
  }
  console.log(suggestURLs);

  for (var key in suggestURLs)
  {
    tarr1 = []
    //tarr2 = []
    tarr1[suggestURLs[key][0]] = 4;
    tarr1[suggestURLs[key][1]] = 3;
    tarr1[suggestURLs[key][2]] = 2;
    for (var i=3; i<suggestURLs[key].length; i++)
    {
      tarr1[suggestURLs[key][i]] = 1;
    }
    suggestFreqs[key] = tarr1;
  }
  console.log(suggestFreqs);
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

chrome.tabs.update({"url":"trials3.html"});