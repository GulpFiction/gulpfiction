(function (exports) {
    'use strict';

    var DEFAULT_NAME = 'Untitled Project';

    exports.angular.module('gulp.gulp', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
        'store'
    ]).factory('gulp', gulpFactory);

    function gulpFactory(Project, Task, Step, store) {
        var projects = store.loadProjects();

        return {
            listProjects: function () {
                return projects;
            },
            getProject: function (projectName) {
                return findProjectByName(projectName);
            },
            createProject: function (projectName) {
                var project = new Project({
                    name: getBlankProjectName(),
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
                });

                projects.push(project);

                store.saveProjects(projects);

                return project;
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

        function getBlankProjectName() {
            var currentName = DEFAULT_NAME, i = 0;

            if (!findProjectByName(currentName)) { return currentName; }

            do {
                currentName = DEFAULT_NAME + ' ' + i;
                i = i + 1;
            } while (findProjectByName(currentName));

            return currentName;
        }
    }

}(this));