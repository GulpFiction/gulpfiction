(function (exports) {
    'use strict';

    var DEFAULT_NAME = 'Untitled Project';

    exports.angular.module('gulp.gulp', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
        'store'
    ]).factory('gulp', gulpFactory).value('getBlankProjectNameWithProjects', getBlankProjectNameWithProjects);

    function gulpFactory(Project, Task, Step, store, $location, $rootScope) {
        var projects = store.loadProjects();

        var gulp = {
            listProjects: function () {
                return projects;
            },
            getProject: function (projectId) {
                return findProjectById(projectId);
            },
            removeProject: function (project) {
                var projectId = project.id, matchedIndex;
                projects.forEach(function (project, index) {
                    if (!matchedIndex && project.id === projectId) {
                        store.removeProject(project);
                        matchedIndex = index;
                    }
                });
                projects.splice(matchedIndex, 1);
                return project;
            },
            createProject: function (projectName) {
                var project = new Project({
                    name: getBlankProjectName(),
                    tasks: [
                        new Task({
                            name: 'default',
                            outputDir: './build/',
                            inputGlob: [{path: './src/**/*.js'}, {path: './lib/**/*.js'}],
                            steps: [
                                new Step({
                                    name: 'gulp-concat',
                                    options: '"all.js"',
                                    author: 'fractal',
                                    homepage: 'http://github.com/wearefractal/gulp-concat',
                                    description: 'Concatenates files',
                                    version: '2.1.7',
                                    readme: "![status](https://secure.travis-ci.org/wearefractal/gulp-concat.png?branch=master)\n\n## Information\n\n<table>\n<tr> \n<td>Package</td><td>gulp-concat</td>\n</tr>\n<tr>\n<td>Description</td>\n<td>Concatenates files</td>\n</tr>\n<tr>\n<td>Node Version</td>\n<td>>= 0.4</td>\n</tr>\n</table>\n\n## Usage\n\n```javascript\nvar concat = require('gulp-concat');\n\ngulp.task('scripts', function() {\n gulp.src('./lib/*.js')\n .pipe(concat(\"all.js\"))\n .pipe(gulp.dest('./dist/'))\n});\n```\n\nThis will concat files by your operating systems newLine. It will take the base directory from the first file that passes through it.\n\nTo change the newLine simply pass an object as the second argument to concat with newLine being whatever (\\r\\n if you want to support any OS to look at it)\n\n## LICENSE\n\n(MIT License)\n\nCopyright (c) 2013 Fractal <contact@wearefractal.com>\n\nPermission is hereby granted, free of charge, to any person obtaining\na copy of this software and associated documentation files (the\n\"Software\"), to deal in the Software without restriction, including\nwithout limitation the rights to use, copy, modify, merge, publish,\ndistribute, sublicense, and/or sell copies of the Software, and to\npermit persons to whom the Software is furnished to do so, subject to\nthe following conditions:\n\nThe above copyright notice and this permission notice shall be\nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\nNONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE\nLIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION\nOF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION\nWITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n"
                                })
                            ]
                        })
                    ]
                });

                projects.push(project);

                store.saveProjects(projects);

                return project;
            }
        };

        function findProjectById(projectId) {
            var result;
            projects.forEach(function (project) {
                if (project.id === projectId) {
                    result = project;
                }
            });
            return result;
        }

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

        return gulp;
    }

    function findProjectByNameWithProjects(projectName, projects) {
        var result;
        projects.forEach(function (project) {
            if (project.name === projectName) {
                result = project;
            }
        });
        return result;
    }

    function getBlankProjectNameWithProjects(projects) {
        var currentName = DEFAULT_NAME, i = 0;

        if (!findProjectByNameWithProjects(currentName, projects)) { return currentName; }

        do {
            currentName = DEFAULT_NAME + ' ' + i;
            i = i + 1;
        } while (findProjectByNameWithProjects(currentName, projects));

        return currentName;
    }

}(this));