(function (exports) {
    'use strict';

    exports.angular.module('app.indexController', [])
        .controller('indexController', IndexController);

    function IndexController($location, gulp) {

        var existingProjects = gulp.listProjects(), projectId;

        if (existingProjects.length) {
            projectId = existingProjects[0].id; // later use last project here
        } else {
            projectId = gulp.createProject().id;
        }

        // redirect to freshly created project
        $location.path('/' + projectId);
    }

}(this));