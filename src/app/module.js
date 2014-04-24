(function (exports) {
    'use strict';

    exports.angular.module('app', [
        'app.appController',
        'views',
        'test.builder',
        'dropbox',
        'npm.search.npmSearch',
        'ngRoute',
        'app.projectPicker',
        'app.projectController',
        'app.indexController',
        'gulp.gulp',
        'app.lightbox',
        'app.confirmLightbox',
        'app.keyupEvents',
        'app.inlineEdit',
        'btford.markdown',
        'ui.ace',
        'ngClipboard',
        'app.documentationSidebar',
        'uuid4',
        'ui.utils',
        'npm.search.npmPackage'
    ])
    .config(function (DropboxProvider) {
        DropboxProvider.config('dz3ndmuzjdf7ca4', 'https://ss14-team-275.divshot.io/callback.html');
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '',
                controller: 'indexController'
            })
            .when('/:projectId', {
                templateUrl: 'app/view/project.tpl.html',
                controller: 'projectController',
                resolve: {
                    project: function ($route, gulp, $rootScope, $location) {
                        var project = gulp.getProject($route.current.params.projectId);

                        // show error if project not visible
                        if (!project) {
                            $location.path('/');
                        }

                        // propagate to rootScope for picker
                        $rootScope.project = project;

                        return gulp.getProject($route.current.params.projectId);
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function (NpmPackageCache) {
        NpmPackageCache.getCachedPackages();
    });

}(this));
