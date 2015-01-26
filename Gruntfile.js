module.exports = function(grunt){

	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),
	
		connect: {
			server: {
				options: {
					//livereload: 1,
					keepalive: true
					
				}
				//target: {},
			}
		}

	});

	
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect']);
	
}