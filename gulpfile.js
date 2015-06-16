// TODO: review gulp file and get working
// TODO: turn core.js into browserify module
// TODO: setup all and post js scripts
// TODO: update script and css sources on html pages
// TODO: finish updating less for mobile-first design

var fs = require('fs');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var browserify = require("browserify");
var to5ify = require("6to5ify");

var paths = {
  less: [
    'src/less/cli.less'
  ],
  js: [
    'src/js/cli.js'
  ]
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del([
    'dist/js/**/*',
    'dist/css/**/*'
  ], cb);
});

gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    // .pipe(csso())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
  return browserify({ debug: true })
    .transform(to5ify)
    .require('./src/js/cli.js', { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(fs.createWriteStream('dist/js/cli.js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['js']);
});

// NOTE: vendor icons supported but font awesome used instead
gulp.task('default', function(callback) {
  runSequence('clean', ['less', 'js', 'watch'], callback);
});
