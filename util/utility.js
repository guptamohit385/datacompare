module.exports.shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

module.exports.generateDataFromBow = (sentence, words) => {
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