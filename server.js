var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/wordlist', function(req, res) {
  console.log('I received a GET request');

  word1 = {
    word: 'chicken',
    valid: true,
    points: 4,
    score: 4
  };
  word2 = {
    word: 'steak',
    valid: false,
    points: 2,
    score: 2
  };
  word3 = {
    word: 'pork',
    valid: true,
    points: 1,
    score: 1
  };
  var wordlist = [word1, word2, word3];

  res.json(wordlist);

})

app.listen(8081);
console.log('Server running on port 8081');