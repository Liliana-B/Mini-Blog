module.exports = function (grunt) {
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
// Copy web assets from bower_components to more convenient directories.
copy: {
main: {
files: [
// Vendor scripts.
{
expand: true,
cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
src: ['**/*.js'],
dest: 'js/'
},
{
expand: true,
cwd: 'bower_components/jquery/dist/',
src: ['**/*.js', '**/*.map'],
dest: 'js/'
},
// Fonts.
{
expand: true,
filter: 'isFile',
flatten: true,
cwd: 'bower_components/',
src: ['bootstrap-sass/assets/fonts/**'],
dest: 'fonts/'
},
// Stylesheets
{
expand: true,
cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
src: ['**/*.scss'],
dest: 'sass/'
}
]
},
},
// Compile SASS files into minified CSS.
sass: {
options: {
includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
},
dist: {
options: {
outputStyle: 'expanded'
},
files: {
'css/core.css': 'sass/core.scss'
}
}
},
// Watch these files and notify of changes.
watch: {
grunt: { files: ['Gruntfile.js'] },
sass: {
files: [
'sass/**/*.scss'
],
tasks: ['sass']
}
},
  uglify: { 
    my_target : { 
      options : { 
        sourceMap : true, 
        sourceMapName : 'js/sourceMap.map'
      }, 
      files : { 
        'js/core.min.js' : ['js/jquery-1.12.4.min.js', 'js/bootstrap.min.js', 'js/jquery.easing.min.js', 'js/jquery.countdown.min.js', 'js/device.min.js', 'js/form.min.js', 'js/jquery.placeholder.min.js', 'js/jquery.shuffle.min.js', 'js/jquery.parallax.min.js', 'js/jquery.circle-progress.min.js', 'js/jquery.swipebox.min.js', 'js/smoothscroll.min.js', 'js/wow.min.js', 'js/jquery.smartmenus.js', 'js/universal.js'] 
      } 
    } 
  },
  cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'css/',
      src: ['*.css', '!*.min.css'],
      dest: 'css/',
      ext: '.min.css'
    }]
  }
}  
});
// Load externally defined tasks.
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
// Establish tasks we can run from the terminal.
grunt.registerTask('build', ['sass']);
grunt.registerTask('default', ['build', 'watch']);
}