/*global can */
(function (namespace) {___jdce_logger("/js/models/todo.js", 0);
	'use strict';

	// Basic Todo entry model
	var Todo = can.Model.LocalStorage.extend({
		storageName: 'todos-canjs'
	}, {
		init: function(){___jdce_logger("/js/models/todo.js", 1);}
	});

	// List for Todos
	Todo.List = Todo.List.extend({
		filter: function (check) {___jdce_logger("/js/models/todo.js", 2);
			var list = [];

			this.each(function(){___jdce_logger("/js/models/todo.js", 3);});

			return list;
		},

		completed: function () {___jdce_logger("/js/models/todo.js", 4);
			return this.filter(function(){___jdce_logger("/js/models/todo.js", 5);});
		},

		remaining: function () {___jdce_logger("/js/models/todo.js", 6);
			return this.attr('length') - this.completed().length;
		},

		allComplete: function () {___jdce_logger("/js/models/todo.js", 7);
			return this.attr('length') === this.completed().length;
		}
	});

	namespace.Models = namespace.Models || {};
	namespace.Models.Todo = Todo;
})(this);
