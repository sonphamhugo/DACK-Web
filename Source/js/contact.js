





//Add food to firebase
// update food to firebase
// remove food from firebase

var app = angular.module("Food_Order", ["firebase"]);
app.controller("ContactCtrl", function($scope, $firebaseObject) {
  var ref = new Firebase("https://testfoodorder.firebaseio.com/Store/Contact/");
  $scope.contact = $firebaseObject(ref);

  $scope.contact.$loaded()
      .then(function() {
    console.log($scope.contact);
   });


  // putting a console.log here won't work, see below
 });











