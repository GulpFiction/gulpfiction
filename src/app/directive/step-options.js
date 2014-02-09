(function (exports) {
    'use strict';

    exports.angular.module('app.stepOptions', [])
        .directive('stepOptions', StepOptions);

    function StepOptions() {
        return {
            restrict: 'E',
            template: '<div ui-ace="{mode:\'json\', showGutter:false}" ng-model="options" style="height:160px"></div>',
            scope: {
                options: '='
            }
        };
    }
})(this);