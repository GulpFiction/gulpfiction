(function (exports) {
    'use strict';

    exports.angular.module('test.dropbox', [
    ]).factory('testDropbox', testDropbox);

    function testDropbox() {
        return function () {
            console.log('dropbox');
        };
    }

}(this));