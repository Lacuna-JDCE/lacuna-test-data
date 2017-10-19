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
		isVisible: function(){___jdce_logger("/js/app.js", 6);},

		// new todo value
		newTodo: null,

		// Core CRUD Methods
		saveTodo: function(){___jdce_logger("/js/app.js", 7);},

		toggleAll: function(){___jdce_logger("/js/app.js", 8);},
		startEdit: function(){___jdce_logger("/js/app.js", 9);},
		endEdit: function(){___jdce_logger("/js/app.js", 10);},
		cancelEdit: function(){___jdce_logger("/js/app.js", 11);},

		sync: function () {___jdce_logger("/js/app.js", 12);
			this.get('todos').sync();
		},
		destroy: function (e) {___jdce_logger("/js/app.js", 13);
			this.todos.remove(e.data);
			this.todos.sync();
		},
		destroyCompleted: function(){___jdce_logger("/js/app.js", 14);},

		// Methods for retrieving filtered todos and count values
		activeTodos: function(){___jdce_logger("/js/app.js", 15);},
		activeCount: function(){___jdce_logger("/js/app.js", 16);},
		completedTodos: function(){___jdce_logger("/js/app.js", 17);},
		completedCount: function(){___jdce_logger("/js/app.js", 18);},

		allCompleted: false,

		// Text value bound methods
		activeCountText: function(){___jdce_logger("/js/app.js", 19);},

		// Class attribute bound methods
		todoItemClass: function(){___jdce_logger("/js/app.js", 20);},
		allFilterClass: function(){___jdce_logger("/js/app.js", 21);},
		activeFilterClass: function(){___jdce_logger("/js/app.js", 22);},
		completedFilterClass: function(){___jdce_logger("/js/app.js", 23);}

	});

	// Bind the ViewModel to the todoapp DOM element
	kendo.bind($('#todoapp'), app.todoViewModel);

	router.start();

}($, kendo));
