(function (exports) {
    'use strict';

    exports.angular.module('gulp.gulp', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
    ]).factory('gulp', gulpFactory);

    function gulpFactory(Project, Task, Step) {

        var projectOne = new Project();
        var projectTwo = new Project();
        projectOne.name = 'one';
        projectTwo.name = 'two';
        var dummyProjects = [projectOne, projectTwo];

        return {
            listProjects: function () {
                return dummyProjects;
            }
        };
    }

}(this));