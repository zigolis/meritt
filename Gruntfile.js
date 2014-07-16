module.exports = function(grunt){
    grunt.initConfig({

        // htmlmin
        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: '*.html',
                    dest: 'dist/',
                }]
            }
        },

        // less
        less: {
            dev: {
                options: {
                    paths: ["dev/assets/css/less"],
                    yuicompress: true,
                    compress: true
                },
                files: {
                    "dist/assets/css/meritt.min.css"            : "dev/assets/css/less/meritt.less",
                    "dist/assets/css/meritt.reset.min.css"      : "dev/assets/css/less/meritt.reset.less",
                    "dist/assets/css/meritt.responsive.min.css" : "dev/assets/css/less/meritt.responsive.less",
                    "dist/assets/css/meritt.alerts.min.css"     : "dev/assets/css/less/meritt.alerts.less"
                }
            }
        },

        // js minification
        uglify: {
            task: {
                options: {
                    report: 'gzip',
                    compress: true,
                    mangle: false
                },
                files: {
                    'dist/assets/js/meritt.min.js'              : ['dev/assets/js/meritt.js'],
                    'dist/assets/js/meritt.alerts.min.js'       : ['dev/assets/js/meritt.alerts.js']
                }
            }
        },

        // jshint
        jshint : {
            all : [
                'dev/assets/js/*.js'
            ]
        },

        // watch
        watch: {
            dev: {
                files: [
                    'dev/assets/css/less/*.less',
                    'dev/assets/js/*.js',
                    'dev/*.html',
                    'Gruntfile.js'
                ],
                tasks: [ 'uglify', 'less', 'htmlmin' ]
            }
        },

        // imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand : true,
                    cwd    : 'dev/assets/img/',
                    src    : ['**/*.{png,jpg,gif}'],
                    dist   : 'dist/assets/img/'
                }]
            }
        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );

    // tasks
    grunt.registerTask( 'default', [ 'watch' ] );
    grunt.registerTask( 'build', [ 'uglify', 'less', 'htmlmin' ] );
    grunt.registerTask( 'test', [ 'jshint' ] );
    grunt.registerTask( 'image', [ 'imagemin' ] );

}
