var distDir = 'dist';
var jsFileList = [ 'src/assets/js/jquery.fitvids.js', 
                   'src/assets/js/index.js', 
                   'src/assets/js/jquery.mmenu.js', 
                   'src/assets/js/google.code.prettify.js' ];
var cssFileList = [ 'src/assets/css/screen.css',
                    'src/assets/css/jquery.mmenu.css',
                    'src/assets/css/jquery.mmenu.positioning.css',
                    'src/assets/css/google.code.prettify.css' ];


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Read node configurations
    pkg: grunt.file.readJSON('package.json'),

    // Lint JS files
    jshint: {
      my_files: [
        'Gruntfile.js',
        'src/assets/js/*.js',
        '!src/assets/js/google.code.prettify.js'
      ]
    },

    // Clean the dist dir
    clean: [distDir],

    // Copy files to dist
    copy: {
      main: {
        files: [
          {expand: true, src: ['LICENSE'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['README.md'], dest: 'dist/', filter: 'isFile'},
          {expand: true, src: ['package.json'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['assets/fonts/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['assets/img/*'], dest: 'dist/', filter: 'isFile'}
        ]
      }
    },
    
    // Minify css files into one
    cssmin: {
      my_target: {
        options: {
          banner: '/* casper-slidr theme, more details at http://bhira.net */'
        },
        files: {
          'dist/assets/css/all.min.css': cssFileList
        }
      }
    },

    // Minify js files into one
    uglify: {
      my_target: {
        options: {
          banner: '/* casper-slidr theme, more details at http://bhira.net */'
        },
        files: {
          'dist/assets/js/all.min.js': jsFileList
        }
      }
    },

    // Compress artifacts into a zip file
    compress: {
      main: {
        options: {
          archive: 'casper-slidr.zip'
        },
        files: [
          {expand: true, cwd: 'dist/', src: ['**'], dest: 'casper-slidr/'}
        ]
      }
    }    
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean', 'copy', 'cssmin:my_target', 'uglify:my_target', 'compress']);

};
