(function (exports) {
    'use strict';

    var PROJECT_LIST_KEY = 'projects', PROJECT_PREFIX = 'PR_';
    // @TODO: localStorage other tab? - when deleted?
    // @TODO: localStorage size exceeded?
    // @TODO: localStorage add try catch
    // @TODO: also use dropbox / use promises?
    exports.angular.module('store', ['localStorage'])
        .factory('store', function (localStorage) {

            var projectIds = localStorage.get(PROJECT_LIST_KEY);
            // if projects are corrupted, reset localStorage
            if (!projectIds || !projectIds.length) {
                localStorage.reset();
            }

            var store = {
                loadProjects: function () {
                    var projectIds = localStorage.get(PROJECT_LIST_KEY) || [];
                    return projectIds.map(store.loadProjectById).filter(function (res) { return res; });
                },
                loadProjectById: function (projectId) {
                    return localStorage.get(PROJECT_PREFIX + projectId);
                },
                saveProjects: function (projects) {
                    var projectIds = projects.map(function (project) {
                        return project.id;
                    });
                    localStorage.set(PROJECT_LIST_KEY, projectIds);
                    projects.forEach(this.saveProject);
                },
                saveProject: function (project) {
                    if (!project) { return; }
                    var saveCopy = exports.angular.copy(project);
                    localStorage.set(PROJECT_PREFIX + project.id, saveCopy);
                },
                removeProject: function (project) {
                    localStorage.rm(PROJECT_PREFIX + project.id);
                    var projectIds = localStorage.get(PROJECT_LIST_KEY) || [];
                    var saveIds = [];
                    projectIds.forEach(function (id) {
                        if (id !== project.id) {
                            saveIds.push(id);
                        }
                    });
                    localStorage.set(PROJECT_LIST_KEY, saveIds);
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