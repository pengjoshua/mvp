var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  
  var initialize = function() {
    $http.get('/wordlist').then(function(response) {
      console.log('I got the data I requested');
      $scope.list = response.data;
      if ($scope.list.length > 0) {
        for (var i = 0; i < $scope.list.length; i++) {
          $scope.list[i].added = true;
        }
      }
    });
  };

  var progress = '';
  $scope.list = initialize() || [];;
  $scope.score = 0;
  $scope.highlight = false;

  $scope.$watch("text.input", function (newVal, oldVal) {
    inDictionary(newVal, function(valid) {
      var repeatedWord = false;
      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i].word === newVal) {
          repeatedWord = true;
        }
      }
      if (!valid || !onGrid($scope.text.word) || repeatedWord) {
        $scope.highlight = true;
      } else {
        $scope.highlight = false;
      }
    });
    // console.log('highlight', $scope.highlight);
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
    word: '',
    valid: null,
    points: 0,
    score: 0,
    added: false
  };

  $scope.submit = function() {
    $scope.text.score = $scope.text.score || 0;
    $scope.text.score += $scope.score;
    $scope.text.word = $scope.text.input;
    
    if ($scope.text.word) {
      inDictionary($scope.text.word, function(valid) {
        $scope.text.valid = valid;
        var repeatedWord = false;
        for (var i = 0; i < $scope.list.length; i++) {
          if ($scope.list[i].word === $scope.text.word) {
            repeatedWord = true;
          }
        }
        if (!valid || !onGrid($scope.text.word) || repeatedWord) {
          $scope.text.valid = false;
          $scope.text.points = 0;
        } else if ($scope.text.word.length < 5) {
          $scope.text.points = 1;
        } else {
          $scope.text.points = $scope.text.word.length - 3;
        }
        $scope.text.score += $scope.text.points;
        $scope.single = JSON.parse(JSON.stringify($scope.text));
        $scope.single.added = false;
        $scope.list.push($scope.single);
        // console.log('word', $scope.text.word, 'valid', $scope.text.valid, 'points', $scope.text.points, 'score', $scope.text.score);
        $scope.text.input = '';
      });
    }
  };

  var refresh = function() {
    $http.get('/wordlist').then(function(response) {
      console.log('I got the data I requested');
      return response.data;
    });
  };
  refresh();

  $scope.add = function() {
    if (!$scope.single) {
      return null;
    }
    $http.post('/wordlist', this.w).then(function(response) {
      console.log('post response.data', response.data);
      for (var i = 0; i < $scope.list.length; i++) {
        if (response.data.word === $scope.list[i].word) {
          $scope.list[i]._id = response.data._id;
          $scope.list[i].added = true;
        }
      }
      refresh();
    });
  };

  $scope.remove = function(id) {
    $http.delete('/wordlist/' + id).then(function(response) {  
      console.log('delete response.data', response.data);  
      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i]._id === id) {
          $scope.list.splice(i, 1);
        }
      } 
      console.log('$scope.list', $scope.list);
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/wordlist/' + id).then(function(response) {
      $scope.word = response.data;
    });
  };

  $scope.update = function() {
    console.log($scope.single._id);
    $http.put('/wordlist/' + $scope.single._id, $scope.single).then(function(response) {
      refresh();
    });
  };

  $scope.deselect = function() {
  }

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

    // console.log('grid', grid);
    // console.log('letters', letters);
    $scope.grid = grid;
    $scope.letters = letters;
    return grid;
  };
  generateGrid();

  var inDictionary = function(word, cb) {
    $http.get('words.json').then(function(response) {
      $scope.dictionary = response.data;
      if ($scope.dictionary.words.indexOf(word) !== -1) {
        cb(true);
      } else {
        cb(false);
      }
    });
  };

  var onGrid = function(word) {
    console.log(word);
    var wordCaps = word.toUpperCase();
    var gridCopy = $scope.grid.slice();
    for (var i = 0; i < wordCaps.length; i++) {
      var gridIndex = gridCopy.indexOf(wordCaps[i]);
      if (gridIndex !== -1) {
        gridCopy.splice(gridIndex, 1);
      } else {
        return false;
      }
    }
    return true;
  }

  var timesOnGrid = function(letter) {
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

}]);