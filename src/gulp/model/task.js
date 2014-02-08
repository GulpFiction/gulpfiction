(function (exports) {
    'use strict';

    exports.angular.module('gulp.Task', [])
        .value('Task', Task);

    function Task(data) {
        this.steps = [];
        this.preTasks = [];
        this.name = '';
        this.inputGlob = [];
        this.outputDir = '';
        this.isWatchEnabled = false;
        this.isReloadEnabled = false;
        exports.angular.extend(this, data);
    }

}(this));