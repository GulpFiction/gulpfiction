(function (exports) {
    'use strict';

    exports.angular.module('app.appController', [
        'gulp.gulp',
        'builder.fileBuilder',
        'ngAnimate'
    ]).controller('appController', AppController);

    function AppController($scope, gulp, fileBuilder, $location, $rootScope, Dropbox) {

        $scope.projects = gulp.listProjects();

        $scope.showHelp = function () {
            $scope.showsHelp = true;
        };

        $scope.hideHelp = function () {
            $scope.showsHelp = false;
        };

        $scope.showTeaser = function () {
            $scope.showsTeaser = true;
        };

        $scope.switchToProject = function (project) {
            $rootScope.project = project;
            $location.path('/' + encodeURI(project.name));
        };

        $scope.exportProject = function (project) {
            console.log(fileBuilder.build(project));
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

            Dropbox.authenticate().then(function (response) {
                // @TODO: store response.access_token in localstorage

                Dropbox.accountInfo().then(function (data) {
                    $scope.dbAccountInfo = data;
                });
            });
        };

        $scope.exportProject = function (project) {
            if (Dropbox.isAuthenticated()) {
                console.log('write to DB');
                var file = fileBuilder.build(project);
                Dropbox.writeFile(project.name + '.js', file, {mime_type: 'application/javascript'});
            }
            $scope.currentExportContent = fileBuilder.build(project);
            $scope.showsExport = true;
        };
    }

}(this));