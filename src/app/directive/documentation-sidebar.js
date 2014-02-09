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
                    console.log('documentationSidebar');

                    var bodyEl = exports.angular.element(exports.document.body);

                    scope.$watch('isActive', function (newValue) {
                        console.log(newValue);                        
                        if (newValue) {    
                            bodyEl.addClass('has-sidebar');
                        } else {
                            bodyEl.removeClass('has-sidebar');
                        }
                    });


                    // // unregister
                    // scope.$on('$destroy', scope.$on('keyup:esc'));
                    scope.$on('$destroy', scope.$watch('isActive'));

                }
            };
        });

}(this));