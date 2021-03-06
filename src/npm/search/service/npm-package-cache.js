(function (exports) {
    'use strict';

    exports.angular.module('npm.search.npmPackageCache', [
        'npm.search.npmPackage'
    ]).service('NpmPackageCache', NpmPackageCache);

    function NpmPackageCache(NpmPackage, $q) {

        this.packages = [];

        this.getCachedPackages = function () {
            var self = this;
            if (this.packages.length > 0) {
                var deferred = $q.defer();
                deferred.resolve(this.packages);
                return deferred.promise;
            } else {
                var params = NpmPackage.getSearchParams();
                var countParams = NpmPackage.getMaxPageSizeParams();

                return NpmPackage.count(countParams).$promise.then(function (response) {
                    params.size = response.total;

                    return NpmPackage.search(params).$promise.then(function (response) {
                        self.packages = response.results.map(function (r) {
                            return {
                                name: r.name[0],
                                description: r.description[0]
                            };
                        });
                        return self.packages;
                    });
                });
            }
        };
    }

})(this);
