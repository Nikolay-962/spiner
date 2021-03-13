'use strict';

var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var sass = require('gulp-sass');
var browsersync = require('browser-sync');
var changed = require('gulp-changed');
var del = require('del');
var reload = browsersync.reload;

var path = {
  src: {
    html: 'src/*.html',
    styles: 'src/styles/*.scss',
    sounds: 'src/sounds/*.mp3',
    img: 'src/img/**/*.*',
    js: 'src/js/*.js'
  },
  build: {
    html: 'build/',
    styles: 'build/css/',
    sounds: 'build/sounds/',
    img: 'build/img/',
    js: 'build/js/'
  },
  watch: {
    html: 'src/**/*.html',
    styles: 'src/styles/**/*.scss',
    sounds: 'src/sounds/*.mp3',
    img: 'src/img/**/*.*',
    js: 'src/js/*.js'
  },
  base: './build'
};

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: path.base
    },
    port: 3000
  });
  done();
};

function clean() {
  return del(path.base);
};

function html() {
  return gulp
    .src(path.src.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
};

function styles() {
  return gulp
    .src(path.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.build.styles))
    .pipe(reload({ stream: true }));
};


function image() {
  return gulp
    .src(path.src.img)
    .pipe(changed(path.build.img))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
};

function js() {
  return gulp
    .src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
};


function sounds() {
  return gulp
    .src(path.src.sounds)
    .pipe(gulp.dest(path.build.sounds))
    .pipe(reload({ stream: true }));
};

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.styles], styles);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.sounds], sounds);
  gulp.watch([path.watch.img], image);
};

gulp.task('html', html);
gulp.task('styles', styles);
gulp.task('js', js);
gulp.task('sounds', sounds);
gulp.task('image', image);


gulp.task('build', gulp.series(clean, gulp.parallel(html, styles, image, js, sounds)));
gulp.task('watch', gulp.parallel(watchFiles, browserSync));
