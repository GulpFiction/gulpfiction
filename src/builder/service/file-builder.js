(function (exports) {
    'use strict';

    var LINEBREAK = '\n', INDENT = '    ';

    exports.angular.module('builder.fileBuilder', [])
        .service('fileBuilder', FileBuilder);

    function FileBuilder() {
    }

    FileBuilder.prototype.build = function (project) {
        var content = [];

        content.push(buildDependencies(project));
        content.push(buildTasks(project));
        content.push(buildReload(project));
        content.push(buildWatch(project));

        return content.join(LINEBREAK);
    };

    function buildDependencies(project) {
        var stepNames = getStepNames(project), content = [];

        // prepend default modules
        stepNames.unshift('util');

        if (hasReload(project)) {
            stepNames.unshift('livereload');
        }

        stepNames.forEach(function (stepName) {
            content.push('var ' + normalizeStepName(stepName) + ' = require("gulp-' + stepName + '");');
        });

        // prepend project module
        content.unshift('var gulp = require("gulp");');

        return content.join(LINEBREAK);
    }

    function normalizeStepName(stepName) {
        var parts = stepName.split('-'), normalizedParts;

        normalizedParts = parts.map(function (part, index) {
            // skip first part - always!
            if (index === 0) { return part; }
            return (part.slice(0, 1).toUpperCase() + part.slice(1));
        });


        return normalizedParts.join('');
    }

    function getStepNames(project) {
        var steps = [], stepNames;

        project.tasks.forEach(function (task) {
            steps = steps.concat(task.steps);
        });

        stepNames = steps.map(function (step) {
            return step.name;
        });

        return getUniqueNames(stepNames);
    }

    function getUniqueNames(names) {
        var nameMap = {}, uniqueNames = [], name;

        names.forEach(function (name) {
            nameMap[name] = name;
        });

        for (name in nameMap) {
            if (nameMap.hasOwnProperty(name)) {
                uniqueNames.push(name);
            }
        }

        return uniqueNames;
    }

    function buildTasks(project) {
        return project.tasks.map(buildTask).join(LINEBREAK);
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
        return '.pipe(' + normalizeStepName(step.name) + '(' + buildStepOptions(step) + '))';
    }

    function buildStepOptions(step) {
        return JSON.stringify(step.options);
    }

    function buildReload(project) {
        var outputDirs = getUniqueBuildDirs(project), content;
        if (!hasReload(project)) { return ''; }

        content = [
            'gulp.task("reload", function () {',
            INDENT + 'gulp.src(' + JSON.stringify(outputDirs) + ')',
            INDENT + INDENT + '.pipe(livereload())',
            '});'
        ].join(LINEBREAK);

        return content;
    }

    function getUniqueBuildDirs(project) {
        var outputDirs = project.tasks.map(function (task) {
            return task.outputDir;
        });
        return getUniqueNames(outputDirs);
    }

    function hasReload(project) {
        return project.tasks.filter(function (task) {
            return task.isReloadEnabled && task.isWatchEnabled;
        }).length > 0;
    }

    function buildWatch(project) {
        var content = [], watchDependencies = [];
        if (!hasWatch(project)) { return ''; }

        if (hasReload(project)) {
            watchDependencies.push('reload');
        }

        content.push('gulp.task("watch", ' + JSON.stringify(watchDependencies) + ', function () {');

        project.tasks.forEach(function (task) {
            var taskInputs = getUniqueNames(
                exports.angular.isArray(task.inputGlob) ? task.inputGlob : [task.inputGlob]
            );

            taskInputs.forEach(function (taskInput) {
                var tasks = [task.name];
                if (task.isWatchEnabled && task.isReloadEnabled) { tasks.push('reload'); }
                content.push(
                    INDENT + 'gulp.watch("' + taskInput + '", ' + JSON.stringify(tasks) + ');'
                );
            });
        });

        content.push('});');

        return content.join(LINEBREAK);
    }

    function hasWatch(project) {
        return project.tasks.filter(function (task) {
            return task.isWatchEnabled;
        }).length > 0;
    }

}(this));