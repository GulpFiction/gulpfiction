(function (exports) {

    'use strict';

    exports.angular.module('npm.search.npmPackage', ['ngResource'])
        .factory('NpmPackage', function ($resource) {
            var pageSize = 20;
            var page = 0;

            var NPM_URL = 'http://npmsearch.com/query';
            var GITHUB_URL = 'https://api.github.com/repos/:owner/:repoName/readme';
            var NPM_URL_COUNT = 'http://npmsearch.com/query';

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
                    size: page * pageSize,
                    q: ['keywords:gulpplugin', 'keywords:gulpfriendly'],
                    sort: 'rating:desc',
                    fields: 'name,keywords,rating,description,author,modified,homepage,version',
                };
            };

            NpmPackage.getMaxPageSizeParams = function () {
                return {
                    size: 1,
                    q: ['keywords:gulpplugin', 'keywords:gulpfriendly'],
                    sort: 'rating:desc',
                    fields: 'name,keywords,rating,description,author,modified,homepage,version',
                };
            };

            return NpmPackage;
        });

})(this);
