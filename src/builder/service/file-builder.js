(function (exports) {
    'use strict';

    var LINEBREAK = '\n';

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
        var stepNames = getStepNames(gulp), content = [];

        // prepend default modules
        stepNames.unshift('util');

        stepNames.forEach(function (stepName) {
            content.push('var ' + stepName + ' = require("gulp-' + stepName + '");');
        });

        // prepend gulp module
        content.unshift('var gulp = require("gulp");')

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
        var taskContent = [];

        taskContent.push(buildTaskHead(task));
        taskContent.push(buildTaskContent(task));
        taskContent.push(buildTaskFoot(task));

        return taskContent.join(LINEBREAK);
    }

    function buildTaskHead(task) {
        var content = [], preTasks = buildPreTasks(task);

        content.push('gulp.task("' + task.name + '", [' + preTasks + '], {');
        content.push('});');

        return content.join(LINEBREAK);
    }

    function buildPreTasks(task) {
        return task.preTasks.map(function (content) {
            return '"' + content + '"';
        }).join(', ');
    }

    function buildTaskContent(task) {
        return 'a';
    }

    function buildTaskFoot(task) {
        return 'a';
    }

}(this));