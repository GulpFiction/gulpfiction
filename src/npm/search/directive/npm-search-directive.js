(function (exports) {

    'use strict';

    function NpmSearch(NpmPackage, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'npm/search/view/npm-search.tpl.html',
            scope: {

            },
            link: function (scope, element, attrs) {
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
                        var payload = NpmPackage.getGulpMatchQueryPayloadFor(query);
                        var res = NpmPackage.search({}, {query: payload});

                        res.$promise.then(function (response) {
                            scope.results = response.hits.hits;
                            scope.totalHits = 'Found ' + response.hits.total;
                        });
                    }
                });

                scope.$on('$destroy', function () {
                    unwatchQuery();
                });
            }
        };
    }

    exports.angular.module('npm.search.npmSearch', [
            'npm.search.npmPackage',
            'npm.search.resultRow'
        ]).directive('npmSearch', NpmSearch);

})(this);
