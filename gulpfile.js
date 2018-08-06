'use strict'
const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const less = require('gulp-less');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
var uglify = require("gulp-uglify");

gulp.task('clean', () => {
    return del([
        './lib/**/**'
    ]);
});

gulp.task('watch', function() {
    gulp.watch('./src/**');
})

gulp.task('copy', function () {
  return gulp.src([
    './src/**/*',
    '!./src/**/*.js',
    '!./src/**/*.jsx',
    '!./src/**/*.less',
    '!./src/**/*.scss',
    '!./src/**/*.sass',
    '!./src/**/*.css',
    ]).pipe(gulp.dest('./lib/'));
});

gulp.task('babel', function () {
  return gulp.src(['src/**.js',  'src/**/*.js', 'src/**.jsx', 'src/**/*.jsx'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('lib'));
});

//if js import less, need replace .less to .css in lib js
gulp.task('replace', ['babel'], function () {
  return gulp.src(['lib/index.js'])
  .pipe(replace(/.less/g, '.css'))
  .pipe(gulp.dest('lib'));
})


gulp.task('less', function () {
  return gulp.src(['src/**/*.less'])
  .pipe(less())
  .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
  .pipe(gulp.dest('lib'))
})


// gulp.task('compile', ['copy', 'less', 'babel']);
gulp.task('compile', ['copy', 'less', 'replace']);

gulp.task('default', ['clean'], function () {
  gulp.start('compile');
});
