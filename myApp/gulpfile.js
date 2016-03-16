/**
 * Created by Younes on 10/03/2016.
 */

'use strict';

var rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge-stream'),
    gulp = require('gulp');




var paths = {
    vendorsScss: 'assets/scss/vendors/**/*.scss',
    scripts: 'assets/js/**/*.js',
    scss: ['assets/scss/**/*.scss', '!assets/scss/vendors/**.scss' ]
};

gulp.task('scss', function () {

    var scss = gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
    var vendors = gulp.src(paths.vendorsScss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/vendors'))
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css/vendors'));

    return merge(vendors, scss);

});

gulp.task('scripts', function(){
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(minify())
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch([paths.scss, paths.vendorsScss], ['scss']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);