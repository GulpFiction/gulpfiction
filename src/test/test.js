(function (exports) {
    'use strict';

    exports.angular.module('test', [
        'gulp.Gulp',
        'gulp.Task',
        'gulp.Step',
    ]).value('test', test);

    function test(Gulp, Task, Step) {
        console.log('tests ran');
    }

}(this));