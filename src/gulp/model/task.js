(function (exports) {
    'use strict';

    exports.angular.module('gulp.task', [])
        .value('Task', Task);

    function Task() {
        this.steps = [];
        this.pretasks = [];
        this.name = '';
        this.inputGlob = '';
        this.outputDir = '';
    }

}(this));