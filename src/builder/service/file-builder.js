(function (exports) {
    'use strict';

    exports.angular.module('builder.fileBuilder', [])
        .service('fileBuilder', FileBuilder);

    function FileBuilder() {
    }

    FileBuilder.prototype.build = function (gulp) {
        var content = [];

        content.push(buildDependencies(gulp));

        return content.join('');
    };

    function buildDependencies(gulp) {
        var stepNames = getStepNames(gulp);
        var content = [];

        stepNames.forEach(function (stepName) {
            content.push('var ' + stepName + ' = require("gulp-' + stepName + '");');
        });

        return content.join('\n');
    }

    function getStepNames(gulp) {
        var steps = [], stepNames;

        gulp.tasks.forEach(function (task) {
            steps = steps.concat(task.steps);
        });

        stepNames = steps.map(function (step) {
            return step.name;
        });

        return stepNames;
    }

}(this));