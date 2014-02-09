(function (exports) {
    'use strict';

    exports.angular.module('app.documentationSidebar', [])
        .directive('documentationSidebar', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/view/documentation-sidebar.tpl.html',
                scope: {
                    isActive: '=',
                    doClose: '&onClose',
                    focusedStep: '='
                },
                link: function (scope, el, attrs) {

                    var bodyEl = exports.angular.element(exports.document.body);

                    scope.$watch('isActive', function () {
                        if (scope.isActive) {
                            bodyEl.addClass('has-sidebar');
                        } else {
                            bodyEl.removeClass('has-sidebar');
                        }
                    });

                    scope.close = function () {
                        scope.isActive = false;
                        scope.doClose();
                    };


                    // // unregister
                    // scope.$on('$destroy', scope.$on('keyup:esc'));
                    scope.$on('$destroy', scope.$watch('isActive'));

                }
            };
        });

}(this));