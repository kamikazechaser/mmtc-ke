// npm-installed modules
var loadGruntTasks = require('load-grunt-tasks');

exports = module.exports = (grunt) => {
  loadGruntTasks(grunt);

  grunt.initConfig({
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

  grunt.registerTask("build", ["sass"]);
};
