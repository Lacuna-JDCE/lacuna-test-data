/*global Backbone, TodoMVC:true */

var TodoMVC = TodoMVC || {};

(function () {___jdce_logger("/js/TodoMVC.Todos.js", 0);
	'use strict';

	// Todo Model
	// ----------
	TodoMVC.Todo = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false,
			created: 0
		},

		initialize: function () {___jdce_logger("/js/TodoMVC.Todos.js", 1);
			if (this.isNew()) {
				this.set('created', Date.now());
			}
		},

		toggle: function () {___jdce_logger("/js/TodoMVC.Todos.js", 2);
			return this.set('completed', !this.isCompleted());
		},

		isCompleted: function () {___jdce_logger("/js/TodoMVC.Todos.js", 3);
			return this.get('completed');
		},

		matchesFilter: function (filter) {___jdce_logger("/js/TodoMVC.Todos.js", 4);
			if (filter === 'all') {
				return true;
			}

			if (filter === 'active') {
				return !this.isCompleted();
			}

			return this.isCompleted();
		}
	});

	// Todo Collection
	// ---------------
	TodoMVC.TodoList = Backbone.Collection.extend({
		model: TodoMVC.Todo,

		localStorage: new Backbone.LocalStorage('todos-backbone-marionette'),

		comparator: 'created',

		getCompleted: function () {___jdce_logger("/js/TodoMVC.Todos.js", 5);
			return this.filter(this._isCompleted);
		},

		getActive: function () {___jdce_logger("/js/TodoMVC.Todos.js", 6);
			return this.reject(this._isCompleted);
		},

		_isCompleted: function (todo) {___jdce_logger("/js/TodoMVC.Todos.js", 7);
			return todo.isCompleted();
		}
	});
})();
