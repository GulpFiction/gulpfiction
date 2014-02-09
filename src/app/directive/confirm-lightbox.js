(function (sandbox) {
    'use strict';

    function ConfirmLightbox() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/view/confirm-lightbox.tpl.html',
            scope: {
                isActive: '=',
                name: '@',
                customWidth: '=',
                doConfirm: '&onConfirm'
            },
            link: function (scope, el, attrs) {

                scope.confirm = function () {
                    scope.doConfirm();
                    scope.close();
                };

                scope.close = function () {
                    scope.isActive = false;
                };

                var unregister = function () {};
                scope.$watch('isActive', function (isActive) {
                    if (isActive) {
                        unregister = scope.$on('keyup:enter', function (e) {
                            scope.$apply(function () {
                                scope.confirm();
                            });
                        });
                    } else {
                        unregister();
                    }
                });
                // unregister
                scope.$on('$destroy', scope.$watch('isActive'));
                scope.$on('$destroy', scope.$on('keyup:enter'));

            }
        };
    }

    sandbox.angular.module('app.confirmLightbox', ['app.lightbox'])
        .directive('confirmLightbox', ConfirmLightbox);

}(this));