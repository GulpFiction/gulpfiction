(function (exports) {
    'use strict';

    var PROJECT_LIST_KEY = 'projects', PROJECT_PREFIX = 'PR_';

    exports.angular.module('store', ['localStorage'])
        .factory('store', function (localStorage) {
            return {
                loadProjects: function () {
                    var projectNames = localStorage.get(PROJECT_LIST_KEY);

                    if (!projectNames || !projectNames.length) { return []; }

                    return projectNames.map(function (projectName) {
                        return localStorage.get(PROJECT_PREFIX + projectName);
                    }).filter(function (res) { return res; });
                },
                saveProjects: function (projects) {
                    var projectNames = projects.map(function (project) {
                        return normalizeName(project.name);
                    });

                    localStorage.set(PROJECT_LIST_KEY, projectNames);

                    projects.forEach(function (project) {
                        var saveCopy = exports.angular.copy(project);
                        localStorage.set(PROJECT_PREFIX + project.name, saveCopy);
                    });
                }
            };
        });

    function normalizeName(name) {
        // no more then 50 chars
        return name.substr(0, 50);
    }

}(this));