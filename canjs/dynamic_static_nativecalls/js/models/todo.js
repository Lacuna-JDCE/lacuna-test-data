/*global can */
(function (namespace) {___jdce_logger("/js/models/todo.js", 0);
	'use strict';

	// Basic Todo entry model
	var Todo = can.Model.LocalStorage.extend({
		storageName: 'todos-canjs'
	}, {
		init: function () {___jdce_logger("/js/models/todo.js", 1);
			// Autosave when changing the text or completing the todo
			this.on('change', function (ev, prop) {___jdce_logger("/js/models/todo.js", 2);
				if (prop === 'text' || prop === 'complete') {
					ev.target.save();
				}
			});
		}
	});

	// List for Todos
	Todo.List = Todo.List.extend({
		filter: function (check) {___jdce_logger("/js/models/todo.js", 3);
			var list = [];

			this.each(function (todo) {___jdce_logger("/js/models/todo.js", 4);
				if (check(todo)) {
					list.push(todo);
				}
			});

			return list;
		},

		completed: function () {___jdce_logger("/js/models/todo.js", 5);
			return this.filter(function (todo) {___jdce_logger("/js/models/todo.js", 6);
				return todo.attr('complete');
			});
		},

		remaining: function () {___jdce_logger("/js/models/todo.js", 7);
			return this.attr('length') - this.completed().length;
		},

		allComplete: function () {___jdce_logger("/js/models/todo.js", 8);
			return this.attr('length') === this.completed().length;
		}
	});

	namespace.Models = namespace.Models || {};
	namespace.Models.Todo = Todo;
})(this);
