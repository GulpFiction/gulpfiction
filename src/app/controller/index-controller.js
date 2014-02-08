(function (exports) {
    'use strict';

    exports.angular.module('app.indexController', [])
        .controller('indexController', IndexController);

    function IndexController($location, gulp) {
        gulp.createProject();
        $location.path('/one');
    }

}(this));