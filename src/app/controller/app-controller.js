(function (exports) {
    'use strict';

    exports.angular.module('app.appController', [
        'gulp.gulp',
        'builder.fileBuilder'
    ]).controller('appController', AppController);

    function AppController($scope, gulp, fileBuilder) {
        $scope.projects = gulp.listProjects();

        $scope.exportProject = function (project) {
            console.log(fileBuilder.build(project));
        };
    }

}(this));