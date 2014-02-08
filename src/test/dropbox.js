(function (exports) {
    'use strict';

    exports.angular.module('test.dropbox', [
    ]).factory('testDropbox', testDropbox);

    function testDropbox(Gulp, Task, Step, fileBuilder) {
        return function () {
            console.log('dropbox');
        };
    }

}(this));