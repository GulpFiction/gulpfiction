(function (exports) {
    'use strict';

    exports.angular.module('app.appController', [
        'gulp.gulp'
    ]).controller('appController', AppController);

    function AppController($scope, gulp) {
        $scope.projects = gulp.listProjects();
    }

}(this));