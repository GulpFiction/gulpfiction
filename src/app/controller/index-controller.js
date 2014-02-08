(function (exports) {
    'use strict';

    exports.angular.module('app.indexController', [])
        .controller('indexController', IndexController);

    function IndexController($location) {
        console.log('a');
        $location.path('/one');
    }

}(this));