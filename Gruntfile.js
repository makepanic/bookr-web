/*global require, module */
'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };
    var bookrConfig = {
        test: 'test',
        tmp: 'build/tmp',
        dist: 'build/dist',
        src: 'src',
        res: 'build/res',
        release: 'build/release'
    };
    var watchTasks = [
        'copy:tmp',
        'build',
        'copy:assets'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        bookr: bookrConfig,
        watch: {
            options: {
                livereload: true
            },
            js_files:{
                files: [ '<%= bookr.src %>/js/**/*.js' ],
                tasks: watchTasks
            },
            hbs:{
                files: [ '<%= bookr.src %>/hbs/**/*.handlebars'],
                tasks: watchTasks
            },
            css:{
                files: [ '<%= bookr.src %>/css/*.css' ],
                tasks: watchTasks
            }
        },
        clean: {
            standalone: [ '<%= bookr.dist %>' ],
            tmp: [ '<%= bookr.tmp %>' ],
            build: [ '<%= bookr.dist %>', '<%= bookr.tmp %>', '<%= bookr.release %>' ]
        },
//         eslint: {
//            target:  prefixEach(theApplicationFiles, srcPath),
//            options: {
//                config: 'eslint.json'
//            }
//         },
        cssmin: {
            dist: {
                files: {
                    '<%= bookr.dist %>/<%= pkg.name %>-<%= pkg.version %>.min.css': [
                        '<%= bookr.dist %>/<%= pkg.name %>-<%= pkg.version %>.css',
                        '<%= bookr.src %>/css/vendor/purecss/pure.css'
                    ]
                }
            }
        },

        eslint: {
            target: [
                '<%= bookr.src %>/js/**/*.js',
                '!<%= bookr.src%>/js/vendor/**/*.js',
                '!<%= bookr.src %>/js/bootstrap.js'
            ],
            options: {
                config: 'eslint.json'
            }
        },
//        concurrent: {
//            server: [
//                'emberTemplates',
//                'compass:server'
//            ],
//            test: [
//                'emberTemplates',
//                'compass'
//            ],
//            dist: [
//                'emberTemplates',
//                'compass:dist',
//                'imagemin',
//                'svgmin',
//                'htmlmin'
//            ]
//        },
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    //public/js/templates
                    var regex = new RegExp(bookrConfig.src + '/hbs/');
                    return sourceFile.replace(regex, '');
                }
            },
            dist: {
                files: {
                    '<%= bookr.tmp %>/js/templates.js': '<%= bookr.src %>/hbs/**/*.handlebars'
                }
            }
        },

        neuter: {
            app: {
                options: {
                    template: '{%= src %}'
                },
                src: '<%= bookr.tmp %>/js/bootstrap.js',
                dest: '<%= bookr.dist %>/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        preprocess: {
            options : {
                context : {
                    NAME : '<%= pkg.name %>',
                    VERSION : '<%= pkg.version %>'
                }
            },
            js: {
                src : '<%= bookr.test %>/karma.conf.raw.js',
                dest : '<%= bookr.test %>/karma.conf.js'
            },
            html: {
                src : '<%= bookr.tmp %>/html/index.raw.html',
                dest : '<%= bookr.dist %>/index.html'
            },
            app: {
                files: {
                    '<%= bookr.tmp %>/js/util/app.js': '<%= bookr.src %>/js/util/app.js',
                    '<%= bookr.tmp %>/js/util/ajax.js': '<%= bookr.src %>/js/util/ajax.js'
                }
            }
        },

        copy: {
            standalone: {
                files: [{
                    // minimized css and js
                    expand: true,
                    flatten: true,
                    src: [ '<%= bookr.dist %>/*.min.*'],
                    dest: '<%= bookr.release %>'
                },{
                    // fonts
                    expand: true,
                    flatten: true,
                    src: [ '<%= bookr.res %>/assets/fonts/*'],
                    dest: '<%= bookr.relase %>/fonts/'
                },{
                    // images
                    expand: true,
                    flatten:true,
                    src: [ '<%= bookr.res %>/assets/img/*'],
                    dest: '<%= bookr.release %>/img/'
                },{
                    // rootlevel files
                    expand: true,
                    flatten: true,
                    src: [
                        '<%= bookr.res %>/assets/favicon.ico',
                        '<%= bookr.res %>/assets/robots.txt',
                        '<%= bookr.dist %>/index.html'
                    ],
                    dest: '<%= bookr.release %>'
                }]
            },
            // copy src to tmp dir
            tmp: {
                expand: true,
                cwd: '<%= bookr.src %>/',
                src: ['**'],
                dest: '<%= bookr.tmp %>/',
                filter: 'isFile'
            },
            // copy assets to dist dir
            assets: {
                expand: true,
                cwd: '<%= bookr.res %>/assets',
                src: ['**'],
                dest: '<%= bookr.dist %>'
            }
        },

        sass: {
            dist: {
                files: {
                    '<%= bookr.dist %>/<%= pkg.name %>-<%= pkg.version %>.css': '<%= bookr.src %>/css/bootstrap.scss'
                }
            }
        },

        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            test: {
                NODE_ENV : 'TESTING'
            },
            prod : {
                NODE_ENV : 'PRODUCTION'
            }
        },

        karma: {
            test: {
                configFile: '<%= bookr.test %>/karma.conf.js',
                singleRun: true
            }
        }
    });

    // task called from other tasks
    grunt.registerTask('build', [
        'emberTemplates',
        'preprocess',
        'neuter',
        'sass',
        'cssmin'
    ]);

    // general tasks
    grunt.registerTask('default', [
        'env:prod',
        'eslint',
        'clean:tmp',
        'copy:tmp',
        'build',
        'copy:assets',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'env:dev',
        'clean:tmp',
        'copy:tmp',
        'build',
        'copy:assets',
        'watch'
    ]);

    grunt.registerTask('test', [
        'env:test',
        'clean:tmp',
        'copy:tmp',
        'build',
        'copy:assets',
        'karma'
    ]);
};
