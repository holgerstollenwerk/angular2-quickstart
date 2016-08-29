module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        exec: {
            tsc: "node_modules/.bin/tsc"
        },
        less: {
            dev: {
                files: {
                    'style.css': [
                        'app/**/*.less',
                        'app/**/*.css'
                    ]
                },
                options: {
                    cleancss: false,
                    compress: false,
                    relativeUrls: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                    ],
                    strictUnits: true,
                    strictMath: true,
                    strictImports: true,
                    sourceMap: true,
                    sourceMapFileInline: true,
                }
            },
            dist: {
                files: '<%= less.dev.files %>',
                options: {
                    cleancss: true,
                    compress: true,
                    relativeUrls: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require('less-plugin-clean-css'))()
                    ],
                }
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['devel'],
                options: {
                    reload: true
                }
            },
            less: {
                files: [
                    'app/**/*.less',
                    'app/**/*.css'
                ],
                tasks: ['less:dev'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: 'app/**/*.ts',
                tasks: ['exec:tsc'],
                options: {
                    livereload: true
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('prepare', ['exec:tsc']);

    grunt.registerTask('devel', ['prepare', 'less:dev']);
    grunt.registerTask('prod', ['prepare', 'less:dist']);

    grunt.registerTask('default', 'devel');
};
