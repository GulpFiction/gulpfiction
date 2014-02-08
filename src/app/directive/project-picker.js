(function (exports) {
    'use strict';

    function ProjectPicker($location) {
        return {
            restrict: 'E',
            templateUrl: 'app/view/project-picker.tpl.html',
            replace: true,
            scope: {
                projects: '='
            },
            link: linkFn
        };

        function linkFn(scope, element, attrs) {
            scope.currentProject = scope.projects[0];

            scope.switchToProject = function (project) {
                scope.currentProject = project;
                $location.path('/' + project.name);
            };
        }
    }

    exports.angular.module('app.projectPicker', [])
        .directive('projectPicker', ProjectPicker);
})(this);