(function (exports) {
    'use strict';

    var LINEBREAK = '\n', INDENT = '    ';

    exports.angular.module('builder.fileBuilder', [])
        .service('fileBuilder', FileBuilder);

    function FileBuilder() {
    }

    FileBuilder.prototype.build = function (gulp) {
        var content = [];

        content.push(buildDependencies(gulp));
        content.push(buildTasks(gulp));

        return content.join(LINEBREAK);
    };

    function buildDependencies(gulp) {
        // @TODO: UNIQUIFY DEPENDENCIES
        var stepNames = getStepNames(gulp), content = [];

        // prepend default modules
        stepNames.unshift('util');

        stepNames.forEach(function (stepName) {
            content.push('var ' + stepName + ' = require("gulp-' + stepName + '");');
        });

        // prepend gulp module
        content.unshift('var gulp = require("gulp");');

        return content.join(LINEBREAK);
    }

    function getStepNames(gulp) {
        // @TODO: NORMALIZE NAMES (IF THERE ARE - IN THE MODULE NAME!!!)
        var steps = [], stepNames;

        gulp.tasks.forEach(function (task) {
            steps = steps.concat(task.steps);
        });

        stepNames = steps.map(function (step) {
            return step.name;
        });

        return stepNames;
    }

    function buildTasks(gulp) {
        return gulp.tasks.map(buildTask).join(LINEBREAK);
    }

    function buildTask(task) {
        var taskContent = [], preTasks = buildPreTasks(task);
        taskContent.push('gulp.task("' + task.name + '", [' + preTasks + '], {');
        taskContent.push(buildTaskContent(task));
        taskContent.push('});');

        return taskContent.join(LINEBREAK);
    }

    function buildPreTasks(task) {
        return task.preTasks.map(function (content) {
            return '"' + content + '"';
        }).join(', ');
    }

    function buildTaskContent(task) {
        var content = [];

        content.push('gulp.src(' + JSON.stringify(task.inputGlob) + ')');

        task.steps.forEach(function (step) {
            content.push(INDENT + buildStep(step));
        });

        content.push(INDENT + '.pipe(gulp.dest("' + task.outputDir + '"));');

        return content.map(function (line) {
            return INDENT + line;
        }).join(LINEBREAK);
    }

    function buildStep(step) {
        return '.pipe(' + step.name + '(' + buildStepOptions(step) + '))';
    }

    function buildStepOptions(step) {
        return JSON.stringify(step.options);
    }

}(this));