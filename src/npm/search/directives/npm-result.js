(function (exports) {

    'use strict';

    function NpmResult() {

        return {
            restrict: 'E',
            templateUrl: 'npm/search/views/npm-result.tpl.html',
            // replace: true,
            scope: {
                result: '='
            },
            link: linkFn
        };

        function linkFn(scope, element, attrs) {
            console.log('blub');
            console.log(scope.result._source.name);
        }
    }


    exports.angular.module('npm.search.resultRow', [])
        .directive('resultRow', NpmResult);


})(this);