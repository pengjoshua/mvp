var myApp = angular.module('myApp', []);

myApp.controller('AppController', ['$scope', '$http', function($scope, $http) {
  console.log("hello from controller");

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
  $scope.wordlist = wordlist;

}]);