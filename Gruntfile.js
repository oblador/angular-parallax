module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['src/**/*.js']
      },
    },
    clean: {
      dist:   ['angular-parallax.js', 'angular-parallax.min.js', 'angular-parallax.min.js.map']
    },
    concat: {
      options: {
        separator: "\n\n",
      },
      dist: {
        src: [
          'src/module.js', 
          'src/services/helper.js',
          'src/directives/parallax.js',
        ],
        dest: 'angular-parallax.js',
      },
    },
    ngmin: {
      dist: {
        src: ['angular-parallax.js'],
        dest: 'angular-parallax.min.js'
      }
    },
    uglify: {
      dist: {
        options: {
          report: 'gzip', 
          sourceMap: 'angular-parallax.min.js.map'
        },
        files: {
          'angular-parallax.min.js': ['angular-parallax.min.js']
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'ngmin', 'uglify']);
};
