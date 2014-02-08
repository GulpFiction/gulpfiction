(function (exports) {
    'use strict';

    exports.angular.module('app.projectController', [])
        .controller('projectController', ProjectController);

    function ProjectController($scope, project) {
        $scope.project = project;

        $scope.removeInputGlob = function (task, index) {
            task.inputGlob.splice(index, 1);
        };

        $scope.addInputGlob = function (task, name) {
            var newName = name || '';
            task.inputGlob.push({path: newName});
        };

        $scope.addTask = function(position) {
            // todo
            console.log('add step at ' + position)
        }
    }

}(this));