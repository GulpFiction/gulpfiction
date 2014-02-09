 (function (exports) {
    'use strict';

    var DROPBOX_KEY = 'dropbox_credentials';
    var NOT_VIRGIN_KEY = 'not_virgin';

    exports.angular.module('app.appController', [
        'gulp.gulp',
        'builder.fileBuilder',
        'ngAnimate',
        'localStorage',
        'app.stepOptions'
    ]).controller('appController', AppController);

    function AppController($scope, gulp, fileBuilder, $location, $rootScope, Dropbox, localStorage, $timeout) {

        var isNotVirgin = localStorage.get(NOT_VIRGIN_KEY);
        if (!isNotVirgin) {
            $scope.showsTeaser = true;
        }

        // ensure correct task names on blur!!!
        exports.$('body').on('focusout', '.task h3 input', function (ev) {
            console.log()
            var el = angular.element(this);
            var task = el.scope().task;
            task.name = ensureCorrectTaskName(task.name) || createTaskName();
            if (!$rootScope.$$phase) { $rootScope.$apply(); }
        });

        // init dropbox account, if stored
        var dropboxCredentials = localStorage.get(DROPBOX_KEY);
        if (dropboxCredentials) {
            getDropboxAccountInfo(dropboxCredentials.token, dropboxCredentials.uid);
        }

        $scope.projects = gulp.listProjects();

        $scope.toggleHelp = function () {
            $scope.showsHelp = !$scope.showsHelp;
        };

        $scope.closeTeaser = function () {
            $scope.showsTeaser = false;
            localStorage.set(NOT_VIRGIN_KEY, true);
        };

        $scope.switchToProject = function (project) {
            $rootScope.project = project;
            $location.path('/' + project.id);
        };

        $scope.addProject = function () {
            var project = gulp.createProject();
            $location.path('/' + project.id);
            if (exports.document.querySelector) {
                $timeout(function () {
                    exports.document.querySelector('menu li').classList.add('is-focused');
                    exports.document.querySelector('menu input').focus();
                });
            }
        };

        $scope.removeProject = function () {
            gulp.removeProject($rootScope.project);
            $location.path('/');
        };

        $scope.confirmDeleteProject = function () {
            $scope.confirmDeleteProjectActive = true;
        };

        $scope.connectDb = function () {
            if (!dropboxCredentials) {
                getAndStoreDropboxAccess();
            } else {
                getDropboxAccountInfo(dropboxCredentials.token, dropboxCredentials.uid);
            }
        };

        $scope.logoutDropbox = function () {
            clearAndLogoutDropbox();
        };

        $scope.exportProjectToDropbox = function (project) {
            $scope.showExportProgress = false;
            $scope.showExportDone = false;
            if (Dropbox.isAuthenticated()) {
                var file = fileBuilder.build(project);
                $scope.showExportProgress = true;
                Dropbox.writeFile(project.id + '.js', file, {mime_type: 'application/javascript'})
                    .then(function (response) {
                        $scope.showExportProgress = false;
                        $scope.showExportDone = true;
                        $timeout(function () {
                            $scope.showExportDone = false;
                        }, 4000);
                    });
            } else {
                getAndStoreDropboxAccess();
            }
        };

        $scope.openExportProject = function (project) {
            $scope.currentExportContent = fileBuilder.build(project);
            $scope.showsExport = true;
        };

        $scope.openExportToDropbox = function (project) {
            $scope.currentExportContent = fileBuilder.build(project);
            $scope.showsDropboxExport = true;
        };


        function getDropboxAccountInfo(token, uid) {
            Dropbox.setCredentials({
                access_token: token,
                token_type: 'bearer',
                uid: uid
            });

            Dropbox.accountInfo().then(function (data) {
                $scope.isDropboxAuthenticated = true;
                $scope.dbAccountInfo = data;
            }, function (error) {
                getAndStoreDropboxAccess();
            });
        }

        function getAndStoreDropboxAccess() {
            Dropbox.authenticate().then(function (response) {
                Dropbox.accountInfo().then(function (data) {
                    $scope.isDropboxAuthenticated = true;
                    $scope.dbAccountInfo = data;
                    localStorage.set(DROPBOX_KEY, { token: response.access_token, uid: data.uid });
                });
            });
        }

        function clearAndLogoutDropbox() {
            localStorage.rm(DROPBOX_KEY);
            dropboxCredentials = null;
            $scope.isDropboxAuthenticated = false;
            $scope.showExportDone = false;
            $scope.dbAccountInfo = null;
        }

        function createTaskName() {
            var DEFAULT = 'task';
            var currentName = DEFAULT, i = 0;

            if (!findTasksWithName(currentName)) { return currentName; }

            do {
                currentName = DEFAULT + '' + i;
                i = i + 1;
            } while (findTasksWithName(currentName));

            return currentName;

            function findTasksWithName(name) {
                var found = false;
                $scope.project.tasks.forEach(function (task) {
                    if (task.name === name) { found = true; }
                });
                return found;
            }
        }

        function ensureCorrectTaskName(name) {
            var correctName = '';

            correctName = name.replace(/[^a-zA-Z0-9-_]/, '');

            return correctName;
        }
    }

}(this));