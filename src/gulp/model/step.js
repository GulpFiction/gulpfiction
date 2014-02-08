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
        this.description = npmPackage.description;
        this.readme = npmPackage.readme;
        this.author = npmPackage.author;
    };

}(this));