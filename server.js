var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('wordlist', ['wordlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/wordlist', function(req, res) {
  console.log('I received a GET request');

  db.wordlist.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });

  // word1 = {
  //   word: 'chicken',
  //   valid: true,
  //   points: 4,
  //   score: 4
  // };
  // word2 = {
  //   word: 'steak',
  //   valid: false,
  //   points: 2,
  //   score: 2
  // };
  // word3 = {
  //   word: 'pork',
  //   valid: true,
  //   points: 1,
  //   score: 1
  // };
  // var wordlist = [word1, word2, word3];

  // res.json(wordlist);

});

app.post('/wordlist', function(req, res) {
  console.log(req.body);
  db.wordlist.insert(req.body, function(err, doc) {
    console.log('doc----------', doc)
    res.json(doc);
  });
});

app.delete('/wordlist/:id', function(req, res) {
  var id = req.params.id;
  console.log('deletedeletedelete', id);
  console.log(id);
  db.wordlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/wordlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  db.wordlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('/wordlist/:id', function(req, res) {
  var id = req.params.id;
  console.log(req.body.word);
  db.wordlist.findAndModify(
  {
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: 
      {
        word: req.body.word, 
        valid: req.body.valid, 
        points: req.body.points,
        score: req.body.score
      }},
    new: true
  }, function(err, doc) {
    res.json(doc);
  });
});

app.listen(8081);
console.log('Server running on port 8081');