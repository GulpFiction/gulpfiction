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
                    showClose: '=',
                    customWidth: '=',
                    doClose: '&onClose'
                },
                link: function (scope, el, attrs) {

                    var bodyEl = exports.angular.element(exports.document.body);

                    scope.$watch('isActive', function () {
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
                        scope.doClose();
                    };

                    // unregister
                    scope.$on('$destroy', scope.$on('keyup:esc'));
                    scope.$on('$destroy', scope.$watch('isActive'));

                }
            };
        });

}(this));