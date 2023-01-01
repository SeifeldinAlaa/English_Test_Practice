const express = require('express');
const app = express();
const fs = require('fs');





var data, verbs, nouns, adjectives, adverbs;

var result = []

// get random elements from the word list
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
// reading the data from the data.json file 
fs.readFile('./data.json', (err, jsonData) => {
    if (err) {
        console.log(err);
        return;
    }
    data = JSON.parse(jsonData)
    // making list for different types of words for example verbs
    // to make sure we have at least 1 from every word type and then 6 elements randomly
    verbs = data.wordList.filter(elem => elem.pos == 'verb')
    nouns = data.wordList.filter(elem => elem.pos == 'noun')
    adjectives = data.wordList.filter(elem => elem.pos == 'adjective')
    adverbs = data.wordList.filter(elem => elem.pos == 'adverb')
    result.push(verbs[Math.floor(Math.random() * verbs.length)])
    result.push(nouns[Math.floor(Math.random() * nouns.length)])
    result.push(adjectives[Math.floor(Math.random() * adjectives.length)])
    result.push(adverbs[Math.floor(Math.random() * adverbs.length)])
    randoms = getRandom(data.wordList, 6)
    result = result.concat(randoms)
    console.log(result)
})

app.listen(5000, () => { console.log("Server started on port 5000") })

// endpoint for returning 10 words containing at least 1 from every word type
app.get("/api/wordlist", (req, res) => { res.json(result) });



