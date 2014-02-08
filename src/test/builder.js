(function (exports) {
    'use strict';

    exports.angular.module('test.builder', [
        'gulp.Project',
        'gulp.Task',
        'gulp.Step',
        'builder.fileBuilder'
    ]).factory('testBuilder', testBuilder);

    function testBuilder(Project, Task, Step, fileBuilder) {
        return function () {

            var myStep = new Step();
            myStep.name = 'concat';
            myStep.options = 'all.js';

            var myStep2 = new Step();
            myStep2.name = 'other-step';
            myStep2.options = {
                a: 'b'
            };


            var myTask = new Task();
            myTask.name = 'default';
            myTask.inputGlob = 'src/**/*.js';
            myTask.preTasks = ['more', 'other'];
            myTask.outputDir = 'build/';
            myTask.steps = [myStep, myStep2];
            myTask.isWatchEnabled = true;
            myTask.isReloadEnabled = true;

            var myTask2 = new Task();
            myTask2.name = 'more';
            myTask2.inputGlob = ['src/**/*.js', 'a/*.js'];
            myTask2.preTasks = ['a', 'b'];
            myTask2.outputDir = 'build/';
            myTask2.steps = [myStep, myStep2];

            var myProject = new Project();
            myProject.name = 'my';
            myProject.tasks = [myTask, myTask2];

            var content = fileBuilder.build(myProject);

            console.log('### content ###');
            console.log(content);
            console.log('### /content ###');
        };
    }

}(this));