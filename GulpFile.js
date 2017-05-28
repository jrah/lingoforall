var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var rename      = require('gulp-rename');
// sass
var sass        = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// js
var pump = require('pump');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
// images
var imagemin = require('gulp-imagemin');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./",
        open: false
    });

    gulp.watch("src/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
     gulp.src("src/scss/*.scss")
         .pipe(sass({
           includePaths: [
            './bower_components/mathsass/dist/',
            './bower_components/tachyons-sass/',
            './bower_components/'
         ]
       }))
       .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
       .pipe(sass().on('error', sass.logError))
       .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('copy-build', function() {
        gulp.src('*.html')
        .pipe(gulp.dest('dist'))
        gulp.src(['images/*.svg', 'images/*.jpg'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('sass-build', function() {
     gulp.src("src/scss/*.scss")
         .pipe(sass({
           includePaths: [
            './bower_components/mathsass/dist/',
            './bower_components/madsauce/',
            './bower_components/'
         ]
       }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('sass-min', function() {
     gulp.src("src/scss/*.scss")
         .pipe(sass({
           includePaths: [
            './bower_components/mathsass/dist/',
            './bower_components/madsauce/',
            './bower_components/'
         ]
       }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('js-build', function () {
  // pump helps locate errors better than `pipe`
  pump([
    gulp.src('js/*.js'),
    uglify(),
    concat('app.js'),
    gulp.dest('dist/js')
  ])
});

gulp.task('default', ['serve']);
gulp.task('build', ['js-build', 'copy-build', 'sass-build', 'sass-min']);
