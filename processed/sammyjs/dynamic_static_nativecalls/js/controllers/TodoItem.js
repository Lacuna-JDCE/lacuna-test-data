/*global jQuery, TodoApp */

(function ($) {___jdce_logger("/js/controllers/TodoItem.js", 0);
	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	var TodoItem = {
		// `effectCause`
		// i.e. "removeClick" = "a click to remove a todoItem"

		removeClick: function () {___jdce_logger("/js/controllers/TodoItem.js", 1);
			TodoApp.trigger('removeTodo', {
				id: $(this).parents('li').data('id')
			});
		},

		toggleClick: function () {___jdce_logger("/js/controllers/TodoItem.js", 2);
			TodoApp.trigger('toggleTodoCompleted', {
				id: $(this).parents('li').data('id')
			});
		},

		editDblClick: function () {___jdce_logger("/js/controllers/TodoItem.js", 3);
			$(this).parents('li').data('original-name', $(this).text());

			TodoApp.trigger('editingTodo', {
				id: $(this).parents('li').data('id')
			});
		},

		editBlur: function () {___jdce_logger("/js/controllers/TodoItem.js", 4);
			TodoApp.trigger('doneEditingTodo', {
				id: $(this).parents('li').data('id'),
				name: $.trim($(this).val())
			});
		},

		editKeyup: function (e) {___jdce_logger("/js/controllers/TodoItem.js", 5);
			if (e.which === ESCAPE_KEY) {
				$(this).trigger('cancelEditingTodo', {
					id: $(this).parents('li').data('id'),
					name: $(this).parents('li').data('original-name')
				});
			}

			if (e.which === ENTER_KEY) {
				$(this).trigger('blur');
			}
		},

		init: function () {___jdce_logger("/js/controllers/TodoItem.js", 6);
			$('#todo-list')
				.on('click', '.destroy', TodoItem.removeClick)
				.on('click', '.toggle', TodoItem.toggleClick)
				.on('dblclick', 'label', TodoItem.editDblClick)
				.on('blur', '.edit', TodoItem.editBlur)
				.on('keyup', '.edit', TodoItem.editKeyup);
		}
	};

	TodoApp.bind('todoListRendered', TodoItem.init);
})(jQuery);
