(function (exports) {
    'use strict';
    exports.angular.module('app', ['views', 'test', 'npm.search.npmSearch'])
    .run(function (test) {
        test();
    });
}(this));