(function (exports) {
    'use strict';

    var PROJECT_LIST_KEY = 'projects', PROJECT_PREFIX = 'PR_';
    // @TODO: localStorage other tab? - when deleted?
    // @TODO: localStorage size exceeded?
    // @TODO: localStorage add try catch
    // @TODO: also use dropbox / use promises?
    exports.angular.module('store', ['localStorage'])
        .factory('store', function (localStorage) {

            var projectNames = localStorage.get(PROJECT_LIST_KEY);
            // if projects are corrupted, reset localStorage
            if (!projectNames || !projectNames.length) {
                localStorage.reset();
            }

            var store = {
                loadProjects: function () {
                    var projectNames = localStorage.get(PROJECT_LIST_KEY) || [];
                    return projectNames.map(store.loadProject).filter(function (res) { return res; });
                },
                loadProject: function (projectName) {
                    return localStorage.get(PROJECT_PREFIX + projectName);
                },
                saveProjects: function (projects) {
                    var projectNames = projects.map(function (project) {
                        return normalizeName(project.name);
                    });
                    localStorage.set(PROJECT_LIST_KEY, projectNames);
                    projects.forEach(this.saveProject);
                },
                saveProject: function (project) {
                    if (!project) { return; }
                    var saveCopy = exports.angular.copy(project);
                    localStorage.set(PROJECT_PREFIX + project.name, saveCopy);
                },
                removeProject: function (project) {
                    localStorage.rm(PROJECT_PREFIX + project.name);
                    var projectNames = localStorage.get(PROJECT_LIST_KEY) || [];
                    var saveNames = [];
                    projectNames.forEach(function (name) {
                        if (name !== normalizeName(project.name)) {
                            saveNames.push(name);
                        }
                    });
                    localStorage.set(PROJECT_LIST_KEY, saveNames);
                },
                onChange: function (listenerFn) {
                    localStorage.onChange(listenerFn);
                }
            };

            return store;
        });

    function normalizeName(name) {
        // no more then 50 chars
        return name.substr(0, 50);
    }

}(this));