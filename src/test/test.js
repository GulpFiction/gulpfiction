(function (exports) {
    'use strict';

    exports.angular.module('test', [
        'gulp.Gulp',
        'gulp.Task',
        'gulp.Step',
        'builder.fileBuilder'
    ]).factory('test', test);

    function test(Gulp, Task, Step, fileBuilder) {
        return function () {

            var myStep = new Step();
            myStep.name = 'concat';
            myStep.options = 'all.js';

            var myStep2 = new Step();
            myStep2.name = 'other';
            myStep2.options = {
                a: 'b'
            };


            var myTask = new Task();
            myTask.name = 'default';
            myTask.inputGlob = 'src/**/*.js';
            myTask.preTasks = ['more', 'other'];
            myTask.outputDir = 'build/';
            myTask.steps = [myStep, myStep2];

            var myTask2 = new Task();
            myTask2.name = 'more';
            myTask2.inputGlob = 'src/**/*.js';
            myTask2.preTasks = ['a', 'b'];
            myTask2.outputDir = 'build/';
            myTask2.steps = [myStep, myStep2];

            var myGulp = new Gulp();
            myGulp.name = 'my';
            myGulp.tasks = [myTask, myTask2];

            var content = fileBuilder.build(myGulp);

            console.log('### content ###');
            console.log(content);
            console.log('### /content ###');
        };
    }

}(this));