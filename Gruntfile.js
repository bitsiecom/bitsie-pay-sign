module.exports = function(grunt) {
	require('jit-grunt')(grunt, {
		jasmine_node : 'grunt-jasmine-node-coverage'
	});

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// JS TASKS ================================================================
		// check all js files for errors
		jshint: {
			default: ['www/src/js/**/*.js'] 
		},

		// server-side testing
		jasmine_node: {
			options: {
				coverage: {
				},
		        forceExit: true,
		        match: '.',
		        matchAll: false,
		        specFolders: ['test'],
		        extensions: 'js',
		        specNameMatcher: 'spec',
		        captureExceptions: true,
		        junitreport: {
		          report: true,
		          savePath : 'coverage/',
		          useDotNotation: true,
		          consolidate: true
		        }
		    },
			src: ['../index.js', 'lib/**/*.js']
		  }
	});

	grunt.registerTask('test', ['jshint', 'jasmine_node']);

};