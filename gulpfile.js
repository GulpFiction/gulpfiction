var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var ngHtml2Js = require('gulp-ng-html2js');
var jshint = require('gulp-jshint');

var components = [
    'bower_components/ace-builds/src-min-noconflict/ace.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/showdown/compressed/showdown.js',
    'bower_components/angular-markdown-directive/markdown.js',
    'bower_components/ngDropbox/dropbox.js',
    'bower_components/angular-ui-ace/ui-ace.js',
    'bower_components/ace-builds/src-min-noconflict/mode-json.js',
    'lib/ngClip.js'

];

var lessComponents = [
];

gulp.task('default', ['components', 'page', 'fonts', 'images', 'src', 'less', 'views'], function () {

});

gulp.task('page', function () {
    gulp.src(['index.html', 'bower_components/ngDropbox/callback.html', 'bower_components/ace-builds/src-min-noconflict/worker-json.js'])
      .pipe(gulp.dest('build/'));
});

gulp.task('fonts', function () {
    gulp.src('fonts/*')
      .pipe(gulp.dest('build/fonts/'));
});

gulp.task('images', function () {
    gulp.src('img/dist/**/*')
      .pipe(gulp.dest('build/img/'));
});

gulp.task('components', function () {
    gulp.src(components)
        .pipe(concat('components.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('src', function () {
    gulp.src('./src/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    gulp.src(lessComponents.concat(['./less/app.less']))
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build/'));
});

gulp.task('views', function () {
    gulp.src('src/**/*.html')
        .pipe(ngHtml2Js({
            moduleName: "views"
        }))
        .pipe(concat('views.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('reload', function () {
    gulp.src('build/*')
        .pipe(livereload());
});

gulp.task('watch', ['default', 'reload'], function () {
    gulp.watch('index.html', ['page', 'reload']);
    gulp.watch('./src/**/*.js', ['src', 'reload']);
    gulp.watch('./less/**/*.less', ['less', 'reload']);
    gulp.watch('./src/**/*.html', ['views', 'reload']);
});