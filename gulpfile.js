const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();

// Convert the main stylesheet .less into .css
// NOTE: We're using Gulp 3 syntax (gulp.task instead of functions)
// because we can't use Gulp 4 syntax in nodemon
gulp.task('styles', done => {
    gulp
        .src('./public/stylesheets/main.less')
        .pipe(less({strictMath: true}))
        .pipe(autoprefixer({cascade: true}))
        .pipe(gulp.dest('./public/stylesheets'));
    done();
});

// Nodemon configuration
function server(done) {
    let isStarted = false; // Needed to track the task execution
                           // to prevent multiple browser-sync servers
    nodemon({
        script: 'bin/www',
        watch: ['./public/stylesheets/less/**/', './views/**/', './public/javascript/*'],
        ext: '.less .pug .js',
        tasks: ['styles'],
        done: done
    })
    // Nodemon will execute code below every start
    .on('start', () => {
        // Start browser-sync with the server only once
        if (!isStarted) {
            browserSync.init({
                proxy: 'http://localhost:3000',
                port: 4000,
            });
            done();
            isStarted = true;
        };
        // Refresh browser
        browserSync.reload();
    });
};

const gulp_start = gulp.series(server);

exports.gulp_start = gulp_start;