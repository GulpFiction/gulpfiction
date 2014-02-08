(function (exports) {
    'use strict';

    exports.angular.module('gulp.Project', [])
        .value('Project', Project);

    function Project(data) {
        this.id = createId();
        this.tasks = [];
        this.name = '';
        exports.angular.extend(this, data);
    }

    function createId() {
        return Date.now();
    }

}(this));