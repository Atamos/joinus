module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			grunt: {
				files: ["Gruntfile.js", "package.json"],
				tasks: "default"
			},
			javascript: {
				files: ["server.js","modules/*.js"],
				tasks: "test"
			}
		},
		mochacli: {
			options: {
				require: ['chai'],
				files: ['tests/*.js']
			},
			spec: {
				options: {
					reporter: 'spec'
				}
			}
		},
		jshint: {
   			 all: ['Gruntfile.js', 'server.js', 'test/*.js']
  		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks("grunt-mocha-cli");


	grunt.registerTask('test',['jshint','mochacli:spec']);
	grunt.registerTask('default',['test']);
};
