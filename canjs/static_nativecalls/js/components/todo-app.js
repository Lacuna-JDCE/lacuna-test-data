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
			displayList: function(){___jdce_logger("/js/components/todo-app.js", 3);},
			updateTodo: function(){___jdce_logger("/js/components/todo-app.js", 4);},
			createTodo: function(){___jdce_logger("/js/components/todo-app.js", 5);},
			toggleAll: function(){___jdce_logger("/js/components/todo-app.js", 6);},
			clearCompleted: function(){___jdce_logger("/js/components/todo-app.js", 7);}
		},
		events: {
			// When a new Todo has been created, add it to the todo list
			'{Todo} created': function(){___jdce_logger("/js/components/todo-app.js", 8);}
		},
		helpers: {
			link: function(){___jdce_logger("/js/components/todo-app.js", 9);},
			plural: function(){___jdce_logger("/js/components/todo-app.js", 10);}
		}
	});
})(this);
