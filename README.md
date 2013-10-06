angular-parallax
==============

Install
-------

    $ bower install angular-parallax

Usage
-----

```js
angular.module('myApp', ['duParallax']).
  controller('myCtrl', function($scope, parallaxHelper){
    $scope.background = parallaxHelper.createAnimator(0.3);
  }
);
```

```html
<img src="img.png" du-parallax y="background">
```

Building
--------

    $ npm install
    $ grunt
