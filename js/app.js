/*!
** HTML Email
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
** Horizontal Width = 910 , Vertical Width = 280 
**/

var App = angular.module('akshar',['ui.slider','firebase','LocalStorageModule']);

App.factory('Model',function  () {
  return [
    { 
      text : "Jay Kanakiya" , 
      font : "Oswald" ,
      font_size : 40 , 
      font_weight : 400 , 
      letter_spacing : 1 , 
      color : "#000" , 
      background_color : "#ccc" , 
      horizontalpadding : 337 , 
      verticalpadding : 207,
      text_shadow : {
        x : 1 ,
        y : 1 ,
        blur : 1 ,
        color : '#ccc'
      }
    }
  ]
});

App.controller('mainCtrl',function  ($scope,$http,Model,angularFire,localStorageService) {

  $scope.model = Model ;
  $scope.fonts = [] ;
  
  /* Functions*/

  $scope.toToolbar = function  (r) {
    $scope.current = $scope.model[r] ;
  }

  $scope.getStyle = function  (index) {
    var cssStyles = "" ;
    var cssObj = $scope.model[index] ;
    var stylesList = [ "font_size" , "letter_spacing" , "color" , "background_color" , "font_weight"] ;
    stylesList.forEach(function  (i) {
      cssStyles += i.replace("_","-") + ":" + cssObj[i] + ";" ;
    });

    /* For  Positioning  */

    cssStyles += "left :" + cssObj.horizontalpadding + "px ;" ;
    cssStyles += "top :" + (280 - cssObj.verticalpadding) + "px ;" ;

    /* Font-Family */

    cssStyles += 'font-family : "' + cssObj.font + '";' ;

    /* Text Shadow */

    cssStyles += "text-shadow:"+cssObj.text_shadow.x+"px "+cssObj.text_shadow.y
                          +"px "+cssObj.text_shadow.blur+"px "+cssObj.text_shadow.color+";"

    return cssStyles ;
  }

  $scope.getFonts = function  () {
    $http.get('data/fonts.json')
      .then(function  (res) {
        $scope.fonts = res.data ;
    });
  }

  $scope.getFontUrl = function  () {
    return "http://fonts.googleapis.com/css?family=" + $scope.current.font.replace(' ','+') ;
  }

  $scope.init = function  () {
    $scope.current = $scope.model[0];
    $scope.getFonts() ;
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

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}