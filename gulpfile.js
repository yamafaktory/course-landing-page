var browserify  = require('browserify');
var browserSync = require('browser-sync');
var es6ify      = require('es6ify');
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var htmlmin     = require('gulp-htmlmin');
var imagemin    = require('gulp-imagemin');
var jshint      = require('gulp-jshint');
var ngAnnotate  = require('gulp-ng-annotate');
var myth        = require('gulp-myth');
var order       = require('gulp-order');
var streamify   = require('gulp-streamify');
var svgmin      = require('gulp-svgmin');
var uglify      = require('gulp-uglify');
var merge       = require('merge-stream');
var source      = require('vinyl-source-stream');

es6ify.traceurOverrides = { blockBinding : true };

var path = {
  vendors : [
    './bower_components/angular/angular.min.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './bower_components/angular-route/angular-route.min.js'
  ],
  bitmap :
    './src/images/bitmap/*',
  bootstrap :
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
  css :
    './src/css/*.css',
  html : [
    './src/html/*.html'
  ],
  js : [
    './*.js',
    './src/js/*.js'
  ],
  svg :
    './src/images/svg/*.svg'
};

var tasks = [
  'vendors',
  'compile',
  'html',
  'myth+bootstrap',
  'bitmap',
  'svgmin',
  'browser-sync',
  'watch'
];

gulp.task('browser-sync', function() {
  return browserSync({
    server : {
      baseDir : './build/',
      index   : 'html/index.html',
      notify  : false
    }
  });
});

gulp.task('compile', function () {
  return browserify({ debug : true })
    .add(es6ify.runtime)
    .transform(es6ify)
    .require(require.resolve('./src/js/app.js'), { entry : true })
    .bundle()
    .pipe(source('app.js'))
    .pipe(streamify(ngAnnotate()))
    .pipe(streamify(uglify({ mangle : false })))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({ stream : true, once : true }));
});

gulp.task('vendors', function () {
  return gulp.src(path.vendors)
    .pipe(gulp.dest('./src/js/vendors'));
});

gulp.task('html', function() {
  return gulp.src(path.html)
    .pipe(htmlmin({ collapseWhitespace : true }))
    .pipe(gulp.dest('./build/html'))
    .pipe(browserSync.reload({ stream : true }));
});

gulp.task('bitmap', function () {
  return gulp.src(path.bitmap)
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/bitmap'))
    .pipe(browserSync.reload({ stream : true }));
});

gulp.task('lint', function () {
  return gulp.src(path.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('myth+bootstrap', function () {
  var bootstrap = gulp.src(path.bootstrap)
    .pipe(gulp.dest('./build/css'));
  var css = gulp.src(path.css)
    .pipe(myth())
    .pipe(gulp.dest('./build/css'));
  return merge(bootstrap, css)
    .pipe(order([
      'myth.css',
      'bootstrap.min.css'
    ], { base : './build/css/'}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({ stream : true }));
});

gulp.task('svgmin', function () {
  return gulp.src(path.svg)
    .pipe(svgmin())
    .pipe(gulp.dest('./build/images/svg'))
    .pipe(browserSync.reload({ stream : true }));
});

gulp.task('watch', function () {
  gulp.watch(path.css, ['myth+bootstrap']);
  gulp.watch(path.html, ['html']);
  gulp.watch(path.js, ['compile']);
});

gulp.task('default', tasks);

gulp.task('test', ['lint']);
