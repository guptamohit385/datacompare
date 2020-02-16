# Data Compare
data compare, logical string compare, sentence meaning, meaning compare

## Example

1) listOfSen - is the array of list of sentence in set A
2) sampleTest - is the array of list of sentence in set B

## Sample Inputs:- 
```
let listOfSen = [
    "some string 1",
    "some string 2"
]
let sampleTest = "1 some string";
```

## Sample Execution:-
```
main.dataCompare(listOfSen, sampleTest, (err, succss) => {
    //console.log(err, succss)
    succss.forEach(i => {
        console.log(i)
    })
});
```

## Sample Output:- 

```
[ 4,
  0.5862706899642944,
  [ "some", "string", "2" ],
  4, 
  'some string 1' ]
```