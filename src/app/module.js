(function (exports) {
    'use strict';

    exports.angular.module('app', ['app.appController',
        'views',
        'test.builder',
        'test.dropbox',
        'dropbox',
        'npm.search.npmSearch',
        'ngRoute',
        'app.projectController'
    ])
    .config(function (DropboxProvider) {
        DropboxProvider.config('bjagvq348k304rt', 'http://localhost:8000/callback.html');
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/view/project.tpl.html',
                controller: 'projectController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function (testBuilder, testDropbox) {
        testBuilder();
        testDropbox();
    });
}(this));
