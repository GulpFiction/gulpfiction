(function (exports) {
    'use strict';

    exports.angular.module('gulp.Step', [])
        .factory('Step', function (uuid4) {

            function Step(data) {
                this.id = uuid4.generate();
                this.name = '';
                this.options = '';
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

            return Step;
        });

}(this));