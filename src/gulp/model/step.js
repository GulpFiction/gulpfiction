(function (exports) {
    'use strict';

    exports.angular.module('gulp.step', [])
        .value('Step', Step);

    function Step() {
        this.name = '';
        this.options = {};
    }

}(this));