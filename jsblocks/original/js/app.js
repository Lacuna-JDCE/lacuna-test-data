/*global blocks */

(function () {___jdce_logger("/js/app.js", 0);
	'use strict';

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var App = blocks.Application();

	var Todo = App.Model({
		title: App.Property(),

		completed: App.Property(),

		editing: blocks.observable(),

		init: function () {___jdce_logger("/js/app.js", 1);
			var collection = this.collection();

			// collection is undefined when a Todo is still not part of the Todos collection
			if (collection) {
				// save to Local Storage on each attribute change
				this.title.on('change', collection.save);
				this.completed.on('change', collection.save);
			}

			this.title.on('change', function (newValue) {___jdce_logger("/js/app.js", 2);
				this.title((newValue || '').trim());
			});
		},

		toggleComplete: function () {___jdce_logger("/js/app.js", 3);
			this.completed(!this.completed());
		},

		edit: function () {___jdce_logger("/js/app.js", 4);
			this.lastValue = this.title();
			this.editing(true);
		},

		closeEdit: function () {___jdce_logger("/js/app.js", 5);
			if (this.title()) {
				this.editing(false);
			} else {
				this.destroy();
			}
		},

		handleAction: function (e) {___jdce_logger("/js/app.js", 6);
			if (e.which === ENTER_KEY) {
				this.closeEdit();
			} else if (e.which === ESCAPE_KEY) {
				this.title(this.lastValue);
				this.editing(false);
			}
		}
	});

	var Todos = App.Collection(Todo, {
		remaining: blocks.observable(),

		init: function () {___jdce_logger("/js/app.js", 7);
			this
				// load the data from the Local Storage
				.reset(JSON.parse(localStorage.getItem('todos-jsblocks')) || [])
				// save to Local Storage on each item add or remove
				.on('add remove', this.save)
				.updateRemaining();
		},

		// set all todos as completed
		toggleAll: function () {___jdce_logger("/js/app.js", 8);
			var complete = this.remaining() === 0 ? false : true;
			this.each(function (todo) {___jdce_logger("/js/app.js", 9);
				todo.completed(complete);
			});
		},

		// remove all completed todos
		clearCompleted: function () {___jdce_logger("/js/app.js", 10);
			this.removeAll(function (todo) {___jdce_logger("/js/app.js", 11);
				return todo.completed();
			});
		},

		// saves all data back to the Local Storage
		save: function () {___jdce_logger("/js/app.js", 12);
			var result = [];

			blocks.each(this(), function (model) {___jdce_logger("/js/app.js", 13);
				result.push(model.dataItem());
			});

			localStorage.setItem('todos-jsblocks', JSON.stringify(result));

			this.updateRemaining();
		},

		// updates the observable
		updateRemaining: function () {___jdce_logger("/js/app.js", 14);
			this.remaining(this.reduce(function (memo, todo) {___jdce_logger("/js/app.js", 15);
				return todo.completed() ? memo : memo + 1;
			}, 0));
		}
	});

	App.View('Todos', {
		options: {
			// creates a route for the View in order to handle
			// /all, /active, /completed filters
			route: blocks.route('{{filter}}').optional('filter')
		},

		filter: blocks.observable(),

		newTodo: new Todo(),

		// holds all todos for the current view
		// todos are filtered if "Active" or "Completed" is clicked
		todos: new Todos().extend('filter', function (value) {___jdce_logger("/js/app.js", 16);
			var mode = this.filter();
			var completed = value.completed();
			var include = true;

			if (mode === 'active') {
				include = !completed;
			} else if (mode === 'completed') {
				include = completed;
			}

			return include;
		}),

		// filter the data when the route have changed
		// the callback is fired when "All", "Active" or "Completed" have been clicked
		routed: function (params) {___jdce_logger("/js/app.js", 17);
			if (params.filter !== 'active' && params.filter !== 'completed') {
				params.filter = 'all';
			}
			this.filter(params.filter);
		},

		addTodo: function (e) {___jdce_logger("/js/app.js", 18);
			if (e.which === ENTER_KEY && this.newTodo.title()) {
				this.todos.push(this.newTodo);
				// return all Todo values to their defaults
				this.newTodo.reset();
			}
		}
	});
})();
