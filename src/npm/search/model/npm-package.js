(function (exports) {

    'use strict';

    exports.angular.module('npm.search.npmPackage', ['ngResource'])
        .factory('NpmPackage', function ($resource) {
            var pageSize = 20;
            var page = 0;
            var query = 'keywords:gulpplugin,gulpfriendly';

            var NPM_URL = 'http://registry.gulpjs.com/_search';
            var GITHUB_URL = 'https://api.github.com/repos/:owner/:repoName/readme';
            var NPM_URL_COUNT = 'http://registry.gulpjs.com/_count';

            var NpmPackage = $resource(NPM_URL, {
            }, {
                search: {
                    url: NPM_URL,
                    method: 'GET',
                    isArray: false
                },
                fetchReadmeFromGithub: {
                    url: GITHUB_URL,
                    method: 'GET',
                    isArray: false
                },
                count: {
                    url: NPM_URL_COUNT,
                    method: 'GET',
                    isArray: false
                }
            });

            NpmPackage.getSearchParams = function () {
                return {
                    from: page * pageSize,
                    size: pageSize,
                    pretty: true,
                    q: query
                };
            };

            NpmPackage.getMaxPageSizeParams = function () {
                return {
                    q: query
                };
            };

            return NpmPackage;
        });

})(this);
