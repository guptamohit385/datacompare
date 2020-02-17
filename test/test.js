let main = require("../lib/index")

let listOfSen1 = [
    "2 dell laptops i3 processor 2.5 GH 8gb Ram 256gb storage",
    "4 laptops 2.5 GH 8 gb Ram i3 dual core 256 gb storage HP",
    "3 laptops 2.5 GH 8 GB ram i3 dual core  256 GB storage del",
    "4 samsung monitors",
    "2 redmi pro 8"
]
let sampleTest1 = [
    "redmi pro 1",
    "1 laptops 2.5 GH i3 dual core Ram 256 GB storage del",
];

let listOfSen2 = [
    "the world is always in danger",
    "some string 2"
]
let sampleTest2 = ["1 some string", "there is dannger in the world always"];

let accuracy = 0.35;

main.dataCompare(listOfSen2, sampleTest2, accuracy, function(err, succss){
    //console.log(err, succss)
    succss.forEach(i => {
        console.log(i)
    })
});