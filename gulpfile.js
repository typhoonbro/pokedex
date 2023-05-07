'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { watch } = require('gulp');

function buildStyles() {
return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
};

exports.default = function () {
  watch('./src/sass/*.scss', buildStyles);
};