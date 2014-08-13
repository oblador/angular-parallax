angular-parallax
================

Lightweight and highly performant AngularJS directive for parallax scrolling. Script is just 1.6K and about 40K gzipped with dependencies.

Uses `requestAnimationFrame` and `translate3d` for GPU accelerated, smooth transitions.

Install
-------

    $ bower install ng-parallax

Dependencies
------------
[AngularJS](https://github.com/angular/angular.js) and [angular-scroll](https://github.com/durated/angular-scroll).

Usage
-----

### Quickstart

Include module and dependencies.
```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.14/angular.min.js"></script>
<script src="http://durated.github.io/angular-scroll/0.5.1/angular-scroll.min.js"></script>
<script src="http://durated.github.io/angular-parallax/angular-parallax.min.js"></script>
```

Define transitions and expose to template.
```js
angular.module('myApp', ['duParallax']).
  controller('MyCtrl', function($scope, parallaxHelper){
    $scope.background = parallaxHelper.createAnimator(-0.3);
  }
);
```

Apply parallax scrolling with the `du-parallax` attribute, define `y` position with the transition named `background`.
```html
<section ng-controller="MyCtrl">
  <img src="img.png" du-parallax y="background" alt="" />
</section>
```

### `createAnimator`
Convenience method for creating animator closures.

```js
parallaxHelper.createAnimator(easingFactor, max, min, offset);
```

### Animatable attributes

Attributes can be literals or a function called with a parameter object containing `scrollY`, `elemX`, `elemY`. The function should return the change in pixels relative to the objects current position if associated with y or x, otherwise the desired new value. 

* y
* x
* rotation
* opacity
* custom

The custom animator should return an object with camelCased CSS properties like this:

```js
{
  backgroundPosition: '-100px 0',
  left: '20%'
}
```

```html
<img src="img.png" du-parallax y="accelleratedScroll" y="moveInFromLeft" opacity="fadeIn" rotation="'35deg'" alt="" />
```


Example
-------

Check out [durated.github.io/angular-parallax](http://durated.github.io/angular-parallax/) or view the source at [example/index.html](https://github.com/durated/angular-parallax/blob/master/example/index.html).

Building
--------

    $ npm install
    $ gulp

Authors
-------

* [Joel Arvidsson](https://github.com/oblador)
* [Joachim Karlsson](https://github.com/fisshy)

License
--------
Copyright 2013-2014 Durated Gmbh.

Licensed under the [MIT License](http://opensource.org/licenses/MIT)
