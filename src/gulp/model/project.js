(function (exports) {
    'use strict';

    exports.angular.module('gulp.Project', [])
        .factory('Project', function (uuid4) {
            return Project;

            function Project(data) {
                this.id = uuid4.generate();
                this.tasks = [];
                this.name = '';
                exports.angular.extend(this, data);
            }
        });

}(this));