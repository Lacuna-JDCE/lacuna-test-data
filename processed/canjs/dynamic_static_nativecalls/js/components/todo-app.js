/* global can */
(function (namespace) {___jdce_logger("/js/components/todo-app.js", 0);
	'use strict';

	var ESCAPE_KEY = 27;

	can.Component.extend({
		// Create this component on a tag  like `<todo-app>`.
		tag: 'todo-app',
		scope: {
			// Store the Todo model in the scope
			Todo: namespace.Models.Todo,
			// A list of all Todos retrieved from LocalStorage
			todos: new namespace.Models.Todo.List({}),
			// Edit a Todo
			edit: function(){___jdce_logger("/js/components/todo-app.js", 1);},
			cancelEditing: function(){___jdce_logger("/js/components/todo-app.js", 2);},
			// Returns a list of Todos filtered based on the route
			displayList: function () {___jdce_logger("/js/components/todo-app.js", 3);
				var filter = can.route.attr('filter');
				return this.todos.filter(function (todo) {___jdce_logger("/js/components/todo-app.js", 4);
					if (filter === 'completed') {
						return todo.attr('complete');
					}

					if (filter === 'active') {
						return !todo.attr('complete');
					}

					return true;
				});
			},
			updateTodo: function(){___jdce_logger("/js/components/todo-app.js", 5);},
			createTodo: function(){___jdce_logger("/js/components/todo-app.js", 6);},
			toggleAll: function(){___jdce_logger("/js/components/todo-app.js", 7);},
			clearCompleted: function(){___jdce_logger("/js/components/todo-app.js", 8);}
		},
		events: {
			// When a new Todo has been created, add it to the todo list
			'{Todo} created': function(){___jdce_logger("/js/components/todo-app.js", 9);}
		},
		helpers: {
			link: function (name, filter) {___jdce_logger("/js/components/todo-app.js", 10);
				var data = filter ? { filter: filter } : {};
				return can.route.link(name, data, {
					className: can.route.attr('filter') === filter ? 'selected' : ''
				});
			},
			plural: function (singular, num) {___jdce_logger("/js/components/todo-app.js", 11);
				return num() === 1 ? singular : singular + 's';
			}
		}
	});
})(this);
