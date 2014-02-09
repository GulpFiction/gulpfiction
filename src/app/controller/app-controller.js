(function (exports) {
    'use strict';

    var DROPBOX_KEY = 'dropbox_credentials';

    exports.angular.module('app.appController', [
        'gulp.gulp',
        'builder.fileBuilder',
        'ngAnimate',
        'localStorage'
    ]).controller('appController', AppController);

    function AppController($scope, gulp, fileBuilder, $location, $rootScope, Dropbox, localStorage) {

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
        };

        $scope.removeProject = function () {
            gulp.removeProject($rootScope.project);
            $location.path('/');
        };

        $scope.confirmDeleteProject = function () {
            $scope.confirmDeleteProjectActive = true;
        };

        $scope.connectDb = function () {
            window.Dropbox = Dropbox;
            var dropboxCredentials = localStorage.get(DROPBOX_KEY);

            if (!dropboxCredentials) {
                Dropbox.authenticate().then(function (response) {
                    // @TODO: store response.access_token in localstorage

                    $scope.isDropboxAuthenticated = true;
                    Dropbox.accountInfo().then(function (data) {
                        console.log(data);
                        $scope.dbAccountInfo = data;
                        localStorage.set(DROPBOX_KEY, { token: response.access_token, uid: data.uid });
                    });
                });
            } else {
                Dropbox.setCredentials({
                    access_token: dropboxCredentials.token,
                    token_type: 'bearer',
                    uid: dropboxCredentials.uid
                });

                Dropbox.accountInfo().then(function (data) {
                    $scope.isDropboxAuthenticated = true;
                    $scope.dbAccountInfo = data;
                }, function (error) {
                    Dropbox.authenticate().then(function (response) {
                        // @TODO: store response.access_token in localstorage
                        console.log(response.access_token);
                        localStorage.set(DROPBOX_KEY, response.access_token);
                        $scope.isDropboxAuthenticated = true;
                        Dropbox.accountInfo().then(function (data) {
                            $scope.dbAccountInfo = data;
                            localStorage.set(DROPBOX_KEY, { token: response.access_token, uid: data.uid });
                        });
                    });
                });
            }

        };

        $scope.exportProjectToDropbox = function (project) {
            if (Dropbox.isAuthenticated()) {
                console.log('write to DB');
                var file = fileBuilder.build(project);
                Dropbox.writeFile(project.name + '.js', file, {mime_type: 'application/javascript'});
            }
        };

        $scope.exportProject = function (project) {
            $scope.currentExportContent = fileBuilder.build(project);
            $scope.showsExport = true;
        };
    }

}(this));