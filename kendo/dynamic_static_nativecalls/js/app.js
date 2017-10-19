/*global $ kendo*/
var app = app || {};

(function ($, kendo) {___jdce_logger("/js/app.js", 0);
	'use strict';

	var filterBase = {
		field: 'completed',
		operator: 'eq'
	};

	// Route object to manage filtering the todo item list
	var router = new kendo.Router();

	router.route('/', function () {___jdce_logger("/js/app.js", 1);
		app.todoData.filter({});
		app.todoViewModel.set('filter', '');
	});

	router.route('/active', function () {___jdce_logger("/js/app.js", 2);
		filterBase.value = false;
		app.todoData.filter(filterBase);
		app.todoViewModel.set('filter', 'active');
	});

	router.route('/completed', function () {___jdce_logger("/js/app.js", 3);
		filterBase.value = true;
		app.todoData.filter(filterBase);
		app.todoViewModel.set('filter', 'completed');
	});

	// Todo Model Object
	app.Todo = kendo.data.Model.define({
		id: 'id',
		fields: {
			id: { editable: false, nullable: true },
			title: { type: 'string' },
			completed: { type: 'boolean', nullable: false, defaultValue: false },
			edit: { type: 'boolean', nullable: false, defaultValue: false }
		}
	});

	// The Todo DataSource. This is a custom DataSource that extends the
	// Kendo UI DataSource and adds custom transports for saving data to
	// localStorage.
	// Implementation in js/lib/kendo.data.localstoragedatasource.ds
	app.todoData = new kendo.data.extensions.LocalStorageDataSource({
		itemBase: 'todos-kendo',
		schema: {
			model: app.Todo
		},
		change: function () {___jdce_logger("/js/app.js", 4);
			var completed = $.grep(this.data(), function (el) {___jdce_logger("/js/app.js", 5);
				return el.get('completed');
			});

			app.todoViewModel.set('allCompleted', completed.length === this.data().length);
		}
	});

	// The core ViewModel for our todo app
	app.todoViewModel = kendo.observable({
		todos: app.todoData,
		filter: null,

		// Main element visibility handler
		isVisible: function () {___jdce_logger("/js/app.js", 6);
			return this.get('todos').data().length ? '' : 'hidden';
		},

		// new todo value
		newTodo: null,

		// Core CRUD Methods
		saveTodo: function () {___jdce_logger("/js/app.js", 7);
			var todos = this.get('todos');
			var newTodo = this.get('newTodo');

			var todo = new app.Todo({
				title: newTodo.trim(),
				completed: false,
				edit: false
			});

			todos.add(todo);
			todos.sync();
			this.set('newTodo', null);
		},

		toggleAll: function () {___jdce_logger("/js/app.js", 8);

			var completed = this.completedTodos().length === this.get('todos').data().length;

			$.grep(this.get('todos').data(), function (el) {___jdce_logger("/js/app.js", 9);
				el.set('completed', !completed);
			});
		},
		startEdit: function (e) {___jdce_logger("/js/app.js", 10);
			e.data.set('edit', true);
			this.set('titleCache', e.data.get('title'));
			$(e.target).closest('li').find('input').focus();
		},
		endEdit: function (e) {___jdce_logger("/js/app.js", 11);
			var editData = e,
				title;

			if (e.data) {
				editData = e.data;
				title = e.data.get('title');

				// If the todo has a title, set it's edit property
				// to false. Otherwise, delete it.
				if (editData.title.trim()) {
					editData.set('title', title.trim());
				} else {
					this.destroy(e);
				}
			}

			this.todos.sync();
			editData.set('edit', false);
		},
		cancelEdit: function (e) {___jdce_logger("/js/app.js", 12);
			e.set('title', this.get('titleCache'));
			e.set('edit', false);
			this.todos.sync();
		},

		sync: function () {___jdce_logger("/js/app.js", 13);
			this.get('todos').sync();
		},
		destroy: function (e) {___jdce_logger("/js/app.js", 14);
			this.todos.remove(e.data);
			this.todos.sync();
		},
		destroyCompleted: function () {___jdce_logger("/js/app.js", 15);
			$.each(this.completedTodos(), function (index, value) {___jdce_logger("/js/app.js", 16);
				this.todos.remove(value);
			}.bind(this));
			this.todos.sync();
		},

		// Methods for retrieving filtered todos and count values
		activeTodos: function () {___jdce_logger("/js/app.js", 17);
			return $.grep(this.get('todos').data(), function (el) {___jdce_logger("/js/app.js", 18);
				return !el.get('completed');
			});
		},
		activeCount: function () {___jdce_logger("/js/app.js", 19);
			return this.activeTodos().length;
		},
		completedTodos: function () {___jdce_logger("/js/app.js", 20);
			return $.grep(this.get('todos').data(), function (el) {___jdce_logger("/js/app.js", 21);
				return el.get('completed');
			});
		},
		completedCount: function () {___jdce_logger("/js/app.js", 22);
			return this.completedTodos().length;
		},

		allCompleted: false,

		// Text value bound methods
		activeCountText: function () {___jdce_logger("/js/app.js", 23);
			return this.activeCount() === 1 ? 'item' : 'items';
		},

		// Class attribute bound methods
		todoItemClass: function (item) {___jdce_logger("/js/app.js", 24);
			if (item.get('edit')) {
				return 'editing';
			}

			return (item.get('completed') ? 'completed' : 'active');
		},
		allFilterClass: function () {___jdce_logger("/js/app.js", 25);
			return this.get('filter') ? '' : 'selected';
		},
		activeFilterClass: function () {___jdce_logger("/js/app.js", 26);
			return this.get('filter') === 'active' ? 'selected' : '';
		},
		completedFilterClass: function () {___jdce_logger("/js/app.js", 27);
			return this.get('filter') === 'completed' ? 'selected' : '';
		}

	});

	// Bind the ViewModel to the todoapp DOM element
	kendo.bind($('#todoapp'), app.todoViewModel);

	router.start();

}($, kendo));
