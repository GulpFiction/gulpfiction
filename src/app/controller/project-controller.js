(function (exports) {
    'use strict';

    exports.angular.module('app.projectController', [])
        .controller('projectController', ProjectController);

    function ProjectController($scope, project, store) {
        $scope.project = project;

        $scope.removeInputGlob = function (task, index) {
            task.inputGlob.splice(index, 1);
        };

        $scope.addInputGlob = function (task, name) {
            var newName = name || '';
            task.inputGlob.push({path: newName});
        };

        $scope.addStep = function (task, position) {
            task.steps.splice(position, 0, { name: 'new step', justAdded: true });
        };

        $scope.removeStep = function (task, position) {
            task.steps.splice(position, 1);
        };

        // debounce?
        var unregisterProjectWatch = $scope.$watch('project', function () {
            store.saveProject($scope.project);
        }, true);

        $scope.$on('$destroy', function () {
            unregisterProjectWatch();
        });
    }

}(this));