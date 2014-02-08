(function (exports) {
    'use strict';

    exports.angular.module('app.lightbox', [])
        .directive('lightbox', function () {
            return {
                restrict: 'E',
                templateUrl: 'app/view/lightbox.tpl.html',
                transclude: true,
                scope: {
                    isActive: '='
                },
                link: function (scope, el, attrs) {
                    var bodyEl = exports.angular.element(exports.document.body);
                    scope.$watch('isActive', function () {
                        if (scope.isActive) {
                            bodyEl.addClass('has-lightbox');
                        } else {
                            bodyEl.removeClass('has-lightbox');
                        }
                    });
                }
            };
        });

}(this));