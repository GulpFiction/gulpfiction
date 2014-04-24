(function (exports) {

    'use strict';

    function NpmSearch(NpmPackageCache, $timeout, $filter) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'npm/search/view/npm-search.tpl.html',
            scope: {
                doSelectPackage: '&onSelectPackage'
            },
            link: function (scope, element, attrs) {

                NpmPackageCache.getCachedPackages().then(function (results) {
                    // map soure data
                    scope.results = results;
                });

                scope.$watch('query', function (newQeury, oldQuery) {
                    if (!newQeury || newQeury === oldQuery) { return; }
                    scope.filteredSupset = $filter('filter')(scope.results, {name: 'gulp-' + newQeury});
                });

                scope.selectResult = function (result) {
                    scope.doSelectPackage({npmPackage: result});
                };
            }
        };
    }

    exports.angular.module('npm.search.npmSearch', [
            // 'npm.search.npmPackage',
            'npm.search.npmPackageCache',
            'npm.search.resultRow'
        ]).directive('npmSearch', NpmSearch);

})(this);
