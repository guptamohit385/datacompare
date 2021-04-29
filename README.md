# DataCompare Package Details (Powered by kvertex.com)

## Table of Contents

1) [DataCompare](#Data_Compare)
    1) [DataCompare_Understanding](#DataCompare_Understanding)
    2) [DataCompare_Example](#DataCompare_Example)
    3) [DataCompare_Require_Package](#DataCompare_Require_Package)
    4) [DataCompare_Sample_Inputs](#DataCompare_Sample_Inputs)
    5) [DataCompare_How_To_Execute](#DataCompare_How_To_Execute)
    6) [DataCompare_Sample_Output](#DataCompare_Sample_Output)
    7) [DataCompare_Output_Explained](#DataCompare_Output_Explained)
2) [Summarizer](#Summarizer)
    1) [Summarizer_Understanding](#Summarizer_Understanding)
    2) [Summarizer_Example](#Summarizer_Example)
    3) [Summarizer_Require_Package](#Summarizer_Require_Package)
    4) [Summarizer_Sample_Inputs](#Summarizer_Sample_Inputs)
    5) [Summarizer_How_To_Execute](#Summarizer_How_To_Execute)
    6) [Summarizer_Sample_Output](#Summarizer_Sample_Output)
    7) [Summarizer_Output_Explained](#Summarizer_Output_Explained)


# DataCompare_Data_Compare
data compare, logical string compare, sentence meaning, meaning compare

## DataCompare_Understanding

with help of NLP and Tensorflow JS this package compare two array of sentences and sort them on the bases of meaning. 

## DataCompare_Example

```
|--------------------------------------------------------------------------------------------------|
| VariableName      |  Details                                         |  Validation               |
|--------------------------------------------------------------------------------------------------|
| sentenceListA     | is the array of list of sentence in set A        | (required)                |
| sentenceListB     | is the array of list of sentence in set B        | (required)                |
| accuracy          | range from 0.10 - 0.50 (default : 0.25)          | (optional can pass null)  |
| customShorthands  | shorthand expentions (example: don't => do not)  | (optional can pass null)  |
|--------------------------------------------------------------------------------------------------|

```

## DataCompare_Require_Package

```
let main = require("datacompare")
```

## DataCompare_Sample_Inputs

```
// mininum length 2
let sentenceListA = ["the world is always in danger don't asap", "some string 2" ]

// mininum length 1 
let sentenceListB = ["1 some string", "there is dannger in the world always do not"];

// range from 0.10 - 0.50 (default : 0.25) or null 
let accuracy = 0.25

// example: don't => do not
let customShorthands = {www: "world wide web", myname: "I want my name here always"}
```

## DataCompare_How_To_Execute

```
/* 
 * passing all the params 
 */

let callBackFunction = (err, succss) => {
    console.log(err, succss)

    // based on requirement loop it
    succss.forEach(i => {
        console.log(i)
    })
}

main.dataCompare(sentenceListA, sentenceListB, accuracy, customShorthands, callBackFunction);

```

## DataCompare_Sample_Output

```

[ [ 1, 0.8665631413459778, 'some string 2', '1 some string' ] ]
[ [ 0,
    0.9503713250160217, // (round it or multiply with 100 to find in percent)
    'the world is always in danger',
    'there is dannger in the world always' ] ]

```

## DataCompare_Output_Explained
```

[ 
  0,                                        // index of sentenceListA which matches with sentenceListB 
  0.9503713250160217,                       // accuracy with which it matches
  'the world is always in danger',          // sentence for which it compared (from sentenceListB)
  'there is dannger in the world always'    // sentence with which it compared (from sentenceListA)
]

```

# Summarizer
summarization of sentence

## Summarizer_Understanding
summarization of sentence using NLP 

## Summarizer_Example

```
|--------------------------------------------------------------------------------------------------|
| VariableName      |  Details                                         |  Validation               |
|--------------------------------------------------------------------------------------------------|
| paragraph         | is the array of list of sentence in set A        | (required)                |
| threshold         | range from 0.10 - 3.00 (default : 0.25)          | (optional can pass null)  |
| customShorthands  | shorthand expentions (example: don't => do not)  | (optional can pass null)  |
|--------------------------------------------------------------------------------------------------|

```

## Summarizer_Require_Package

```
let main = require("datacompare")
```
## Summarizer_Sample_Inputs

```
// mininum length 2
let paragraph = `Stunned researchers in Antarctica have discovered fish and other aquatic animals living in perpetual darkness and cold, beneath a roof of ice 740 meters thick. The animals inhabit a wedge of seawater only 10 meters deep, sealed between the ice above and a barren, rocky seafloor below—a location so remote and hostile the many scientists expected to find nothing but scant microbial life.
A team of ice drillers and scientists made the discovery after lowering a small, custom-built robot down a narrow hole they bored through the Ross Ice Shelf, a slab of glacial ice the size of France that hangs off the coastline of Antarctica and floats on the ocean. The remote water they tapped sits beneath the back corner of the floating shelf, where the shelf meets what would be the shore of Antarctica if all that ice were removed. The spot sits 850 kilometers from the outer edge of the ice shelf, the nearest place where the ocean is in contact with sunlight that allows tiny plankton to grow and sustain a food chain.
I’m surprised, says Ross Powell, a 63-year old glacial geologist from Northern Illinois University who co-led the expedition with two other scientists. Powell spoke with me via satellite phone from the remote location on the West Antarctic Ice Sheet, where 40 scientists, ice drillers and technicians were dropped by ski-mounted planes. “I’ve worked in this area for my whole career,” he says—studying the underbellies where glaciers flow into oceans. “You get the picture of these areas having very little food, being desolate, not supporting much life.” The ecosystem has somehow managed to survive incredibly far from sunlight, the source of energy that drives most life on Earth. The discovery provides insight into what kind of complex but undiscovered life might inhabit the vast areas beneath Antarctica’s ice shelves—comprising more than a million square kilometers of unexplored seafloor.`


// range from 0.1 to 10.00 (default : 1.0) or null 
let threshold = 1.4;

// example: don't => do not
let customShorthands = {www: "world wide web", myname: "I want my name here always"}
```

## Summarizer_How_To_Execute

```
/* 
 * passing all the params 
 */

let sumAry = main.summarize(paragraph, threshold, customShorthands);

console.log(sumAry)
```

## Summarizer_Sample_Output

```
{
  summary: '“I’ve worked in this area for my whole career,” he says—studying the underbellies where glaciers flow into oceans. “You get the picture of these areas having very little food, being desolate, not what is upporting much life.”',
  muxThreshold: 1.4,
  frequencyCount: 7,
  inputDataLength: 312,
  summaryLength: 38,
  threshold: '9.80'
}

```

## Summarizer_Output_Explained
```
{
  summary: '“I’ve worked in this are...",   // this is the text summary
  muxThreshold: 1.4,                        // threshold customised by user 
  frequencyCount: 7,                        // avg frequency of words by logic
  inputDataLength: 312,                     // input Data Length
  summaryLength: 38,                        // summary Length
  threshold: '9.80'                         // final threshold
}
```

## Next Update

```
|--------------------------------------------------------------------------------------------------------------|
| Idea         |  Details                                 | Status |  Link                                     |
|--------------------------------------------------------------------------------------------------------------|
| DataCompare  |  Compare two stings based on NLP and ML  | DONE   | https://www.npmjs.com/package/datacompare |
|--------------------------------------------------------------------------------------------------------------|
| Summarizer   |  Data Summarizer based on NLP            | DONE   | https://www.npmjs.com/package/datacompare |
|--------------------------------------------------------------------------------------------------------------|
| Researcher   |  Data Researcher based on NLP and ML     | DONE   | https://www.npmjs.com/package/            |
|--------------------------------------------------------------------------------------------------------------|
```