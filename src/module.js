angular.module('duParallax', ['duParallax.directive', 'duParallax.helper']).value('duParallaxTouchEvents', true)
	.factory('duParallaxElement', ["$document", function($document) {
      return $document;
    }]);
