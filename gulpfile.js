const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');

function styles() {
    return gulp
            .src('./public/stylesheets/main.less')
            .pipe(less({strictMath: true}))
            .pipe(autoprefixer({cascade: true}))
            .pipe(gulp.dest('./public/stylesheets'));
};

function watch() {
    gulp.watch('./public/stylesheets/less/**/*.less', gulp.series(styles));
};

const gulp_start = gulp.series(styles, watch);

exports.gulp_start = gulp_start;