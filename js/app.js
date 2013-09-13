/*!
** HTML Email
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var App = angular.module('akshar',['ui.slider']);

App.factory('Model',function  () {
  return [
    { text : "Jay Kanakiya" , font_size : 40 , letter_spacing : 1 , color : "#000" , background_color : "#fff" , line_height : 2 , verticalpadding : [0,800] }
  ]
});

App.controller('mainCtrl',function  ($scope,Model) {
  $scope.model = Model ;
  //$scope.current = { text : "Jay Kanakiya" , font_size : 40 , letter_spacing : 1 , color : "#000" , background_color : "#fff" , line_height : 2 , verticalpadding : [0,800] }

  $scope.toToolbar = function  (r) {
    $scope.current = $scope.model[r] ;
  }

  $scope.getStyle = function  (index) {
    var cssStyles = "" ;
    var cssObj = $scope.model[index] ;
    var stylesList = [ "font_size" , "letter_spacing" , "color" , "background_color" , "line_height"] ;
    stylesList.forEach(function  (i) {
      cssStyles += i.replace("_","-") + ":" + cssObj[i] + ";" ;
    });
    return cssStyles ;
  }

  $scope.init = function  () {
    $scope.current = $scope.model[0];
    $(document).ready(function  () {
      gridOverlay($("#box"));
    });
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

App.directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attrs, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attrs.stripBr && html == '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  });