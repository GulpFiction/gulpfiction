(function (exports) {
    'use strict';

    exports.angular.module('localStorage', [])
        .factory('localStorage', function () {

            var listeners = [];

            // watch cross tab local storage events
            if (window.addEventListener) {
                window.addEventListener('storage', handleStorage, false);
            } else {
                window.attachEvent('onstorage', handleStorage);
            }

            function handleStorage(e) {
                if (!e) { e = window.event; }
                listeners.forEach(function (listener) {
                    listener(e);
                });
            }

            return {
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
                },
                rm: function (key) {
                    if (!exports.localStorage) { return; }
                    exports.localStorage.removeItem(key);
                },
                onChange: function (listenerFn) {
                    listeners.push(listenerFn);
                }
            };
        });

}(this));