(function (exports) {
    'use strict';

    var LINEBREAK = '\n', INDENT = '    ';

    exports.angular.module('builder.fileBuilder', [])
        .service('fileBuilder', FileBuilder);

    function FileBuilder() {
    }

    FileBuilder.prototype.build = function (project) {
        var content = [];

        content.push(buildHeader(project));
        content.push(buildDependencies(project));
        content.push(buildTasks(project));
        content.push(buildReload(project));
        content.push(buildWatch(project));

        return content.join(LINEBREAK);
    };

    function buildHeader(project) {
        return '// ' + project.name + ' - created with Gulp Fiction';
    }

    function buildDependencies(project) {
        var stepNames = getStepNames(project), content = [];

        if (hasReload(project)) {
            stepNames.unshift('livereload');
        }

        stepNames.forEach(function (stepName) {
            if (stepName) {
                content.push('var ' + normalizeStepName(stepName) + ' = require("' + stepName + '");');
            }
        });

        // prepend project module
        content.unshift('var gulp = require("gulp");');

        return content.join(LINEBREAK);
    }

    function normalizeStepName(stepName) {
        stepName = stepName.replace(/gulp-/g, '');
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

        // ensure correct input glob to export
        // and correct dst
        if (task.inputGlob && task.inputGlob.length === 1 && task.inputGlob[0].path === '') {
            return LINEBREAK;
        }

        if (task.outputDir === '') {
            return LINEBREAK;
        }



        if (task.steps.filter(filterEmptySteps).length === 0) {
            return LINEBREAK;
        }

        var taskContent = [], preTasks = buildPreTasks(task);
        taskContent.push('gulp.task("' + task.name + '", [' + preTasks + '], function () {');
        taskContent.push(buildTaskContent(task));
        taskContent.push('});');

        return taskContent.join(LINEBREAK);
    }

    function filterEmptySteps(step) {
        return (!step.justAdded);
    }

    function buildPreTasks(task) {
        var preTaskNames = [], taskId;
        // convert object to array
        for (taskId in task.preTasks) {
            if (task.preTasks.hasOwnProperty(taskId)) {
                preTaskNames.push(task.preTasks[taskId]);
            }
        }

        return preTaskNames.map(function (content) {
            return JSON.stringify(content);
        }).join(', ');
    }

    function buildTaskContent(task) {
        var content = [];

        function filterEmptySrc(src) {
            return src.path !== '';
        }

        content.push('gulp.src(' + JSON.stringify(task.inputGlob.filter(filterEmptySrc)) + ')');

        task.steps.filter(filterEmptySteps).forEach(function (step) {
            content.push(INDENT + buildStep(step));
        });

        content.push(INDENT + '.pipe(gulp.dest(' + JSON.stringify(task.outputDir) + '));');

        return content.map(function (line) {
            return INDENT + line;
        }).join(LINEBREAK);
    }

    function buildStep(step) {
        return '.pipe(' + normalizeStepName(step.name) + '(' + buildStepOptions(step) + '))';
    }

    function buildStepOptions(step) {
        if (typeof step.options === 'string') { return step.options; }
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
            console.log(task.inputGlob);
            var taskInputs = getUniqueNames(
                (exports.angular.isArray(task.inputGlob) ? task.inputGlob : [task.inputGlob])
                    .map(function (i) { return i.path; }).filter(function (i) { return i; })
            );
            console.log(taskInputs);

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
