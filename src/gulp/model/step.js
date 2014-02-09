(function (exports) {
    'use strict';

    exports.angular.module('gulp.Step', [])
        .value('Step', Step);

    function Step(data) {
        this.name = '';
        this.options = {};
        exports.angular.extend(this, data);
    }

    Step.prototype.setPackage = function (npmPackage) {
        this.name = npmPackage.name;
        this.author = npmPackage.author;
        this.description = npmPackage.description;
        this.homepage = npmPackage.homepage;
        this.readme = npmPackage.readme;
        this.author = npmPackage.author;
        this.version = npmPackage.version;
    };

}(this));