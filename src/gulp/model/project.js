(function (exports) {
    'use strict';

    exports.angular.module('gulp.Project', [])
        .value('Project', Project);

    function Project() {
        this.tasks = [];
        this.name = '';
    }

}(this));