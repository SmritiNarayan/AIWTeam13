var config,words,wordFreq,cloud,traceCanvas,traceCanvasCtx,startPoint,wordsDown,colorsPalette,wordContainer;

function runWordCloud(wordsToMap, wF)
{
  //Set up
  config = {
      trace: true,
      spiralResolution:1, //Lower = better resolution
      spiralLimit: 360 * 5,
      lineHeight: 0.8,
      xWordPadding: 0,
      yWordPadding: 3,
      font: "sans-serif"
  }

  wordFreq = wF;

  words = wordsToMap.map(function(word) {
      return {
          word: word,
          freq: wordFreq[word] * 20
      }
  })

  words.sort(function(a, b) {
      return -1 * (a.freq - b.freq);
  });

  cloud = document.getElementById("word-cloud");
  cloud.style.position = "relative";
  cloud.style.fontFamily = config.font;

  traceCanvas = document.createElement("canvas");
  traceCanvas.width = cloud.offsetWidth;
  traceCanvas.height = cloud.offsetHeight;
  traceCanvasCtx = traceCanvas.getContext("2d");
  cloud.appendChild(traceCanvas);

  startPoint = {
      x: cloud.offsetWidth / 2,
      y: cloud.offsetHeight / 2
  };

  wordsDown = [];
  colorsPalette = ['#339966','#333399','#3333cc','#5200cc'];
  //End of setup

  placeWords();
  traceSpiral();

}


//Functions
function createWordObject(word, freq) {
    wordContainer = document.createElement("div");
    wordContainer.style.position = "absolute";
    wordContainer.style.fontSize = freq + "px";
    wordContainer.style.fontFamily = "Palatino,Times";
    wordContainer.style.lineHeight = config.lineHeight;
    wordContainer.style.color = colorsPalette[Math.floor(Math.random()*colorsPalette.length)];
    wordContainer.onclick = function(){window.open('https://www.'+word);}
/*    wordContainer.style.transform = "translateX(-50%) translateY(-50%)";*/
    wordContainer.appendChild(document.createTextNode(word));

    return wordContainer;
}

function placeWord(word, x, y) {

    cloud.appendChild(word);
    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";

    wordsDown.push(word.getBoundingClientRect());
}

function trace(x, y) {
//     traceCanvasCtx.lineTo(x, y);
//     traceCanvasCtx.stroke();
    traceCanvasCtx.fillRect(x, y, 1, 1);
}

function spiral(i, callback) {
    angle = config.spiralResolution * i;
    x = (1 + angle) * Math.cos(angle);
    y = (1 + angle) * Math.sin(angle);
    return callback ? callback() : null;
}

function intersect(word, x, y) {
    cloud.appendChild(word);    
    
    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";
    
    var currentWord = word.getBoundingClientRect();
    
    cloud.removeChild(word);
    
    for(var i = 0; i < wordsDown.length; i+=1){
        var comparisonWord = wordsDown[i];
        
        if(!(currentWord.right + config.xWordPadding < comparisonWord.left - config.xWordPadding ||
             currentWord.left - config.xWordPadding > comparisonWord.right + config.wXordPadding ||
             currentWord.bottom + config.yWordPadding < comparisonWord.top - config.yWordPadding ||
             currentWord.top - config.yWordPadding > comparisonWord.bottom + config.yWordPadding)){
            
            return true;
        }
    }
    
    return false;
}

//Main function
function placeWords() {
    for (var i = 0; i < words.length; i += 1) {

        var word = createWordObject(words[i].word, words[i].freq);
        //word.onclick = function(){console.log(i);}
        //word.getBoundingClientRect().onclick=function(){alert('Hi '+i);}

        for (var j = 0; j < config.spiralLimit; j++) {
            //If the spiral function returns true, we've placed the word down and can break from the j loop
            if (spiral(j, function() {
                    if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
                        placeWord(word, startPoint.x + x, startPoint.y + y);
                        return true;
                    }
                })) {
                break;
            }
        }
    }
}

function traceSpiral() {
    traceCanvasCtx.beginPath();
    
    if (config.trace) {
        var frame = 1;

        function animate() {
            spiral(frame, function() {
                trace(startPoint.x + x, startPoint.y + y);
            });

            frame += 1;

            if (frame < config.spiralLimit) {
                window.requestAnimationFrame(animate);
            }
        }

        animate();
    }
}






function process()
{
  if (xhr.readyState==4 && xhr.status==200)
  {
    var data = xhr.responseText;
    processData(data);
  }
}

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
  //console.log(condensedLinesTime['google.com']);

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
      //console.log(weightedVal+' in weighted');
    }
    else
      tarr = [];
    tarr.push(key);
    weighted[weightedVal] = tarr;
    weights.push(weightedVal);
    //console.log(weights);
  }
  //console.log('weighted');
  //console.log(weighted);

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
  //console.log(suggestions);

  //FINDING SUGGESTIONS/RECOMMENDATIONS using similarity metrics
  //Store in suggestURLs (global)
  suggestURLs = {};
  suggestFreqs = {};
  allWordMapUrls = [];
  for (var i=0; i<suggestions.length; i++)
  {
    if (sites.indexOf(suggestions[i]) != -1)
      suggestURLs[suggestions[i]] = top10[sites.indexOf(suggestions[i])];
  }
  //console.log(suggestURLs);

  var numUrls = 0;
  for (var key in suggestURLs)
  {
    numUrls += 1; //These 3 lines are so that suggestions are made for only top 5 visited URLs
    if (numUrls == 5)
      break;
    tarr1 = []
    //tarr2 = []
    if (allWordMapUrls.indexOf(suggestURLs[key][0]) == -1)
      allWordMapUrls.push(suggestURLs[key][0]);
    if (allWordMapUrls.indexOf(suggestURLs[key][1]) == -1)
      allWordMapUrls.push(suggestURLs[key][1]);

    if (suggestURLs[key][0] in suggestFreqs)
      suggestFreqs[suggestURLs[key][0]] += 3;
    else suggestFreqs[suggestURLs[key][0]] = 3;
    if (suggestURLs[key][1] in suggestFreqs)
      suggestFreqs[suggestURLs[key][1]] += 2;
    else suggestFreqs[suggestURLs[key][1]] = 2;
    //if (suggestURLs[key][2] in suggestFreqs)
    //  suggestFreqs[suggestURLs[key][2]] += 2;
    //else suggestFreqs[suggestURLs[key][0]] = 2;
    for (var i=2; i<suggestURLs[key].length; i++)
    {
      if (allWordMapUrls.indexOf(suggestURLs[key][i]) == -1)
        allWordMapUrls.push(suggestURLs[key][i]);
      if (suggestURLs[key][i] in suggestFreqs)
        suggestFreqs[suggestURLs[key][i]] += 1;
      else suggestFreqs[suggestURLs[key][i]] = 1;
    }
  }
  runWordCloud(allWordMapUrls, suggestFreqs);
}

$(document).ready(function() {
    /*$.ajax({
        type: "GET",
        url: "history.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });*/
     xhr = new XMLHttpRequest();
     xhr.open("get","history.csv",true);
     xhr.onreadystatechange = process;
     xhr.send();
});