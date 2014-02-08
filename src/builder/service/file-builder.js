(function (exports) {
    'use strict';

    exports.angular.module('builder.fileBuilder', [])
        .service('fileBuilder', FileBuilder);

    function FileBuilder() {
    }

    FileBuilder.prototype.build = function (gulp) {

    };

}(this));