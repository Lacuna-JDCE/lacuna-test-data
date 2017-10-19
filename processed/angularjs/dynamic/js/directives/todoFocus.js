/*global angular */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
angular.module('todomvc')
	.directive('todoFocus', function todoFocus($timeout) {___jdce_logger("/js/directives/todoFocus.js", 0);
		'use strict';

		return function (scope, elem, attrs) {___jdce_logger("/js/directives/todoFocus.js", 1);
			scope.$watch(attrs.todoFocus, function (newVal) {___jdce_logger("/js/directives/todoFocus.js", 2);
				if (newVal) {
					$timeout(function () {___jdce_logger("/js/directives/todoFocus.js", 3);
						elem[0].focus();
					}, 0, false);
				}
			});
		};
	});
