(function (exports) {
    'use strict';

    exports.angular.module('gulp.gulp', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
    ]).factory('gulp', gulpFactory);

    function gulpFactory(Project, Task, Step) {
        var projects = [];

        return {
            listProjects: function () {
                return projects;
            },
            getProject: function (projectName) {
                return findProjectByName(projectName);
            },
            createProject: function () {
                projects.push(new Project({
                    name: 'one',
                    tasks: [
                        new Task({
                            name: 'default',
                            steps: [
                                new Step({
                                    name: 'concat',
                                    options: 'tada'
                                }),
                                new Step({
                                    name: 'other',
                                    options: { 'a': 'b' }
                                })
                            ]
                        }),
                        new Task({
                            name: 'src'
                        }),
                        new Task({
                            name: 'less'
                        })
                    ]
                }));
            }
        };

        function findProjectByName(projectName) {
            var result;
            projects.forEach(function (project) {
                if (project.name === projectName) {
                    result = project;
                }
            });
            return result;
        }
    }

}(this));