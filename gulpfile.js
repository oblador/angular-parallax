var gulp   = require('gulp');
var clean  = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngmin  = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');

var sources = [
  'src/module.js', 
  'src/services/helper.js',
  'src/directives/parallax.js'
];

var targets = 'angular-parallax.{js,min.js,min.js.map}';

gulp.task('clean', function() {
  gulp.src(targets)
    .pipe(clean());
});

gulp.task('lint', function() {
  gulp.src(sources)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  //Development version
  gulp.src(sources)
    .pipe(concat('angular-parallax.js', { newLine: '\n\n' }))
    .pipe(ngmin())
    .pipe(gulp.dest('./'));

  //Minified version
  gulp.src(sources)
    .pipe(sourcemaps.init())
      .pipe(concat('angular-parallax.min.js', { newLine: '\n\n' }))
      .pipe(ngmin())
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['lint', 'clean', 'compress']);
