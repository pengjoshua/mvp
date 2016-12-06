var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("hello from controller");

  var refresh = function() {
    $http.get('/wordlist').then(function(response) {
      console.log('I got the data I requested');
      $scope.wordlist = response.data;
    });
  };
  refresh();

  var generateBoard = function(num) {
    num = 4; // default setting
    var allLetters = 'abcdefghijklmnopqrstuvwxyz';
    var letters = {};
    var randomIndex = Math.floor(Math.random() * allLetters.length);

  };

  var inDictionary = function(word) {
    return $http.get('words.json').then(function(response) {
      $scope.dictionary = response.data;
      console.log($scope.dictionary.words.length);
      if ($scope.dictionary.words.indexOf(word) !== -1) {
        return true;
      }
    });
  };

  var inBoard = function(word) {
    if ()
  }

  inDictionary();

}]);