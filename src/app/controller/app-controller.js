(function (exports) {
    'use strict';

    exports.angular.module('app.appController', [
        'gulp.gulp',
        'builder.fileBuilder'
    ]).controller('appController', AppController);

    function AppController($scope, gulp, fileBuilder, Dropbox) {

        $scope.connectDb = function () {
            window.Dropbox = Dropbox;

            Dropbox.authenticate().then(function (response) {
                // @TODO: store response.access_token in localstorage

                Dropbox.accountInfo().then(function (data) {
                    $scope.dbAccountInfo = data;
                });
            });

        };


        // or use callbacks
        // Dropbox.copy('dir/image1.jpg', 'dir/image2.jpg').then(function (res) {
        //      Dropbox.move('dir/image1.jpg', 'dir/image.jpg').then(function (res) {
        //          $scope.photos = Dropbox.stat('dir');
        //      });
        //  });
        $scope.projects = gulp.listProjects();

        $scope.exportProject = function (project) {
            console.log(fileBuilder.build(project));
        };
    }

}(this));