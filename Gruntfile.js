module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* Minified JavaScript of <%= pkg.name %> version:<%= pkg.version %> */\n'
            },
            my_target: {
                files: {
                    'public/assets/js/app.min.js': ['public/assets/js/helpers.js', 'public/assets/js/app.js']
                }
            }
        },
        cssmin: {
            with_banner: {
                options: {
                    banner: '/* Minified CSS of <%= pkg.name %> version:<%= pkg.version %> */'
                },
                files: {
                    'public/assets/css/style.min.css': ['public/assets/css/style.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);
}