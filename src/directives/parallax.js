angular.module('duParallax.parallax', ['duScroll']).
directive('duParallax',
  function(scrollPosition){

    var test = angular.element('<div></div>')[0];
    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    var transformProperty;
    for(var i = 0; i < prefixes.length; i++) {
      if(test.style[prefixes[i]] !== undefined) {
        transformProperty = prefixes[i];
        break;
      }
    }

    if(!transformProperty){
      return;
    }

    var translate3d = function(result){
      return 'translate3d(' + result.x + 'px, ' + result.y + 'px, 0)';
    };

    var rotate = function(result) {
      if(!result.rotation) return '';
      return ' rotate(' + result.rotation + (angular.isNumber(result.rotation) ? 'deg' : '') +  ')';
    };

    var applyProperties = function(result, element) {
      element.style[transformProperty] = translate3d(result) + rotate(result);
      element.style.opacity = result.opacity;
    };

    return{
      scope : {
        y : '=',
        x : '=',
        rotation : '=',
        opacity : '='
      },
      link: function($scope, $element, $attr){
        var element = $element[0];
        var currentProperties;
        scrollPosition.observe(function(scrollY){
          var rect = element.getBoundingClientRect();
          var param = {
            scrollY : scrollY,
            elemX: rect.left,
            elemY: rect.top
          };

          var properties = { x : 0, y : 0, rotation : 0, opacity: 1};

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
        });
      }
    };
});