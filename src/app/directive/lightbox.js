(function (exports) {
    'use strict';

    exports.angular.module('app.lightbox', [])
        .directive('lightbox', function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'app/view/lightbox.tpl.html',
                scope: {
                    isActive: '='
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


// // Register Click outside lightbox handler
// body.on('click.lightbox', function (e) {
//     if (e.target.classList[0] === LIGHTBOX_CLASS && !scope.preventDefaultClose) {
//         if (!scope.disableCloseOnBackgroundClick) {
//             sandbox.$('body').removeClass('overlay-open');
//             scope.$apply(function () {
//                 scope.doClose();
//             });
//         }
//     }
// });

// // Esc key handler
// scope.$on('ui-keyup:esc', function (e) {
//     if (scope.isLightboxVisible && !scope.preventDefaultClose) {
//         scope.$apply(function () {
//             scope.doClose();
//         });
//     }
// });