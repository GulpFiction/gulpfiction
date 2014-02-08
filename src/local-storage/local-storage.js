(function (exports) {
    'use strict';

    exports.angular.module('localStorage', [])
        .value('localStorage', {
            get: function (key) {
                if (!exports.localStorage) { return; }
                return exports.localStorage[key] && JSON.parse(exports.localStorage[key]);
            },
            set: function (key, value) {
                if (!value) { return; }
                if (!exports.localStorage) { return; }
                exports.localStorage[key] = JSON.stringify(value);
            },
            reset: function () {
                if (!exports.localStorage) { return; }
                exports.localStorage.clear();
            }
        });
}(this));