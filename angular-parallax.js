angular.module('duParallax', ['duParallax.directive', 'duParallax.helper']).value('duParallaxTouchEvents', true)
	.factory('duParallaxElement', ["$document", function($document) {
      return $document;
    }]);


angular.module('duParallax.helper', []).
factory('parallaxHelper',
  function() {
    function createAnimator (factor, max, min, offset) {
      return function(params) {
        var delta = factor*((offset || 0) + params.elemY);
        if(angular.isNumber(max) && delta > max) return max;
        if(angular.isNumber(min) && delta < min) return min;
        return delta;
      };
    }
    return {
      createAnimator: createAnimator,
      background:     createAnimator(-0.3, 150, -30, 50)
    };
});


angular.module('duParallax.directive', []).
directive('duParallax',
  ["$rootScope", "$window", "duParallaxTouchEvents", "duParallaxElement", function($rootScope, $window, duParallaxTouchEvents, duParallaxElement){

    var test = angular.element('<div></div>')[0];
    var prefixes = 'transform WebkitTransform MozTransform OTransform'.split(' '); //msTransform
    var transformProperty;
    for(var i = 0; i < prefixes.length; i++) {
      if(test.style[prefixes[i]] !== undefined) {
        transformProperty = prefixes[i];
        break;
      }
    }

    //Skipping browsers withouth transform-support.
    //Could do fallback to margin or absolute positioning, but would most likely perform badly
    //so better UX would be to keep things static.
    if(!transformProperty || (!duParallaxTouchEvents && 'ontouchstart' in window)) {
      return;
    }

    var translate3d = function(result) {
      if(!result.x && !result.y) return '';
      return 'translate3d(' + Math.round(result.x) + 'px, ' + Math.round(result.y) + 'px, 0)';
    };

    var rotate = function(result) {
      if(!result.rotation) return '';
      return ' rotate(' + (angular.isNumber(result.rotation) ? Math.round(result.rotation) + 'deg' : result.rotation) +  ')';
    };

    var applyProperties = function(result, element) {
      element.style[transformProperty] = translate3d(result) + rotate(result);
      element.style.opacity = result.opacity;
      if(result.custom) {
        angular.extend(element.style, result.custom);
      }
    };

    return{
      scope : {
        y : '=',
        x : '=',
        rotation : '=',
        opacity : '=',
        custom : '='
      },
      link: function($scope, $element, $attr){
        var element = $element[0];
        var currentProperties;
        var inited = false;

        var onScroll = function(){
          var transYRegex = /\.*translateY\((.*)px\)/i;
          var matches = transYRegex.exec(duParallaxElement.attr('style'));
          var scrollY = (matches && matches.length > 0) ? parseFloat(matches[1]) : 0;

          var rect = element.getBoundingClientRect();
          if(!inited) {
            inited = true;
            angular.element($window).on('load', function init() {
              //Trigger the onScroll until position stabilizes. Don't know why this is needed.
              //TODO: Think of more elegant solution.
              var i = 0;
              var maxIterations = 10;
              var currentY = rect.top;
              var lastY;
              do {
                lastY = currentY;
                onScroll();
                currentY = element.getBoundingClientRect().top;
                i++;
              } while(i < maxIterations && lastY !== currentY);
            });
          }

          var param = {
            scrollY : scrollY,
            elemX: rect.left,
            elemY: rect.top
          };

          var properties = { x : 0, y : 0, rotation : 0, opacity: 1, custom: undefined};

          for(var key in properties){
            if(angular.isFunction($scope[key])){
              properties[key] = $scope[key](param);
            } else if($scope[key]){
              properties[key] = $scope[key];
            }
          }

          //Detect changes, if no changes avoid reflow
          var hasChange = angular.isUndefined(currentProperties);
          if(!hasChange) {
            for(key in properties){
              if(properties[key] !== currentProperties[key]) {
                hasChange = true;
                break;
              }
            }
          }

          if(hasChange) {
            applyProperties(properties, element);
            currentProperties = properties;
          }
        };

        var observer = new MutationObserver(function(mutations) {
          for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].attributeName === 'style') {
              onScroll();
              break;
            }
          }
        });

        var config = { attributes: true };
        observer.observe(duParallaxElement[0], config);

        $scope.$on('$destroy', function() {
          observer.disconnect();
        });

      }
    };
}]);
