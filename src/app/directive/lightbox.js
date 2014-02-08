(function (exports) {
    'use strict';

    exports.angular.module('app.lightbox', [])
        .directive('lightbox', function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'app/view/lightbox.tpl.html',
                scope: {
                    isActive: '=',
                    showClose: '='
                },
                link: function (scope, el, attrs) {

                    var bodyEl = exports.angular.element(exports.document.body);

                    var unregisterIsActiveWatch = scope.$watch('isActive', function () {
                        if (scope.isActive) {
                            bodyEl.addClass('has-lightbox');

                            // Esc key handler
                            scope.$on('keyup:esc', function (e) {
                                if (scope.isActive) {
                                    scope.$apply(function () {
                                        scope.close();
                                    });
                                }
                            });

                        } else {
                            bodyEl.removeClass('has-lightbox');
                        }
                    });

                    scope.close = function () {
                        scope.isActive = false;
                    };

                    scope.$on('$destroy', function () {
                        unregisterIsActiveWatch();
                    });

                }
            };
        });

}(this));