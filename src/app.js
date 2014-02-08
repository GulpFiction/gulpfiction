(function (exports) {
    'use strict';
    exports.angular.module('app', ['views', 'test'])
    .run(function (test) {
        test();
    });
}(this));