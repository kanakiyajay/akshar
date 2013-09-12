/*!
** HTML Email
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var App = angular.module('akshar',[]);

App.factory('Model',function  () {
  return [
    { text : "Jay Kanakiya" , font_size : 40 , letter_spacing : 1 , color : "#000" , background_color : "#fff" , line_height : 2}
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
    var stylesList = [ "font_size" , "letter_spacing" , "color" , "background_color" , "line_height" ] ;
    stylesList.forEach(function  (i) {
      cssStyles += i.replace("_","-") + ":" + cssObj[i] + ";" ;
    });
    return cssStyles ;
  }

  $scope.init = function  () {
    $scope.current = $scope.model[0];
  }
});

App.controller('canvasCtrl',function  ($scope) {
  $scope.init = function  () {
     gridOverlay($("#box"));
  }
  $scope.canvasClk = function  (e) {
    console.log($(e.target));
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
                move: function(color) {
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