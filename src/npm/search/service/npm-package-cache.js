(function (exports) {
    'use strict';


    exports.angular.module('npm.search.npmPackageCache', [
        'npm.search.npmPackage'
    ]).service('NpmPackageCache', NpmPackageCache);

    function NpmPackageCache(NpmPackage) {
        this.packages = [];

        this.getCachedPackages = function () {
            if (this.packages.length > 0) {
                console.log('cache hit');
                return this.packages;
            } else {
                var query = NpmPackage.getGulpQueryPayload();
                console.log('cache miss');
                return NpmPackage.search({}, {query: query}).$promise.then(function (response) {
                    this.packages = response.hits.hits;
                    return this.packages;
                });
            }
        };
    }

})(this);