(function (exports) {
    'use strict';

    exports.angular.module('gulp.Gulp', [])
        .value('Gulp', Gulp);

    function Gulp() {
        this.tasks = [];
        this.name = '';
    }

}(this));