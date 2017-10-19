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

	router.route('/active', function(){___jdce_logger("/js/app.js", 2);});

	router.route('/completed', function(){___jdce_logger("/js/app.js", 3);});

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
			var completed = $.grep(this.data(), function(){___jdce_logger("/js/app.js", 5);});

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
		saveTodo: function(){___jdce_logger("/js/app.js", 7);},

		toggleAll: function(){___jdce_logger("/js/app.js", 8);},
		startEdit: function(){___jdce_logger("/js/app.js", 9);},
		endEdit: function(){___jdce_logger("/js/app.js", 10);},
		cancelEdit: function(){___jdce_logger("/js/app.js", 11);},

		sync: function(){___jdce_logger("/js/app.js", 12);},
		destroy: function(){___jdce_logger("/js/app.js", 13);},
		destroyCompleted: function(){___jdce_logger("/js/app.js", 14);},

		// Methods for retrieving filtered todos and count values
		activeTodos: function () {___jdce_logger("/js/app.js", 15);
			return $.grep(this.get('todos').data(), function(){___jdce_logger("/js/app.js", 16);});
		},
		activeCount: function () {___jdce_logger("/js/app.js", 17);
			return this.activeTodos().length;
		},
		completedTodos: function () {___jdce_logger("/js/app.js", 18);
			return $.grep(this.get('todos').data(), function(){___jdce_logger("/js/app.js", 19);});
		},
		completedCount: function () {___jdce_logger("/js/app.js", 20);
			return this.completedTodos().length;
		},

		allCompleted: false,

		// Text value bound methods
		activeCountText: function () {___jdce_logger("/js/app.js", 21);
			return this.activeCount() === 1 ? 'item' : 'items';
		},

		// Class attribute bound methods
		todoItemClass: function(){___jdce_logger("/js/app.js", 22);},
		allFilterClass: function () {___jdce_logger("/js/app.js", 23);
			return this.get('filter') ? '' : 'selected';
		},
		activeFilterClass: function () {___jdce_logger("/js/app.js", 24);
			return this.get('filter') === 'active' ? 'selected' : '';
		},
		completedFilterClass: function () {___jdce_logger("/js/app.js", 25);
			return this.get('filter') === 'completed' ? 'selected' : '';
		}

	});

	// Bind the ViewModel to the todoapp DOM element
	kendo.bind($('#todoapp'), app.todoViewModel);

	router.start();

}($, kendo));
