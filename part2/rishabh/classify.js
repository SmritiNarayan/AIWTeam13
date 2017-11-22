document.addEventListener('DOMContentLoaded', init);
resultsJSON = []
test = {}

// Training set
function init(){
    // addToTrain = document.getElementById('train');
    // addToTrain.onclick = addData;

    list = document.createElement('ol');
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            str = xhr.responseText;
            items = str.split("\n");
            headers = items[0].split(",");
            help = headers[headers.length-1];
            headers[headers.length-1] = help.substring(0,help.length-1);
            for(var i=1; i<items.length-1; i++){
                var obj = {};
                var currItem = items[i].split(",");
                for(var j=0; j<currItem.length; j++){
                    if(j==0 || j==6 || j==7){
                        obj[headers[j]] = currItem[j];
                    }
                    else if(j==11){
                        obj[headers[j]] = currItem[j].substring(0,currItem[j].length-1);
                    }
                    else{
                        obj[headers[j]] = parseInt(currItem[j]);
                        if(obj[headers[j]]==-1){
                            obj[headers[j]] = 10e10;
                        }
                    }
                }
                resultsJSON.push(obj);
            }
            // createItem(resultsJSON);
            train(resultsJSON);
        }
    }
    xhr.open("GET", "merged.csv", true);
    xhr.send();
    document.body.appendChild(list);
}

function createItem(item){
    i = document.createElement('li');
    i.innerHTML = item;
    list.appendChild(i);
}

function train(data){
    // Configuration
    var config = {
        trainingSet: data, 
        categoryAttr: 'Classification', 
        ignoredAttributes: ['Name']
    };

    // var data = 
    //     [{person: 'Homer', hairLength: 0, weight: 250, age: 36, sex: 'male'},
    //      {person: 'Marge', hairLength: 10, weight: 150, age: 34, sex: 'female'},
    //      {person: 'Bart', hairLength: 2, weight: 90, age: 10, sex: 'male'},
    //      {person: 'Lisa', hairLength: 6, weight: 78, age: 8, sex: 'female'},
    //      {person: 'Maggie', hairLength: 4, weight: 20, age: 1, sex: 'female'},
    //      {person: 'Abe', hairLength: 1, weight: 170, age: 70, sex: 'male'},
    //      {person: 'Selma', hairLength: 8, weight: 160, age: 41, sex: 'female'},
    //      {person: 'Otto', hairLength: 10, weight: 180, age: 38, sex: 'male'},
    //      {person: 'Krusty', hairLength: 6, weight: 200, age: 45, sex: 'male'}];

    createItem(JSON.stringify(data));

    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);

    // Building Random Forest
    var numberOfTrees = 20;
    var randomForest = new dt.RandomForest(config, numberOfTrees);

    stored = localStorage.test.split(',');
    // createItem(stored);

    for(var i=0; i<headers.length; i++){
        test[headers[i]] = stored[i];
    }

    // Testing Decision Tree and Random Forest
    // var test = {Name:"Test",First:1000,Second:-1,Third:99436,Fourth:255399,Fifth:8741,Purpose:"Surfing",Usage:"An hour or two",Eighth:48716,Score:1,Help:2};
    
    createItem(JSON.stringify(test));

    var decisionTreePrediction = decisionTree.predict(test);
    var randomForestPrediction = randomForest.predict(test);

    c = document.getElementById('classify');
    c.innerHTML = decisionTreePrediction;

    // createItem(decisionTreePrediction);
    createItem(JSON.stringify(randomForestPrediction));
}

// function addData(){
//     createItem(resultsJSON);
//     resultsJSON.push(test);
//     createItem(resultsJSON);
//     window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
//     // window.storageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes){
//         window.requestFileSystem(window.TEMPORARY, 1024*1024, onInit, error);
//     // }, error);
// }

// function onInit(fs){
//     fs.root.getFile('merged.csv', {create: true}, function(fileEntry){
//         fileEntry.createWriter(function(fileWriter){
//             fileWriter.seek(fileWriter.length);
//             var blob = new Blob(resultsJSON, {type: 'text/plain'});
//             fileWriter.write(blob);
//         }, error);
//     }, error);
// }

// function error(e){
//     createItem(e);
// }