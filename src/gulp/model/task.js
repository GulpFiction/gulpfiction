(function (exports) {
    'use strict';

    exports.angular.module('gulp.Task', [])
        .factory('Task', function (uuid4) {

            function Task(data) {
                this.id = uuid4.generate();
                this.steps = [];
                this.preTasks = {};
                this.name = '';
                this.inputGlob = [{path: ''}];
                this.outputDir = '';
                this.isWatchEnabled = false;
                this.isReloadEnabled = false;
                exports.angular.extend(this, data);
            }

            return Task;
        });

}(this));
