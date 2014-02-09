(function (exports) {
    'use strict';

    exports.angular.module('app.documentationSidebar', [])
        .directive('documentationSidebar', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/view/documentation-sidebar.tpl.html',
                scope: {
                    isActive: '=',
                    focusedStep: '='
                },
                link: function (scope, el, attrs) {

                    var bodyEl = exports.angular.element(exports.document.body);

                    scope.$watch('isActive', function (newValue) {
                        if (newValue) {    
                            bodyEl.addClass('has-sidebar');
                        } else {
                            bodyEl.removeClass('has-sidebar');
                        }
                    });

                    scope.$on('$destroy', scope.$watch('isActive'));
                }
            };
        });

}(this));