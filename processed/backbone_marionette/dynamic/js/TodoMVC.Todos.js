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

		initialize: function(){___jdce_logger("/js/TodoMVC.Todos.js", 1);},

		toggle: function(){___jdce_logger("/js/TodoMVC.Todos.js", 2);},

		isCompleted: function(){___jdce_logger("/js/TodoMVC.Todos.js", 3);},

		matchesFilter: function(){___jdce_logger("/js/TodoMVC.Todos.js", 4);}
	});

	// Todo Collection
	// ---------------
	TodoMVC.TodoList = Backbone.Collection.extend({
		model: TodoMVC.Todo,

		localStorage: new Backbone.LocalStorage('todos-backbone-marionette'),

		comparator: 'created',

		getCompleted: function(){___jdce_logger("/js/TodoMVC.Todos.js", 5);},

		getActive: function () {___jdce_logger("/js/TodoMVC.Todos.js", 6);
			return this.reject(this._isCompleted);
		},

		_isCompleted: function(){___jdce_logger("/js/TodoMVC.Todos.js", 7);}
	});
})();
