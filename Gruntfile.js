module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        src: 'public/**/*.less',
        dest: 'public/main.css'
      },
      production: {
        src: 'public/**/*.less',
        dest: 'public/main-min.css',
        options: {
          yuicompress: true
        }
      }
    },
    nodemon: {
      development: {
        options: {
          file: 'app.js',
          ignoredFiles: [
            'README.md',
            'node_modules/**',
            'bower_components/**'
          ],
          watchedExtensions: [
            'js',
            'jade',
            '.env'
          ]
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },
    watch: {
      less: {
        files: ['public/**/*.less'],
        tasks: ['less:development']
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'app.js',
        'routes/**/*.js',
        'public/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', [
    'less:development',
    'jshint',
    'watch'
  ]);

  grunt.registerTask('heroku', [
    'less:production'
  ]);

};
