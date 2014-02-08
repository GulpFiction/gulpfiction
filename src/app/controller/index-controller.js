(function (exports) {
    'use strict';

    exports.angular.module('app.indexController', [])
        .controller('indexController', IndexController);

    function IndexController($location, gulp) {

        var existingProjects = gulp.listProjects(), projectName;

        if (existingProjects.length) {
            projectName = existingProjects[0].name; // later use last project here
        } else {
            projectName = gulp.createProject().name;
        }

        // redirect to freshly created project
        $location.path('/' + encodeURI(projectName));
    }

}(this));