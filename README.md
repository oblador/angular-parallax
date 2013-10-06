angular-parallax
==============

Lightweight and highly performant AngularJS directive for parallax scrolling. 1.4K, under 35K with gzipped with dependencies.

Uses `requestAnimationFrame` and `translate3d` for GPU accelerated, smooth transitions.

Install
-------

    $ bower install angular-parallax

Dependencies
------------
[AngularJS](https://github.com/angular/angular.js) and [angular-scroll](https://github.com/durated/angular-scroll).

Usage
-----

### Quickstart

```js
angular.module('myApp', ['duParallax']).
  controller('MyCtrl', function($scope, parallaxHelper){
    $scope.background = parallaxHelper.createAnimator(-0.3);
  }
);
```

```html
<section ng-controller="MyCtrl">
  <img src="img.png" du-parallax y="background" alt="" />
</section>

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.min.js"></script>
<script src="http://durated.github.io/angular-parallax/angular-scroll.min.js"></script>
<script src="http://durated.github.io/angular-parallax/angular-parallax.min.js"></script>
```

Example
-------

Check out [example/index.html](https://github.com/durated/angular-parallax/blob/master/example/index.html).

Building
--------

    $ npm install
    $ grunt

Authors
-------

* @oblador
* @fisshy

License
--------
Copyright 2013 Durated Gmbh.

Licensed under the [MIT License](http://opensource.org/licenses/MIT)
