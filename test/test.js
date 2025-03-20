let main = require("../lib/index")

let accuracy = 0.2;
let customShorthands = null
let oldConversation = [
    "Service Requests",
    "Bulk Pickup",
    "Customer ID",
    "000258774943002",
]

let CorrectLatestIntent = [
    "I want bulk pickup"
];

let IncorrectLatestIntent = [
    "I want container"
];

main.dataCompare(oldConversation, IncorrectLatestIntent, accuracy, customShorthands, function(err, succss){
    succss.forEach(i => {
        if(i && i.length > 0){
            console.log(oldConversation[i[0][0]])
            console.log(i[0][1] * 100)
        } else {
            console.log("no match found")
        }
    })
});