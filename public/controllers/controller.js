// var Promises = require('bluebird');

var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("hello from controller");
  var progress = '';
  $scope.wordlist = [];
  $scope.score = 0;

  $scope.$watch("text.input", function (newVal, oldVal) {
    // console.log("oldVal:", oldVal);
    // console.log("newVal:", newVal);
    // $scope.newVal = newVal;
    // if (newVal !== undefined) {
    //   var curr = newVal.charAt(newVal.length - 1);
    //   if (xOnGrid(curr) > 0) {
    //     progress = progress.concat(curr);
    //     console.log('progress', progress);
    //   }
    //   console.log('oldVal', oldVal, 'newVal', newVal, 'curr', curr);
    // } 
  });
  $scope.text = {
    valid: null
  };
  $scope.submit = function() {
    $scope.text.score = $scope.text.score || 0;
    $scope.text.score += $scope.score;
    $scope.text.word = $scope.text.input;
    if ($scope.text.word) {
      inDictionary($scope.text.input, function(valid) {
        $scope.text.valid = valid;
        if (!valid) {
          $scope.text.points = 0;
        } else if ($scope.text.word.length < 5) {
          $scope.text.points = 1;
        } else {
          $scope.text.points = $scope.text.word.length - 3;
        }
        $scope.text.score += $scope.text.points;
        $scope.wordlist.push(JSON.parse(JSON.stringify($scope.text)));
        console.log('word', $scope.text.word, 'valid', $scope.text.valid, 'points', $scope.text.points, 'score', $scope.text.score);
        console.dir($scope.wordlist);
        $scope.text.input = '';
      });
    }
  };

  var refresh = function() {
    $http.get('/wordlist').then(function(response) {
      console.log('I got the data I requested');
      $scope.wordlist = response.data;
    });
  };
  refresh();

  var generateGrid = function() {

    var cube1 = new Array('Qu', 'U', 'M', 'H', 'N', 'I');
    var cube2 = new Array('L', 'X', 'E', 'D', 'I', 'R');
    var cube3 = new Array('R', 'Y', 'T', 'L', 'T', 'E');
    var cube4 = new Array('S', 'E', 'E', 'U', 'I', 'N');
    var cube5 = new Array('L', 'R', 'H', 'Z', 'N', 'N');
    var cube6 = new Array('Y', 'I', 'D', 'S', 'T', 'T');
    var cube7 = new Array('G', 'E', 'E', 'N', 'A', 'A');
    var cube8 = new Array('S', 'K', 'F', 'F', 'P', 'A');
    var cube9 = new Array('T', 'O', 'O', 'W', 'A', 'T');
    var cube10 = new Array('R', 'E', 'V', 'L', 'D', 'Y');
    var cube11 = new Array('C', 'I', 'U', 'T', 'M', 'O');
    var cube12 = new Array('H', 'E', 'E', 'N', 'W', 'G');
    var cube13 = new Array('S', 'T', 'O', 'I', 'S', 'E');
    var cube14 = new Array('C', 'H', 'O', 'P', 'A', 'S');
    var cube15 = new Array('W', 'R', 'E', 'T', 'H', 'V');
    var cube16 = new Array('J', 'O', 'O', 'B', 'A', 'B');

    var cubes = new Array(cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10,
      cube11, cube12, cube13, cube14, cube15, cube16);

    var letters = {};
    var grid = [];

    _.each(cubes, function(cube, index) {
      var randomSide = Math.floor(Math.random() * cube.length);
      var randomLetter = cube[randomSide];
      letters[index] = randomLetter;
      grid.push(randomLetter);
    });

    console.log('grid', grid);
    console.log('letters', letters);
    $scope.grid = grid;
    $scope.letters = letters;
    return grid;
  };

  var inDictionary = function(word, cb) {
    console.log('word', word);
    $http.get('words.json').then(function(response) {
      $scope.dictionary = response.data;
      console.log($scope.dictionary.words.length);
      if ($scope.dictionary.words.indexOf(word) !== -1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  };

  var xOnGrid = function(letter) {
    var matches = [];
    var letterIds = [];
    console.log('inGrid: grid', $scope.grid, 'letter', letter.toUpperCase());
    var letterCaps = letter.toUpperCase();
    for (var id in $scope.letters) {
      if ($scope.letters[id] === letterCaps) {
        matches.push(letterCaps);
        letterIds.push(id);
      }
    }
    console.log('matches', matches, 'letterIds', letterIds);
    $scope.matches = matches;
    $scope.letterIds = letterIds;
    var isOnGrid = true;
    // for (var i = 0; i < letterIds.length; i++) {
    //   if (letterIds[i])
    // }
    return matches.length;
    // return _.contains($scope.grid, letter.toUpperCase()); 
  };

  // var validLetter = function(letter) {
  // };

  // var nonRepeat = function(letter) {
  // };

  inDictionary();
  generateGrid();

}]);