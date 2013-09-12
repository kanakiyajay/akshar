/*!
** HTML Email
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var App = angular.module('akshar',[]);

App.factory('Model',function  () {
  return [
    { text : "Jay Kanakiya" , font_size : 40 , letter_spacing : 1 , color : "#000" , background_color : "#fff" }
  ]
});

App.controller('mainCtrl',function  ($scope,Model) {
  $scope.model = Model ;
  $scope.current = {} ;

  $scope.toToolbar = function  (r) {
    $scope.current = $scope.model[r] ;
  }

  $scope.getStyle = function  (index) {
    var cssStyles = "" ;
    var cssObj = $scope.model[index] ;
    var stylesList = [ "font_size" , "letter_spacing" , "color" , "background_color"] ;
    stylesList.forEach(function  (i) {
      cssStyles += i.replace("_","-") + ":" + cssObj[i] + ";" ;
    });
    return cssStyles ;
  }

  $scope.init = function  () {
    $scope.current = $scope.model[0];
  }
});

/* Directives */
App.directive('uiColorpicker', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: false,
        replace: true,
        template: "<span><input class='input-small' /></span>",
        link: function(scope, element, attrs, ngModel) {
            var input = element.find('input');
            var options = angular.extend({
                color: ngModel.$viewValue,
                clickoutFiresChange : true ,
                showInput : true ,
                change: function(color) {
                    scope.$apply(function() {
                      ngModel.$setViewValue(color.toHexString());
                    });
                }
            }, scope.$eval(attrs.options));

            ngModel.$render = function() {
              input.spectrum('set', ngModel.$viewValue || '');
            };

            input.spectrum(options);
        }
    };
});