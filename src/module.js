angular.module('duParallax', ['duScroll', 'duParallax.directive', 'duParallax.helper']).value('duParallaxTouchEvents', true)
	.factory('duParallaxElement', ["$document", function($document) {
      return $document;
    }]);
