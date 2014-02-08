(function (exports) {
    'use strict';

    exports.angular.module('test', [
        'gulp.Gulp',
        'gulp.Task',
        'gulp.Step',
        'builder.fileBuilder'
    ]).factory('test', test);

    function test(Gulp, Task, Step, fileBuilder) {
        return function () {
            console.log(fileBuilder);
            console.log('tests ran');
        };
    }

}(this));