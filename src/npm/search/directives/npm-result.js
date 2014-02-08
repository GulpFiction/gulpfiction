(function (exports) {

    'use strict';

    function NpmResult() {

        return {
            restrict: 'E',
            templateUrl: 'npm/search/views/npm-result.tpl.html',
            scope: {
                result: '='
            },
            link: linkFn
        };

        function linkFn(scope, element, attrs) {

        }
    }


    exports.angular.module('npm.search.resultRow', [])
        .directive('resultRow', NpmResult);


})(this);