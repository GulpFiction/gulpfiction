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

                    params.size = response.count;

                    return NpmPackage.search(params).$promise.then(function (response) {
                        // This removes strange "undefined" package https://github.com/Gozala/undefined.js
                        response.hits.hits.splice(0, 1);
                        self.packages = response.hits.hits.map(function (res) {
                            return res._source;
                        });
                        return self.packages;
                    });
                });
            }
        };
    }

})(this);
