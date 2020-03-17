let main = require("../lib/index")

let listOfSen1 = [
    "2 dell laptops i3 processor 2.5 GH 8gb Ram 256gb storage",
    "4 laptops 2.5 GH 8 gb Ram i3 dual core 256 gb storage del",
    "3 laptops 2.4 GH 8 GB ram i3 dual core  256 GB storage del",
    "4 samsung monitors",
    "2 redmi pro 8"
]
let sampleTest1 = [
    "redmi pro 1",
    "1 laptops 2.4 GH i3 dual core Ram 256 GB storage del",
];

// let listOfSen2 = [
//     "2 dell laptops i3 processor 2.5 GH 8gb Ram 256gb storage",
//     "the world is always in danger",
//     "some string 2",
//     "4 samsung monitors",
//     "only milk is white",
//     "a cup holds a large quantity of liquid",
//     "we need a lot of water to wake up in the morning",
//     "I got married yesterday and life is awesome since then",
//     "pavan hates to drink"
// ]
// let sampleTest2 = [
//     "1 some string", 
//     "there is no safe place in the world anytime",
//     "no other object is white",
//     "no other object has same color as milk",
//     "my life is good today after i got wife",
//     "pavan loves to eat food",
//     "4 samsung monitors",
// ];

main.dataCompare(listOfSen1, sampleTest1, accuracy, customShorthands, function(err, succss){
    //console.log(err, succss)
    succss.forEach(i => {
        console.log(i)
    })
});