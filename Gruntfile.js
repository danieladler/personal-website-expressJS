module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      sass: {
        files: 'lib/SASS/*.scss',
        tasks: ['sass']
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        files: [{
           expand: true,
           cwd: 'lib/SASS',
           src: ['*.scss'],
           dest: 'public/stylesheets',
           ext: '.css'
         }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass','watch']);
}
