let tf = require('@tensorflow/tfjs');
const { shuffle } = require("../util/utility")
let contractions = require("contractions")
const { getStemmed } = require("./nlp")
var pos = require('pos');
var words = [];
var document = [];
var classes = [];
var training = []

function titleCreateUsingPOS(l){
    return new pos.Tagger().tag(l);
}

function createUniqueTitle(data){
    let fianlTitle = ""
    data.forEach(tit =>{

        if(tit[1]=="CD"){
            fianlTitle += ((fianlTitle)? "-" : "") + tit[0]
        }

        if(tit[1]!="CD" && tit[1]!="NN"){
            fianlTitle += ((fianlTitle)? "_" : "")  + tit[0]
        }

    })
    return fianlTitle
}

function generateWords(l){
    l.forEach((i, ind)=>{
        let getStemmedWords = getStemmed(i);
        words.push(...getStemmedWords)
        let indexedTitle = createUniqueTitle(titleCreateUsingPOS([...new Set(getStemmedWords)].sort()));
        document.push([getStemmedWords, ind])
        classes.push(ind)
        indexedTitle = ind;
    })
    words =  [...new Set(words)].sort()
    return words
}

function generateTrainingData(data){
    document.forEach(doc=>{
        let output_empty = new Array(classes.length).fill(0.0);
        let pattern_words = doc[0]
        output_empty[(classes.indexOf(doc[1]))] = 1
        training.push([generateDataFromBow(pattern_words, data), output_empty])
    })
}

function generateDataFromBow(sentence, words){
    let bag = new Array(words.length).fill(0.0);
    sentence.forEach(s => {
        words.forEach((w, i)=>{
            if (w == s) {
                bag[i] = 1.0
            }
        })
    })
    return bag;
}

function getprdiction(arr, list){
    let results = []
    arr.forEach((i,r)=>{
        if(i > 0.35){
            results.push([r, i, document[classes[r]][0], document[classes[r]][1], list[r]])
        }
    })

    return results;
}

module.exports.dataCompare =  function (listOfSen, sampleTest, callback) {

    generateTrainingData(generateWords(listOfSen))

    let testData = generateDataFromBow([... new Set(getStemmed(sampleTest))].sort(), words)

    training = shuffle(training);

    let train_x = training.map(i => {return i[0]})
    let train_y = training.map(j=> {return j[1]})

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 128, inputShape: [train_x[0].length,], activation: 'relu'}));
    model.add(tf.layers.dropout({units: 1.5}));
    model.add(tf.layers.dense({units: 64}));
    model.add(tf.layers.dropout({units: 1.5}));
    model.add(tf.layers.dense({units: train_y[0].length, activation: 'softmax'}));

    model.compile({loss: 'categoricalCrossentropy', optimizer: 'sgd', metrics: ['accuracy']});

    const xs = tf.tensor2d(train_x, [training.length, train_x[0].length]);
    const ys = tf.tensor2d(train_y, [training.length, train_y[0].length]);

    model.fit(xs, ys, {
        batchSize: 5,
        epochs: 200,
        verbose: 1,
        decay:1e-6,
        momentum:0.9,
        lr:0.01,
        nesterov:1
    }).then(() => {
    prediction = model.predict(tf.tensor2d(testData, [1, words.length]));
    const values = prediction.dataSync();
    const arr = Array.from(values);
    return callback(null, getprdiction(arr, listOfSen))
    }).catch(err=>{
        return callback(new Error("failed to train model, internal issue"))
    });
}