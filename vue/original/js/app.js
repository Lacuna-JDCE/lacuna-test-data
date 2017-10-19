/*global Vue, todoStorage */

(function (exports) {___jdce_logger("/js/app.js", 0);

	'use strict';

	var filters = {
		all: function (todos) {___jdce_logger("/js/app.js", 1);
			return todos;
		},
		active: function (todos) {___jdce_logger("/js/app.js", 2);
			return todos.filter(function (todo) {___jdce_logger("/js/app.js", 3);
				return !todo.completed;
			});
		},
		completed: function (todos) {___jdce_logger("/js/app.js", 4);
			return todos.filter(function (todo) {___jdce_logger("/js/app.js", 5);
				return todo.completed;
			});
		}
	};

	exports.app = new Vue({

		// the root element that will be compiled
		el: '.todoapp',

		// app initial state
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			editedTodo: null,
			visibility: 'all'
		},

		// watch todos change for localStorage persistence
		watch: {
			todos: {
				deep: true,
				handler: todoStorage.save
			}
		},

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			filteredTodos: function () {___jdce_logger("/js/app.js", 6);
				return filters[this.visibility](this.todos);
			},
			remaining: function () {___jdce_logger("/js/app.js", 7);
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function () {___jdce_logger("/js/app.js", 8);
					return this.remaining === 0;
				},
				set: function (value) {___jdce_logger("/js/app.js", 9);
					this.todos.forEach(function (todo) {___jdce_logger("/js/app.js", 10);
						todo.completed = value;
					});
				}
			}
		},

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {

			pluralize: function (word, count) {___jdce_logger("/js/app.js", 11);
				return word + (count === 1 ? '' : 's');
			},

			addTodo: function () {___jdce_logger("/js/app.js", 12);
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				this.todos.push({ title: value, completed: false });
				this.newTodo = '';
			},

			removeTodo: function (todo) {___jdce_logger("/js/app.js", 13);
				var index = this.todos.indexOf(todo);
				this.todos.splice(index, 1);
			},

			editTodo: function (todo) {___jdce_logger("/js/app.js", 14);
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},

			doneEdit: function (todo) {___jdce_logger("/js/app.js", 15);
				if (!this.editedTodo) {
					return;
				}
				this.editedTodo = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},

			cancelEdit: function (todo) {___jdce_logger("/js/app.js", 16);
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {___jdce_logger("/js/app.js", 17);
				this.todos = filters.active(this.todos);
			}
		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'todo-focus': function (el, binding) {___jdce_logger("/js/app.js", 18);
				if (binding.value) {
					el.focus();
				}
			}
		}
	});

})(window);
