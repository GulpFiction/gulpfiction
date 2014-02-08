(function (exports) {
    'use strict';

    exports.angular.module('gulp.Step', [])
        .value('Step', Step);

    function Step() {
        this.name = '';
        this.options = {};
    }

}(this));