(function (exports) {
    'use strict';

    exports.angular.module('app.projectController', [
        'gulp.Step',
        'gulp.Task',
        'npm.search.npmPackage'
    ]).controller('projectController', ProjectController);

    function ProjectController($scope, $timeout, project, store, Step, Task, NpmPackage) {
        $scope.project = project;

        $scope.removeInputGlob = function (task, index) {
            task.inputGlob.splice(index, 1);
        };

        $scope.addInputGlob = function (task, name) {
            var newName = name || '';
            task.inputGlob.push({path: newName});
        };

        $scope.addStep = function (task, position) {
            task.steps.splice(position, 0, new Step({ justAdded: true }));
        };

        $scope.assignPackageToStep = function (step, npmPackage) {
            step.justAdded = false;
            step.setPackage(npmPackage);
            $scope.setFocusedStep(step);
        };

        $scope.removeStep = function (task, position) {
            $scope.sidebarActive = false;
            task.steps.splice(position, 1);
        };

        $scope.changeTaskName = function (task, changedValue) {
            task.name = changedValue;
        };

        $scope.removeTask = function (taskId) {
            var result;

            project.tasks.forEach(function (task, index) {
                if (task.id === taskId) {
                    result = index;
                }
            });

            if (result !== undefined) { project.tasks.splice(result, 1); }
        };

        $scope.confirmRemoveTask = function (task) {
            task.confirmRemoveTask = true;
        };

        $scope.addTask = function () {
            var newTask = new Task({
                name: createTaskName()
            });
            project.tasks.push(newTask);

            // select new task here
            $timeout(function () {
                var elList = exports.document.querySelectorAll('.settings h3 input');
                elList[elList.length - 1].focus();
            }, 0);
        };

        $scope.fetchReadmeFromGithub = function (step) {
            NpmPackage.fetchReadmeFromGithub({owner: step.author, repoName: step.name})
                .$promise.then(function (response) {
                    step.readme = response.content;
                });
        };

        $scope.setFocusedStep = function (step) {
            if (step.justAdded !== true) {
                $scope.focusedStep = step;
                $scope.sidebarActive = true;
            }
        };

        // debounce?
        var unregisterProjectWatch = $scope.$watch('project', function (newProject, oldProject) {
            store.saveProject($scope.project);
        }, true);

        $scope.$on('$destroy', function () {
            unregisterProjectWatch();
        });

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
    }

}(this));