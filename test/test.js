let main = require("../lib/index")

let listOfSen = [
    "2 dell laptops i3 processor 2.5 GH 8gb Ram 256gb storage",
    "4 laptops 2.5 GH 8 gb i3 dual core Ram 256 gb storage HP",
    "3 laptops 2.5 GH 8 GB i3 dual core Ram 256 GB storage del",
    "4 samsung monitors",
    "2 redmi pro 8"
]
let sampleTest = "redmi pro 1";

main.dataCompare(listOfSen, sampleTest, function(err, succss){
    //console.log(err, succss)
    succss.forEach(i => {
        console.log(i)
    })
});