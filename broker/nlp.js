let natural = require("natural");

let func = {};

func.getStemmed = function(sen){
    let cleanCode = [];
    let sentence = func.wordTokenized(sen);
    sentence.forEach(element => {
        cleanCode.push(func.LancasterStemmer(element))
    });
    return cleanCode
}

func.LancasterStemmer = function(element){
    return natural.LancasterStemmer.stem(element)
}

func.PorterStemmer = function(element){
    return natural.PorterStemmer.stem(element)
}

func.PorterStemmerV2 = function(element){

    natural.PorterStemmer.attach();
    return element.tokenizeAndStem()
}

func.wordTokenized = function(sentence){
    let wordTokenizer = new natural.WordTokenizer();
    return wordTokenizer.tokenize(sentence); 
}

func.sentenceTokenized = function(sentences){
    let sentenceTokenizer = new natural.SentenceTokenizer();
    return sentenceTokenizer.tokenize(sentences); 
}

module.exports = func;