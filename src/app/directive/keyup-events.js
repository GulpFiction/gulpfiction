(function (sandbox) {
    'use strict';


    function KeyupEvents($document, $rootScope) {
        return {
            restrict: 'AE',
            link: function () {
                $document.bind('keyup', function (e) {
                    switch (e.keyCode) {
                    case 27:
                        $rootScope.$broadcast('keyup:esc', e);
                        break;
                    case 13:
                        $rootScope.$broadcast('keyup:enter', e);
                        break;
                    }
                });
            }
        };
    }

    sandbox.angular.module('app.keyupEvents', [])
        .directive('keyupEvents', KeyupEvents);

})(this);