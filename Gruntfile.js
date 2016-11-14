// npm-installed modules
var loadGruntTasks = require('load-grunt-tasks');

exports = module.exports = (grunt) => {
  loadGruntTasks(grunt);

  grunt.initConfig({
    eslint: {
      src: [
        'app.js',
        'config/**/*.js',
        'engine/**/*.js',
        'Gruntfile.js',
        'routes/**/*.js',
        'web/js/*.js',
      ],
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'web/_sass/',
          src: ['*.sass'],
          dest: 'web/css/',
          ext: '.css',
        }],
      },
    },
  });

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['lint']);
};
