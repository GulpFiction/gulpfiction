(function (exports) {
    'use strict';

    exports.angular.module('builder.packageBuilder', [])
        .service('packageBuilder', PackageBuilder);

    function PackageBuilder() { }

    PackageBuilder.prototype.build = function (project) {

        // get list of all modules used in all steps
        var allTasks = project.tasks.map(function (t) {
            return t.steps;
        }).filter(function (s) {
            return s && s.length;
        }).reduce(function (prev, cur) {
            cur.forEach(function (c) {
                prev.push(c);
            });
            return cur;
        }, []).map(function (s) {
            return s.name;
        });

        var uniqueTasks = unique(allTasks);

        return createPackage(project, uniqueTasks);
    };

    function unique(lst) {
        var map = {}, unq = [];

        lst.forEach(function (i) {
            if (!map[i]) {
                map[i] = true;
                unq.push(i);
            }
        });

        return unq;
    }

    function createPackage(project, tasks) {
        var obj = {
            name: project.name.toLowerCase().replace(/ /g, '-'),
            version: '0.0.0',
            devDependencies: {
                gulp: '*',
                livereload: '*'
            }
        };

        tasks.forEach(function (t) {
            obj.devDependencies[t] = '*';
        });

        return JSON.stringify(obj, null, 4);
    }

}(this));
