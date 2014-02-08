(function (exports) {
    'use strict';

    exports.angular.module('app.projectController', [])
        .controller('projectController', ProjectController);

    function ProjectController($scope, project) {
        console.log(project);
        $scope.project = project;
    }

}(this));