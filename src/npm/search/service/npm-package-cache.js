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
                            res = res.fields;
                            return {
                                name: res.name[0],
                                version: res.version[0],
                                author: res.author[0],
                                homepage: res.homepage[0],
                                description: res.description[0],
                                readme: res.readme[0]
                            };
                        });
                        return self.packages;
                    });
                });
            }
        };
    }

})(this);
