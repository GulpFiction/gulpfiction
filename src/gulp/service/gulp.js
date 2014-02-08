(function (exports) {
    'use strict';

    exports.angular.module('gulp.gulp', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
    ]).factory('gulp', gulpFactory);

    function gulpFactory(Project, Task, Step) {
        var projects = []

        // dummy data
        var projects = [new Project({name: 'one'}), new Project({name: 'two'})];

        return {
            listProjects: function () {
                return projects;
            },
            createProject: function () {
                projects.push(new Project({
                    name: 'Unknown',
                    tasks: [
                        new Task({
                            name: 'default'
                        })
                    ]
                }))
            }
        };
    }

}(this));