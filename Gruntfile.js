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


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        bookr: bookrConfig,
//        watch: {
//            emberTemplates: {
//                files: '<%= bookr.src %>/hbs/**/*.handlebars',
//                tasks: ['emberTemplates']
//            },
//            neuter: {
//                files: ['<%= bookr.src %>/js/{,*/}*.js'],
//                tasks: ['neuter']
//            }
//        },
//        clean: {
//            dist: {
//                files: [{
//                    dot: true,
//                    src: [
//                        '.tmp',
//                        '<%= yeoman.dist %>/*',
//                        '!<%= yeoman.dist %>/.git*'
//                    ]
//                }]
//            },
//            server: '.tmp'
//        },
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
                    var regex = new RegExp(bookrConfig.tmp + "/hbs/");
                    return sourceFile.replace(regex, '');
                }
            },
            dist: {
                files: {
                    '<%= bookr.tmp %>': '<%= bookr.src %>/hbs/{,*/}*.hbs'
                }
            }
        },

        neuter: {
            app: {
                options: {
                    template: '{%= src %}'
                },
                src: 'src/js/bootstrap.js',
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
        'neuter',
        'emberTemplates',
        'cssmin',
        'preprocess'
    ]);

    grunt.registerTask('default', [
//        'jshint',
//        'test',
        'copy:tmp',
        'build',
        'copy:assets'
    ]);
};
