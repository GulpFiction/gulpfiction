var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var less = require('gulp-less');
var livereload = require('gulp-livereload');

var components = [
    'bower_components/angular/angular.js'
];

gulp.task('default', ['page', 'src', 'less'], function () {

});

gulp.task('page', function () {
    gulp.src('index.html')
      .pipe(gulp.dest('build/'));
});

gulp.task('src', function () {
    gulp.src(components.concat(['./src/**/*.js']))
        .pipe(concat("app.js"))
        .pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    gulp.src('./less/**/*.less')
        .pipe(less())
        .pipe(concat("app.css"))
        .pipe(gulp.dest('build/'));
});

gulp.task('reload', function () {
    gulp.src('build/*')
        .pipe(livereload());
})

gulp.task('watch', ['reload'], function () {
    gulp.watch('index.html', ['page', 'reload']);
    gulp.watch('./src/**/*.js', ['src', 'reload']);
    gulp.watch('./less/**/*.less', ['less', 'reload']);
});