module.exports = function(grunt) {

	grunt.initConfig({
		srcFolder: 'src',
		baseFolder: 'www',
		pkg: grunt.file.readJSON('package.json')
	});

	/* shower */
	grunt.loadNpmTasks('grunt-shower-markdown');
	grunt.config('shower', {
		tdd_session: {
			destFolder: 'www',
			dest: 'index.html',
			title: 'Full Stack Web Development Bootcamp',
			styles: [
				'https://fonts.googleapis.com/css?family=Lato',
				'https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css',
				'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
				'https://cdn.jsdelivr.net/devicons/1.8.0/css/devicons.min.css',
				'css/styles.css',
				'css/print.css'
			],
			scripts: [
				'https://code.jquery.com/jquery-2.2.4.min.js',
				'js/main.js',
			],
			src: '<%= srcFolder %>/md/index.md',
			theme: 'themes/bright'
		}
	});


	/* compass */
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.config('compass', {
		dev : {
			options: {
				sassDir: '<%= srcFolder %>/scss',
				cssDir: '<%= baseFolder %>/css',
				outputStyle : 'nested',
				environment: 'development',
				sourcemap: true
			}
		},
		theme : {
			options: {
				sassDir: '<%= srcFolder %>/scss/bright-theme',
				cssDir: '<%= baseFolder %>/themes/bright/styles',
				outputStyle : 'nested',
				environment: 'development'
			}
		}
	});

	/* watch */
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.config('watch', {
		options: {
			livereload: '<%= connect.options.livereload %>',
		},
		all : {
			files: ['<%= srcFolder %>/**/*', 'Gruntfile.js', 'node_modules/grunt-shower-markdown/**/*'],
			tasks: ['shower','compass']
		}
	});

	/* connect */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.config('connect', {
		options: {
			port: 8080,
			livereload: 35729,
			hostname: 'localhost'
		},
		livereload: {
			options: {
				open: true,
				base: '<%= baseFolder %>'
			}
		}
	});


	/* copy */
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.config('copy', {
		main: {
			expand: true,
			cwd: 'src/js/',
			src: '**',
			dest: 'www/js/',
		},
	});


	/* deploy gh-pages  */
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.config('gh-pages', {
		options: {
			base: 'www' ,
			message: 'Generated by grunt gh-pages'
		},
		src: [
			'css/*',
			'js/*',
			'font/*',
			'img/*',
			'shower/*',
			'themes/**/*',
			'index.html'
		]
	});

	/* tasks  */
	grunt.loadNpmTasks('grunt-available-tasks');
	grunt.config('availabletasks', {
		tasks: {
			options: {
				/* showTasks: ['user'], */
				sort: true
			}
		}
	});

	grunt.registerTask ('deploy', ['default','gh-pages']);
	grunt.registerTask('serve', ['default','connect:livereload','watch:all']);
	grunt.registerTask('tasks', ['availabletasks']);
	grunt.registerTask('default', ['shower','compass','copy']);

};