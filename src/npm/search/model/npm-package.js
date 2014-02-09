(function (exports) {

    'use strict';

    exports.angular.module('npm.search.npmPackage', ['ngResource'])
        .factory('NpmPackage', function ($resource) {
            this.pageSize = 350;
            this.page = 0;

            var NPM_URL = 'http://npmjs.org:9200/npm/package/_search';

            var NpmPackage = $resource(NPM_URL, {
                from: this.page * this.pageSize,
                size : this.pageSize,
                pretty: true
            }, {
                search: {
                    url: NPM_URL,
                    method: 'POST',
                    isArray: false
                }
            });

            NpmPackage.getGulpQueryPayload = function () {
                return this.getGulpMatchQueryPayloadFor();
            };

            NpmPackage.getGulpMatchQueryPayloadFor = function (query) {
                return {
                    match: {
                        name: {
                            query: 'gulp-' + query
                        },
                        sort : ['_score']
                    }
                };
            };

            return NpmPackage;
        });

})(this);