/*global todomvc */
'use strict';

/**
 * Directive that executes an expression when the element it is applied to loses focus
 */
todomvc.directive('todoBlur', function () {___jdce_logger("/js/directives/todoBlur.js", 0);
	return function (scope, elem, attrs) {___jdce_logger("/js/directives/todoBlur.js", 1);
		elem.bind('blur', function () {___jdce_logger("/js/directives/todoBlur.js", 2);
			scope.$apply(attrs.todoBlur);
		});

		scope.$on('$destroy', function () {___jdce_logger("/js/directives/todoBlur.js", 3);
			elem.unbind('blur');
		});
	};
});
