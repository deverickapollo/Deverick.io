module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),
	  	uglify: {
	  		options: {
	  			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	  		},
	  		build: {
	  			src: 'src/<%= pkg.name %>.js',
	  			dest: 'build/<%= pkg.name %>.min.js'
	  		}
	  	}
		pages: {                        // Task 
			options: {                    // Universal options 
				bundleExec: true,
				src: '<%= app %>'
			},
			dist: {                       // Target 
				options: {                  // Target options 
					dest: '<%= dist %>',
					config: '_config.yml,_config.build.yml'
				}
			},
			serve: {                      // Another target 
				options: {
					dest: '.jekyll',
					drafts: true
				}
			}
		}
	});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll-pages');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};


