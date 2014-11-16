var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    filesize = require('gulp-filesize'),
    gutil = require('gulp-util');
    
var delay = function(fn, time) {
    return function() {
        setTimeout(fn, time);
    };
};

gulp.task('lucid-run', function() {
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['lucid/*'],
        env: {
            PORT: '3000'
        }
    });
});

gulp.task('less', function() {
   gulp.src(['lucid/resources/less/index.less'])
    .pipe(less())
    .pipe(gulp.dest('lucid/dist/'));
    
   gulp.src(['lucid/resources/less/404.less'])
    .pipe(less())
    .pipe(gulp.dest('lucid/dist/'));
    
    gulp.src(['lucid/resources/less/troll.less'])
    .pipe(less())
    .pipe(gulp.dest('lucid/dist/'));
});

gulp.task('html', function() {
   return gulp.src(['lucid/resources/html/*.html'])
        .pipe(gulp.dest('lucid/dist/pages'));
});

gulp.task('js', function() {  
  return gulp.src('lucid/resources/js/*.js')
    .pipe(concat('lucid.js'))
    .pipe(gulp.dest('lucid/dist/js'))
    .pipe(filesize())
    .pipe(uglify())
    .pipe(rename('lucid.min.js'))
    .pipe(gulp.dest('lucid/dist/js'))
    .pipe(filesize())
    .on('error', gutil.log)
});


gulp.task('watch', ['lucid-run'], function() {
    livereload.listen();
    gulp.watch('lucid/resources/js/*.js', ['js']).on('change', livereload.changed);
    gulp.watch('lucid/resources/less/*.less', ['less']).on('change', livereload.changed);
    gulp.watch('lucid/resources/html/*.html', ['html']).on('change', livereload.changed);
});

gulp.task('package', ['html', 'js', 'less']);
gulp.task('default', ['watch']);


    

    
                   
                