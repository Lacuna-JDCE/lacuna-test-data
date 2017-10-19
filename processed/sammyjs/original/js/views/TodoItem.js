/*global jQuery, TodoApp */

(function ($) {___jdce_logger("/js/views/TodoItem.js", 0);
	'use strict';

	var TodoItem = {
		renderAllTodos: function (e, data) {___jdce_logger("/js/views/TodoItem.js", 1);
			this.renderEach('templates/todoItem.template', data.visible).then(function () {___jdce_logger("/js/views/TodoItem.js", 2);
				$('#todo-list').html(this.content);

				TodoApp.trigger('todoItemsRendered', data);
			});
		},

		toggleCompleteClass: function (e, data) {___jdce_logger("/js/views/TodoItem.js", 3);
			if (data.completed) {
				$('[data-id="' + data.id + '"]').addClass('completed');
			} else {
				$('[data-id="' + data.id + '"]').removeClass('completed');
			}
		},

		editingTodo: function (e, data) {___jdce_logger("/js/views/TodoItem.js", 4);
			var todo = $('[data-id="' + data.id + '"]');

			todo.addClass('editing');

			todo.find('.edit').focus().val(todo.find('.edit').val());
		},

		doneEditingTodo: function (e, data) {___jdce_logger("/js/views/TodoItem.js", 5);
			var todo = $('[data-id="' + data.id + '"]');

			todo.removeClass('editing');

			if (data.name) {
				todo.find('label').text(data.name);
				todo.find('.edit').val(data.name);
			}
		}
	};

	TodoApp.bind('todosUpdated', TodoItem.renderAllTodos);

	TodoApp.bind('toggleAllTodosCompleted', TodoItem.toggleCompleteClass);
	TodoApp.bind('toggledTodoCompleted', TodoItem.toggleCompleteClass);

	TodoApp.bind('editingTodo', TodoItem.editingTodo);
	TodoApp.bind('cancelEditingTodo', TodoItem.doneEditingTodo);
	TodoApp.bind('doneEditingTodo', TodoItem.doneEditingTodo);
})(jQuery);
