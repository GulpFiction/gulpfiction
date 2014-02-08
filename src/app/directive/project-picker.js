(function (exports) {
    'use strict';

    function ProjectPicker($location) {
        return {
            restrict: 'E',
            templateUrl: 'app/view/project-picker.tpl.html',
            replace: true,
            scope: {
                projects: '=',
                currentProject: '=',
                doSwitchToProject: '&onSwitchProject'
            },
            link: linkFn
        };

        function linkFn(scope, element, attrs) {

            // scope.$watch('currentProject', function (newValue) {
            //     scope.currentProject = newValue;
            // });

            scope.switchToProject = function (project) {
                if (project === scope.currentProject) { return; }
                scope.doSwitchToProject({project: project});
            };
        }
    }

    exports.angular.module('app.projectPicker', [])
        .directive('projectPicker', ProjectPicker);

})(this);