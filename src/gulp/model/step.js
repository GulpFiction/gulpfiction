(function (exports) {
    'use strict';

    exports.angular.module('gulp.Step', [])
        .value('Step', Step);

    function Step(data) {
        this.name = '';
        this.options = {};
        exports.angular.extend(this, data);
    }

}(this));