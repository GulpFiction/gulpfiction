(function (exports) {

    'use strict';

    exports.angular.module('npm.search.npmPackage', ['ngResource'])
        .factory('NpmPackage', function ($resource) {
            var pageSize = 350;
            var page = 0;

            var NPM_URL = 'http://npmjs.org:9200/npm/package/_search';
            var GITHUB_URL = 'https://api.github.com/repos/:owner/:repoName/readme';

            var NpmPackage = $resource(NPM_URL, {
            }, {
                search: {
                    url: NPM_URL,
                    method: 'POST',
                    isArray: false
                },
                fetchReadmeFromGithub: {
                    url: GITHUB_URL,
                    method: 'GET',
                    isArray: false
                }
            });

            NpmPackage.getSearchParams = function () {
                return {
                    from: page * pageSize,
                    size : pageSize,
                    pretty: true
                };
            };

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