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

            var myTask = new Task();
            myTask.name = 'default';
            myTask.inputGlob = 'src/**/*.js'
            myTask.pretasks = [];
            myTask.outputDir = 'build/';
            myTask.steps = [myStep];

            var myGulp = new Gulp();
            myGulp.name = 'my';
            myGulp.tasks = [myTask];

            var content = fileBuilder.build(myGulp);

            console.log('### content ###');
            console.log(content);
            console.log('### /content ###');
        };
    }

}(this));