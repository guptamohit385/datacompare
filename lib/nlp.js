let natural = require("natural");
let tokenizer = new natural.WordTokenizer();

module.exports.getStemmed = function(sen){
    let cleanCode = [];
    let sentence = tokenizer.tokenize(sen);
    sentence.forEach(element => {
        cleanCode.push(natural.LancasterStemmer.stem(element))
    });
    return cleanCode
}