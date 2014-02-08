(function (exports) {
    'use strict';

    exports.angular.module('builder.fileBuilder', [])
        .value('fileBuilder', FileBuilder);

    function FileBuilder() {
    }

    FileBuilder.prototype.build = function (gulp) {

    };

}(this));