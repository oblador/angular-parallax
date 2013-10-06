angular-parallax
==============

Install
-------

    $ bower install angular-parallax

Usage
-----

```js
angular.module('myApp', ['duParallax']).
    controller('myCtrl', function($scope, scrollPosition){
        scrollPosition.listen(function(scrollY) {
            console.log('Scrolled to ', scrollY);
        });
    }
);
```

```html
<img src="img.png" parallax y="background">
```

Building
--------

    $ npm install
    $ grunt
