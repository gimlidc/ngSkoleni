var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('webserver', ['inject'], function() {
    return gulp.src(['src', 'bower_components'])
        .pipe(webserver({
            livereload: {
                enable: true
            }
        }));
});