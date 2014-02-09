(function (exports) {

    'use strict';

    function NpmSearch(NpmPackageCache, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'npm/search/view/npm-search.tpl.html',
            scope: {
                doSelectPackage: '&onSelectPackage'
            },
            link: function (scope, element, attrs) {
                scope.packages = NpmPackageCache.getCachedPackages();
                console.log(scope.packages);

                var debounce;

                var unwatchQuery = scope.$watch('query', function (newValue, oldValue) {

                    if (newValue === oldValue) { return; }

                    $timeout.cancel(debounce);
                    debounce = $timeout(function () {
                        scope.$apply(function () {
                            performSearch(newValue);
                        });
                    }, 100);

                    function performSearch(query) {
                        console.log(query);
                    }

                    // function performSearch(query) {
                    //     var payload = NpmPackage.getGulpMatchQueryPayloadFor(query);
                    //     var res = NpmPackage.search({}, {query: payload});

                    //     res.$promise.then(function (response) {
                    //         scope.results = response.hits.hits;
                    //         scope.totalHits = 'Found ' + response.hits.total;
                    //     });
                    // }
                });

                scope.selectResult = function (result) {
                    scope.doSelectPackage({npmPackage: result._source});
                };

                scope.$on('$destroy', function () {
                    unwatchQuery();
                });
            }
        };
    }

    exports.angular.module('npm.search.npmSearch', [
            // 'npm.search.npmPackage',
            'npm.search.npmPackageCache',
            'npm.search.resultRow'
        ]).directive('npmSearch', NpmSearch);

})(this);
