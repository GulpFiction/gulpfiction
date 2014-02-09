(function (exports) {
    'use strict';

    exports.angular.module('app.projectController', [
        'gulp.Step',
        'gulp.Task',
        'npm.search.npmPackage'
    ]).controller('projectController', ProjectController);

    function ProjectController($scope, project, store, Step, Task, NpmPackage) {
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

        $scope.removeTask = function (name) {
            var result;

            project.tasks.forEach(function (task, index) {
                if (task.name === name) {
                    result = index;
                }
            });

            if (result !== undefined) { project.tasks.splice(result, 1); }
        };

        $scope.addTask = function () {
            project.tasks.push(new Task({
                name: 'more'
            }));
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
            if (newProject && oldProject && newProject.name !== oldProject.name) {
                store.removeProject(oldProject);
            }
            store.saveProject($scope.project);
        }, true);

        $scope.$on('$destroy', function () {
            unregisterProjectWatch();
        });
    }

}(this));