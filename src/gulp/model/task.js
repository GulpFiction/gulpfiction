(function (exports) {
    'use strict';

    exports.angular.module('gulp.Task', [])
        .value('Task', Task);

    function Task() {
        this.steps = [];
        this.preTasks = [];
        this.name = '';
        this.inputGlob = '';
        this.outputDir = '';
    }

}(this));