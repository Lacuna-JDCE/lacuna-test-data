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
			edit: function (todo, el) {___jdce_logger("/js/components/todo-app.js", 1);
				todo.attr('editing', true);
				el.parents('.todo').find('.edit').focus();
			},
			cancelEditing: function (todo, el, ev) {___jdce_logger("/js/components/todo-app.js", 2);
				if (ev.which === ESCAPE_KEY) {
					el.val(todo.attr('text'));
					todo.attr('editing', false);
				}
			},
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
			updateTodo: function (todo, el) {___jdce_logger("/js/components/todo-app.js", 5);
				var value = can.trim(el.val());

				if (value === '') {
					todo.destroy();
				} else {
					todo.attr({
						editing: false,
						text: value
					});
				}
			},
			createTodo: function (context, el) {___jdce_logger("/js/components/todo-app.js", 6);
				var value = can.trim(el.val());
				var TodoModel = this.Todo;

				if (value !== '') {
					new TodoModel({
						text: value,
						complete: false
					}).save();

					can.route.removeAttr('filter');
					el.val('');
				}
			},
			toggleAll: function (scope, el) {___jdce_logger("/js/components/todo-app.js", 7);
				var toggle = el.prop('checked');
				this.attr('todos').each(function (todo) {___jdce_logger("/js/components/todo-app.js", 8);
					todo.attr('complete', toggle);
				});
			},
			clearCompleted: function () {___jdce_logger("/js/components/todo-app.js", 9);
				this.attr('todos').completed().forEach(function (todo) {___jdce_logger("/js/components/todo-app.js", 10);
					todo.destroy();
				});
			}
		},
		events: {
			// When a new Todo has been created, add it to the todo list
			'{Todo} created': function (Construct, ev, todo) {___jdce_logger("/js/components/todo-app.js", 11);
				this.scope.attr('todos').push(todo);
			}
		},
		helpers: {
			link: function (name, filter) {___jdce_logger("/js/components/todo-app.js", 12);
				var data = filter ? { filter: filter } : {};
				return can.route.link(name, data, {
					className: can.route.attr('filter') === filter ? 'selected' : ''
				});
			},
			plural: function (singular, num) {___jdce_logger("/js/components/todo-app.js", 13);
				return num() === 1 ? singular : singular + 's';
			}
		}
	});
})(this);
