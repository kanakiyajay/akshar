/*!
** HTML Email
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var App = angular.module('akshar',[]);

App.factory('Model',function  () {
  return [
    { text : "Jay Kanakiya" , font_size : 40 , letter_spacing : 1 }
  ]
});

App.controller('mainCtrl',function  ($scope,Model) {
  $scope.model = Model ;
  $scope.current = { text : ""  , font_size : 1 } ;

  $scope.toToolbar = function  (r) {
    $scope.current = $scope.model[r] ;
  }

  $scope.getStyle = function  (index) {
    var cssStyles = "" ;
    var cssObj = $scope.model[index] ;
    var stylesList = [ "font_size" , "letter_spacing" ] ;
    stylesList.forEach(function  (i) {
      cssStyles += i.replace("_","-") + ":" + cssObj[i] + ";" ;
    });
    return cssStyles ;
  }

  $scope.init = function  () {
    $scope.current = $scope.model[0];
  }
});
