(function (exports) {
    'use strict';

    var DROPBOX_KEY = 'dropbox_credentials';

    exports.angular.module('app.appController', [
        'gulp.gulp',
        'builder.fileBuilder',
        'ngAnimate',
        'localStorage'
    ]).controller('appController', AppController);

    function AppController($scope, gulp, fileBuilder, $location, $rootScope, Dropbox, localStorage, $timeout) {

        // window.Dropbox = Dropbox;
        // init dropbox account, if stored
        var dropboxCredentials = localStorage.get(DROPBOX_KEY);
        if (dropboxCredentials) {
            getDropboxAccountInfo(dropboxCredentials.token, dropboxCredentials.uid);
        }


        $scope.projects = gulp.listProjects();

        $scope.toggleHelp = function () {
            $scope.showsHelp = !$scope.showsHelp;
        };

        $scope.showTeaser = function () {
            $scope.showsTeaser = true;
        };

        $scope.switchToProject = function (project) {
            $rootScope.project = project;
            $location.path('/' + encodeURI(project.name));
        };

        $scope.addProject = function () {
            var project = gulp.createProject();
            $location.path('/' + encodeURI(project.name));
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
                Dropbox.writeFile(project.name + '.js', file, {mime_type: 'application/javascript'})
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

        $scope.exportProject = function (project) {
            $scope.currentExportContent = fileBuilder.build(project);
            $scope.showsExport = true;
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
    }

}(this));