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
        tmp: 'build/tmp',
        dist: 'build/dist',
        src: 'src',
        res: 'build/res',
        release: 'build/release'
    };

    // helper methods
    var prefixEach = function(array, prefix){
        var newArray = [];
        for(var itemIndex = 0, max = array.length; itemIndex < max; itemIndex++){
            newArray[itemIndex] = prefix + array[itemIndex];
        }
        return newArray;
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
                        '<%= bookr.tmp %>/css/*.css'
                    ]
                }
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
                    var regex = new RegExp(bookrConfig.src + "/hbs/");
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
            html: {
                src : '<%= bookr.tmp %>/html/index.raw.html',
                dest : '<%= bookr.dist %>/index.html'
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
        }
    });

//    grunt.registerTask('dev', [
//        'clean:server',
//        'concurrent:test',
//        'connect:test',
//        'neuter:app',
//        'mocha'
//    ]);
//
//    grunt.registerTask('test', [
//        'clean:server',
//        'concurrent:test',
//        'connect:test',
//        'neuter:app',
//        'mocha'
//    ]);

    grunt.registerTask('build', [
        'emberTemplates',
        'neuter',
        'cssmin',
        'preprocess'
    ]);

    grunt.registerTask('default', [
//        'jshint',
//        'test',
        'clean:tmp',
        'copy:tmp',
        'build',
        'copy:assets',
        'watch'
    ]);
};
