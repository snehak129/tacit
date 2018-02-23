module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    block:{
      dest: "/dist/"
    },

    clean: {
      build: {
        src: ['dist/*']
      },

      postBuild: {
        src: ['.tmp/']
      }
    },

    comments: {
      libs: {
        // Target-specific file lists and/or options go here. 
        options: {
          singleline: true,
          multiline: true,
          keepSpecialComments: false
        },
        src: ['web/js/**/*.js'] // files to remove comments from 
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'tacit',
          htmlmin: {
            collapseWhitespace: true,
            conservativeCollapse: true,
            collapseBooleanAttributes: true,
            removeCommentsFromCDATA: true
          },
          usemin: 'scripts/tacit.js'
        },
        cwd: 'web/',
        src: 'app/**/*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    useminPrepare: {
      html: 'dist/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['dist/index.html'],
      js: ['dist/scripts/{,*/}*.js'],
      css: ['dist/css/{,*/}*.css'],
      options: {
         blockReplacements: {
            base: function (block) {
                return ['<base href="', block.dest, '">'].join('');
            }
        },
        assetsDirs: [
          'dist'
        ]
      }
    },
    copy: {
      html: {
        src: 'web/index.html',
        dest: 'dist/index.html'
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'web',
          dest: 'dist',
          src: [

            'mazel/img/**/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: 'web/mazel',
          dest: 'dist',
          src: 'fonts/*'
        }]
      }
    },

    filerev: {
      dist: {
        src: [
          'dist/scripts/{,*/}*.js'
        ]
      }
    },

    browserSync: {
     dev: {
       bsFiles: {
         src : 'css/style.css'
       },
       options: {
         injectChanges: false
       }
     }
   }

  });

      // ngtemplates: {
    //   app: {
    //     cwd: 'web/',
    //     src: 'app/**/*.html',
    //     dest: 'dist/template.js',
    //     options: {
    //     //  module: 'templates',
    //     //  standalone: true
    //        usemin: 'dist/tacit.min.js' // <~~ This came from the <!-- build:js --> block 
    //     }
    //   }
    // },

    // concat_css: {


    //   files: {
    //     'dist/<%= pkg.name %>.css': ['web/mazel/**/*.css', 'web/css/tacit.css']
    //   }
    //   // css: {
    //   //   src: ['web/mazel/**/*.css', 'web/css/tacit.css'],
    //   //   dest: 'dist/<%= pkg.name %>.css'
    //   // }
    // },

    // cssUrlRewrite: {
    //   dist: {
    //     src: "dist/<%= pkg.name %>.css",
    //     dest: "dist/<%= pkg.name %>1.css",
    //     options: {
    //       skipExternal: true,
    //       rewriteUrl: function(url, options, dataURI) {

    //         var path = url.replace(options.baseDir, '');

    //         var hash = require('crypto').createHash('md5').update(dataURI).digest('hex');
    //         console.log('Path :::  ' +url);
    //       return '/v-' + hash + '/' + path;
    //       }
    //     }
    //   }
    // },



    // uglify: {
    //   options: {
    //     beautify: true
    //   },
    //   build: {
    //     files: {
    //       '.tmp/concat/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js',
    //       '.tmp/concat/libs.min.js': 'dist/libs.js'
    //     }
    //   }
    // },

    //  filerev: {
    //   dist: {
    //     src: [
    //       'dist/{,*/}*.js'
    //     ]
    //   }
    // },

    // useminPrepare: {
    //   html: 'web/index.html'
    // },

    // stripCssComments: {
    //   dist: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.css': 'dist/<%= pkg.name %>.min.css'
    //     }
    //   }
    // },
    // concat: {
    //   options: {
    //     separator: ';'
    //   },

    //   libs: {
    //     src: ['web/js/**/*.js'],
    //     dest: 'dist/libs.js'
    //   },
    //   dist: {
    //     src: ['web/app/**/*.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }


    //  },



    // sass: {
    //   dist: {
    //     options: {
    //       sourcemap: 'none'
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: 'web',
    //       src: ['**/*.scss'],
    //       dest: 'dist',
    //       ext: '.css'
    //     }]
    //   }
    // },
    // cssmin: { // Begin CSS Minify Plugin
    //   target: {
    //     files: [{
    //       expand: true,
    //       cwd: 'css',
    //       src: ['dist/**/*.css'],
    //       dest: 'dist',
    //       ext: '.css'
    //     }]
    //   }
    // },

    // cssmin: {
    //   options: {
    //     rebase: true,
    //     rebaseTo: path.resolve('web/mazel/plugin'),
    //     sourceMap: true
    //   },
    //   target: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
    //     }
    //   }
    // }

    // cssmin:{
    //   options:{
    //      root: 'web/mazel/'
    //   },
    //   target: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.css': ['dist/<%= pkg.name %>.css']
    //     }
    //   }
    // }

    // css_import: {
    //     dist: {
    //         options: {

    //         },
    //         files: {
    //             'dist/style.css': ['web/mazel/css/plugin/flexslider.css','web/mazel/css/plugin/carousel.css', 'web/mazel/css/style.css' ]
    //         }
    //     }
    // }

  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-stripcomments');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // grunt.loadNpmTasks('grunt-concat-css');
  // grunt.loadNpmTasks("grunt-css-url-rewrite");
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-connect');


  // grunt.registerTask('test', ['jshint', 'qunit']);

  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  //grunt.registerTask('default', [ 'clean:build', 'copy:html', 'useminPrepare', 'comments', 'concat', 'cssmin', 'uglify', 'usemin', 'clean:postBuild']);
  // grunt.registerTask('default', [ 'clean:build', 'copy:html', 'useminPrepare', 'comments', 'concat', 'uglify','usemin', 'clean:postBuild']);
  grunt.registerTask('default', ['clean:build', 'copy', 'useminPrepare', 'comments', 'ngtemplates', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'clean:postBuild']);
  grunt.registerTask('serve',['default'])
};