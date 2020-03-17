let stopWords = require('../util/stopwords');
let npl = require("../broker/nlp")
var { newShortHand } = require('../broker/shorthand');
let newSH;

function shorthandAddition(data){
    return newSH.expand(data)
}
// Create the word frequency table
function _create_frequency_table(text_string){
    let words = npl.PorterStemmerV2(text_string)
    let freqTable = {};
     words.forEach(word => {
         if (stopWords.indexOf(word)){
             if (word in freqTable)
                 freqTable[word] += 1
             else
                 freqTable[word] = 1
         }
     });
     return freqTable
}

function _score_sentences(sentences, freqTable){
    let sentenceValue = {};
    sentences.forEach(sentence => {
        let word_count_in_sentence = npl.wordTokenized(sentence).length
        Object.keys(freqTable).forEach(wordValue => {
            if (sentence.toLowerCase().indexOf(wordValue)){
                if (sentenceValue[sentence.slice(0, 10)])
                    sentenceValue[sentence.slice(0, 10)] += freqTable[wordValue]
                else
                    sentenceValue[sentence.slice(0, 10)] = freqTable[wordValue]
            }
        })
        sentenceValue[sentence.slice(0, 10)] = Math.round(sentenceValue[sentence.slice(0, 10)] / word_count_in_sentence)
    });
    
    return sentenceValue
}

function _find_average_score(sentenceValue){
    let sumValues = 0
    let sentVal = Object.keys(sentenceValue);
    sentVal.forEach(entry =>{
        sumValues += sentenceValue[entry]
    });

    return Math.round(sumValues / sentVal.length) // average
}

function _generate_summary(sentences, sentenceValue, threshold){
    let summary = ''
    sentences.forEach(sentence => {
        if (sentenceValue[sentence.slice(0, 10)] && sentenceValue[sentence.slice(0, 10)] > (threshold)){
            summary += " " + sentence
        }
    });
    return summary
}

module.exports = function(text, count, customShorthands){

    newSH = newShortHand(customShorthands)

    // Tokenize the sentences
    let sentences = npl.sentenceTokenized(shorthandAddition(text))

    // Important Algorithm: score the sentences
    let fequencyTab = _create_frequency_table(text);
 
    let sentence_scores = _score_sentences(sentences, fequencyTab)
    //  Find the threshold
    let threshold = _find_average_score(sentence_scores)

    // Important Algorithm: Generate the summary
    let summary = _generate_summary(sentences, sentence_scores, ((count || 1) * threshold).toFixed(2))

    return { 
        summary:summary, 
        muxThreshold: count, 
        frequencyCount: threshold,
        inputDataLength: text.split(" ").length,
        summaryLength: summary.split(" ").length,
        threshold: ((count || 1) * threshold).toFixed(2)
    }
}