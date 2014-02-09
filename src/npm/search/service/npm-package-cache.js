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
                var query = NpmPackage.getGulpQueryPayload();
                return NpmPackage.search({}, {query: query}).$promise.then(function (response) {
                    // remove strange "undefined" package https://github.com/Gozala/undefined.js
                    response.hits.hits.splice(0, 1);
                    self.packages = response.hits.hits.map(function (res) {
                        return res._source;
                    });
                    return self.packages;
                });
            }
        };
    }

})(this);