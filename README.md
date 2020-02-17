# Data Compare
data compare, logical string compare, sentence meaning, meaning compare

## Understanding

with help of NLP and Tensorflow JS this package compare two array of sentences and sort them on the bases of meaning. 

## Example

1) listOfSen - is the array of list of sentence in set A
2) sampleTest - is the array of list of sentence in set B
3) accuracy - range from 0.10 - 0.50 (default : 0.25)

## Sample Inputs

```
let listOfSen = [
    "the world is always in danger",
    "some string 2"
]
let sampleTest = ["1 some string", "there is dannger in the world always"];
let accuracy = 0.25;
```

## Sample Execution

```
main.dataCompare(listOfSen, sampleTest, accuracy, (err, succss) => {
    //console.log(err, succss)
    succss.forEach(i => {
        console.log(i)
    })
});
```

## Sample Output

```
[ [ 1, 0.8665631413459778, 'some string 2', '1 some string' ] ]
[ [ 0,
    0.9503713250160217,
    'the world is always in danger',
    'there is dannger in the world always' ] ]
```