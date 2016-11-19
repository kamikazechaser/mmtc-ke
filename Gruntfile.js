// npm-installed modules
var loadGruntTasks = require('load-grunt-tasks');

exports = module.exports = (grunt) => {
  loadGruntTasks(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        files: {
          'web/js/engine.js': 'engine/math.js',
        },
        options: {
          exclude: [
            'engine/clients.js',
            'engine/index.js',
            'engine/networks.js',
            'engine/pages.js',
            'common-errors',
          ],
          transform: [
            ['babelify', { presets: ['es2015'] }],
            ['uglifyify', { global: true }],
          ],
        },
      },
    },
    eslint: {
      src: [
        'app.js',
        'config/**/*.js',
        'engine/**/*.js',
        'Gruntfile.js',
        'routes/**/*.js',
        'web/js/*.js',
        '!web/js/engine.js',
        'test/**/*.js',
      ],
    },
    mochaTest: {
      test: [
        'test/test.*.js',
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

  grunt.registerTask('build', ['browserify', 'sass']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('test', ['lint', 'mochaTest']);
};
