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
        'app.keyupEvents'
    ])
    .config(function (DropboxProvider) {
        DropboxProvider.config('dz3ndmuzjdf7ca4', 'http://localhost:8000/callback.html');
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '',
                controller: 'indexController'
            })
            .when('/:projectName', {
                templateUrl: 'app/view/project.tpl.html',
                controller: 'projectController',
                resolve: {
                    project: function ($route, gulp, $rootScope, $location) {
                        var project = gulp.getProject($route.current.params.projectName);

                        // show error if project not visible
                        if (!project) {
                            $location.path('/');
                        }

                        // propagate to rootScope for picker
                        $rootScope.project = project;

                        return gulp.getProject($route.current.params.projectName);
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function (testBuilder) {
        // testBuilder();
        // testDropbox();
    });

}(this));
