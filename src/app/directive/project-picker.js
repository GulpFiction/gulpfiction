(function (exports) {
    'use strict';

    function ProjectPicker($location, $timeout, getBlankProjectNameWithProjects, $rootScope) {
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
            var inputEl = exports.document.querySelector('menu input');
            inputEl.addEventListener('blur', function () {
                scope.currentProject.name = scope.currentProject.name ||
                                            getBlankProjectNameWithProjects(scope.projects);
                if (!$rootScope.$$phase) { scope.$apply(); }
            });

            scope.switchToProject = function (project) {
                if (project === scope.currentProject) { return; }
                scope.doSwitchToProject({project: project});
                scope.navOpen = false;
            };
        }
    }

    exports.angular.module('app.projectPicker', ['gulp.gulp'])
        .directive('projectPicker', ProjectPicker);

})(this);
