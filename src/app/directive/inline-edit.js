(function (exports) {
    'use strict';

    function InlineEdit() {

        function linkFn(scope, element, attrs) {
            var previousValue;

            scope.edit = function () {
                previousValue = scope.model;
                scope.editModeActive = true;
            };

            scope.save = function () {
                if (!scope.model && scope.model === '') { scope.cancel(); }
                previousValue = scope.model;
                scope.doSave({changedValue: scope.model});
                scope.editModeActive = false;
            };

            scope.cancel = function () {
                scope.model = previousValue;
                scope.editModeActive = false;
                scope.doCancel();
            };
            scope.$watch('editModeActive', function (isEditMode) {
                if (isEditMode) {
                    scope.$on('keyup:esc', function () {
                        scope.$apply(function () {
                            scope.cancel();
                        });
                    });

                    scope.$on('keyup:enter', function () {
                        scope.$apply(function () {
                            scope.save();
                        });
                    });
                }
            });

        }

        return {
            restrict: 'A',
            scope: {
                model: '=',
                doSave: '&onSave',
                doCancel: '&onCancel'
            },
            templateUrl: 'app/view/inline-edit.tpl.html',
            link: linkFn
        };

    }


    exports.angular.module('app.inlineEdit', [])
        .directive('inlineEdit', InlineEdit);

})(this);