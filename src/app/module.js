(function (exports) {
    'use strict';
    exports.angular.module('app', ['app.appController', 'views', 'test.builder', 'test.dropbox', 'dropbox'])
    .config(function (DropboxProvider) {
        DropboxProvider.config('bjagvq348k304rt', 'http://localhost:8000/callback.html');
    })
    .run(function (testBuilder, testDropbox) {
        testBuilder();
        testDropbox();
    });
}(this));