let tf = require('@tensorflow/tfjs');
let { titleCreateUsingPOS , createUniqueTitle } = require("../broker/grammer")
const { getTraining } = require("./modelGenerate")
const { generateDataFromBow } = require("../util/utility")
var { newShortHand } = require('../broker/shorthand');
const { trainConfig, shorthands } = require("../config/static")
const { getStemmed } = require("../broker/nlp")
var words = [];
var document = [];
var classes = [];
var training = [];
let indexedTitle;
let newSH;

function shorthandAddition(data){
    return newSH.expand(data)
}

function generateWords(l){
    l.forEach((i, ind)=>{
        let getStemmedWords = getStemmed(shorthandAddition(i));
        words.push(...getStemmedWords)
        indexedTitle = createUniqueTitle(titleCreateUsingPOS([...new Set(getStemmedWords)].sort()));
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

function getprdiction(arr, list, accu, comparision){
    let results = []
    arr.forEach((i,r)=>{
        if(i > accu){
            results.push([r, i, list[r], comparision])
        }
    })

    return results;
}

module.exports = function (listOfSen, sampleTest, accu, customShorthands, callback) {

    newSH = newShortHand(customShorthands)

    if(!Array.isArray(listOfSen)){
        throw new Error("first param requires a Array")
    }

    if(listOfSen.length < 2){
        throw new Error("first param requires a Array with minimum lenght +2")
    }

    if(!Array.isArray(sampleTest)){
        throw new Error("first param requires a Array")
    }

    generateTrainingData(generateWords(listOfSen))

    const {xs, ys, model} = getTraining(training);

    model.fit(xs, ys, trainConfig).then(() => {
        let finalRespArr = []
        sampleTest.forEach(dta=>{
            let testData = generateDataFromBow([... new Set(getStemmed(shorthandAddition(dta)))].sort(), words)
            prediction = model.predict(tf.tensor2d(testData, [1, words.length]));
            const values = prediction.dataSync();
            const arr = Array.from(values);
            finalRespArr.push(getprdiction(arr, listOfSen, ((accu)? accu: 0.35), dta))
        })
        return callback(null, finalRespArr)
    }).catch(err=>{
        console.log(err)
        return callback(new Error("failed to train model, internal issue"))
    });
}