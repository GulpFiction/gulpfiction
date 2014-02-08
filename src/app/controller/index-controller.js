(function (exports) {
    'use strict';

    exports.angular.module('app.indexController', [])
        .controller('indexController', IndexController);

    function IndexController($location) {
        $location.path('/one');
    }

}(this));