/*global todomvc */
'use strict';

/**
 * Directive that executes an expression when the element it is applied to gets
 * an `escape` keydown event.
 */
todomvc.directive('todoEscape', function () {___jdce_logger("/js/directives/todoEscape.js", 0);
	var ESCAPE_KEY = 27;
	return function (scope, elem, attrs) {___jdce_logger("/js/directives/todoEscape.js", 1);
		elem.bind('keydown', function (event) {___jdce_logger("/js/directives/todoEscape.js", 2);
			if (event.keyCode === ESCAPE_KEY) {
				scope.$apply(attrs.todoEscape);
			}
		});

		scope.$on('$destroy', function () {___jdce_logger("/js/directives/todoEscape.js", 3);
			elem.unbind('keydown');
		});
	};
});
