

module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'public/bower.js'
            }
        },
        
        concat: {
            all: {
                src: ['public/bower.js', 'public/app.js'],
                dest: 'public/all.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-bower-concat');

    // Default task
    grunt.registerTask('default', ['bower_concat', 'concat:all']);
};

