/*global jQuery, TodoApp */

(function ($) {___jdce_logger("/js/controllers/TodoList.js", 0);
	'use strict';

	var ENTER_KEY = 13;

	var TodoList = {
		// `effectCause`
		// i.e. "newKeydown" = "a keydown event to create a new Todo"

		newKeydown: function (e) {___jdce_logger("/js/controllers/TodoList.js", 1);
			var name = $.trim($(this).val());

			if (e.keyCode !== ENTER_KEY || !name) {
				return;
			}

			TodoApp.trigger('saveTodo', {
				name: name,
				completed: false
			});

			$(this).val('');
		},

		toggleAllClick: (function () {___jdce_logger("/js/controllers/TodoList.js", 2);
			var flags = ['active', 'completed'];
			var count = 1;

			return function () {___jdce_logger("/js/controllers/TodoList.js", 3);
				TodoApp.trigger('toggleAllTodosCompleted', flags[count++ % 2]);
			};
		})(),

		removeCompletedClick: function () {___jdce_logger("/js/controllers/TodoList.js", 4);
			TodoApp.trigger('removeCompletedTodos');
		},

		init: function () {___jdce_logger("/js/controllers/TodoList.js", 5);
			// The TodoApp has launched, let's bind our events.

			$('#new-todo').on('keydown', TodoList.newKeydown);
			$('#toggle-all').on('click', TodoList.toggleAllClick);
			$('#footer').on('click', '#clear-completed', TodoList.removeCompletedClick);
		}
	};

	TodoApp.bind('todoListRendered', TodoList.init);
})(jQuery);
