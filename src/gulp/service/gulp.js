(function (exports) {
    'use strict';

    exports.angular.module('gulp.gulp', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
    ]).factory('gulp', gulpFactory);

    function gulpFactory(Project, Task, Step) {

        var dummyProjects = [new Project({name: 'one'}), new Project({name: 'two'})];

        return {
            listProjects: function () {
                return dummyProjects;
            }
        };
    }

}(this));