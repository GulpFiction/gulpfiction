(function (sandbox) {
    'use strict';

    function ConfirmLightbox() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/view/confirm-lightbox.tpl.html',
            scope: {
                isActive: '=',
                project: '=',
                doConfirm: '&onConfirm'
            },
            link: function (scope, el, attrs) {

                scope.confirm = function () {
                    scope.close();
                    scope.doConfirm();
                };

                scope.close = function () {
                    scope.isActive = false;
                };

            }
        };
    }

    sandbox.angular.module('app.confirmLightbox', ['app.lightbox'])
        .directive('confirmLightbox', ConfirmLightbox);

}(this));