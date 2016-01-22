var browserSync = require("browser-sync");

module.exports = function(grunt) {
   grunt.initConfig({
      less: {
         style: {
            files: {
               "css/style.css": "less/style.less"
            }
         }
      },
      sass: {
          dist: {
               files: {
                 'css/src/style-sass-cache.css': 'sass/style.scss'
               }
             }
      },
      concat_css: {
      	options: {
      		// Task-specific options go here.
      	},
      	all: {
      		src: ["css/src/plugins/**/*.css","css/src/*.css"],
      		dest: "css/style.css"
      	},
      },
      concat: {
         comp : {
            files: {
               'js/script.js': ['js/src/plugins/**/*.js','js/src/*.js', 'js/src/sections/**/*.js'],
            }
         }

      },
      uglify: {
      	options: {
      		mangle: {
      			except: ['jQuery', 'Backbone']
      		}
      	},
      	target: {
      		files: {
      			'js/script.min.js': ['js/script.js']
      		}
      	}
    },
      postcss: {
         options: {
            processors: [
               require('autoprefixer-core')({
                  browsers: 'last 4 versions'
               }), // add vendor prefixes
            ]
         },
         dist: {
            src: 'css/style.css'
         }
      },
      cssmin: {
      	target: {
      		files: {
      			'css/style.min.css': ['css/style.css']
      		}
      	}
    },
      /* watch changes in js and less folders */
      watch: {
         options: {
            spawn: false // Very important, don't miss this
         },
         css: {
            files: ['css/src/**/*.css', 'sass/**/*.scss'],
            tasks: ['sass','concat_css','postcss', 'cssmin', 'bs-inject'],
            options: {
               livereload: true,
            }
         },
         js : {
            files: ['js/src/**/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
               livereload: true,
            }
         }

      }
   });
   /**
    * Init BrowserSync manually
    */
   grunt.registerTask("bs-init", function() {
      var done = this.async();
         browserSync({
            server: {
               baseDir: "./"
            }
         },
         function(err, bs) {
            done();
         });
   });
   /**
    * Inject CSS
    */
   grunt.registerTask("bs-inject", function() {
      browserSync.reload(["css/style.min.css"]);
   });

   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-postcss');
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-concat-css');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   // Launch Browser-sync & watch files
   /* uncomment bs-init to inject the css into the html files */

   /* Bs init works only on html static files. Please comment bs-init property if you work on a php project */
   grunt.registerTask('default', ['bs-init', 'watch']);


};
