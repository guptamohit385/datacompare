# Data Compare
data compare, logical string compare, sentence meaning, meaning compare

## Understanding

with help of NLP and Tensorflow JS this package compare two array of sentences and sort them on the bases of meaning. 

## Example
#|--------------------------------------------------------------------------------------------------|
#| VariableName      |  Details                                         |  Validation               |
#|--------------------------------------------------------------------------------------------------|
#| sentenceListA     | is the array of list of sentence in set A        | (required)                |
#| sentenceListB     | is the array of list of sentence in set B        | (required)                |
#| accuracy          | range from 0.10 - 0.50 (default : 0.25)          | (optional can pass null)  |
#| customShorthands  | shorthand expentions (example: don't => do not)  | (optional can pass null)  |
#|--------------------------------------------------------------------------------------------------|

## require package

```
let main = require("datacompare")
```

## Sample Inputs

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

## How to Execute

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

## Sample Output

```

[ [ 1, 0.8665631413459778, 'some string 2', '1 some string' ] ]
[ [ 0,
    0.9503713250160217, // (round it or multiply with 100 to find in percent)
    'the world is always in danger',
    'there is dannger in the world always' ] ]
    
```

## Output Explained
```

[ 
  0,                                        // index of sentenceListA which matches with sentenceListB 
  0.9503713250160217,                       // accuracy with which it matches
  'the world is always in danger',          // sentence for which it compared (from sentenceListB)
  'there is dannger in the world always'    // sentence with which it compared (from sentenceListA)
]

```