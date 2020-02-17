var pos = require('pos');

module.exports.titleCreateUsingPOS = (l) => {
    return new pos.Tagger().tag(l);
}

module.exports.createUniqueTitle = (data) => {
    let fianlTitle = ""
    data.forEach(tit => {

        if(tit[1]=="CD"){
            fianlTitle += ((fianlTitle)? "-" : "") + tit[0]
        }

        if(tit[1]!="CD" && tit[1]!="NN"){
            fianlTitle += ((fianlTitle)? "_" : "")  + tit[0]
        }

    })
    return fianlTitle
}
