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

        $scope.addTask = function (position) {
            // todo
            console.log('add step at ' + position);
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