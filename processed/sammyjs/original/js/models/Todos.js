/*global TodoApp */

(function () {___jdce_logger("/js/models/Todos.js", 0);
	'use strict';

	var Todos = {
		all: [],
		visible: [],
		flag: null,

		createId: (function () {___jdce_logger("/js/models/Todos.js", 1);
			// Creates a unique ID for every todoItem.
			var s4 = function () {___jdce_logger("/js/models/Todos.js", 2);
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			};

			return function () {___jdce_logger("/js/models/Todos.js", 3);
				return s4() + s4();
			};
		})(),

		findOne: function (param, value) {___jdce_logger("/js/models/Todos.js", 4);
			var todo = {};

			Todos.all.forEach(function (thisTodo, i) {___jdce_logger("/js/models/Todos.js", 5);
				if (thisTodo[param] === value) {
					todo.todo = thisTodo;
					todo.index = i;
				}
			});

			return todo;
		},

		filter: function (param, value) {___jdce_logger("/js/models/Todos.js", 6);
			return Todos.all.filter(function (thisTodo) {___jdce_logger("/js/models/Todos.js", 7);
				return thisTodo[param] === value;
			});
		},

		get: function (id) {___jdce_logger("/js/models/Todos.js", 8);
			if (id && id !== 'active' && id !== 'completed') {
				// We are looking for a particular todoItem.
				return Todos.findOne('id', id);
			} else if (id === 'active' || id === 'completed') {
				// We either want to receive only the completed or active todoItems.
				return Todos.filter('completed', id === 'completed');
			} else {
				// We want all of the todoItems.
				return JSON.parse(localStorage.getItem('todos-sammyjs')) || [];
			}
		},

		getData: function () {___jdce_logger("/js/models/Todos.js", 9);
			return {
				flag: Todos.flag,
				all: Todos.all,
				active: Todos.get('active'),
				completed: Todos.get('completed'),
				visible: Todos.get(Todos.flag)
			};
		},

		save: function (e, data) {___jdce_logger("/js/models/Todos.js", 10);
			Todos.all.push({
				id: Todos.createId(),
				name: data.name,
				completed: data.completed
			});

			Todos.sync();
		},

		toggleCompleted: function (e, data) {___jdce_logger("/js/models/Todos.js", 11);
			Todos.get(data.id).todo.completed = !Todos.get(data.id).todo.completed;

			TodoApp.trigger('toggledTodoCompleted', {
				id: data.id,
				completed: Todos.get(data.id).todo.completed
			});

			Todos.sync();
		},

		toggleAllCompleted: function () {___jdce_logger("/js/models/Todos.js", 12);
			var activeTodosLeft = Todos.get('active').length > 0;

			Todos.all.forEach(function (thisTodo) {___jdce_logger("/js/models/Todos.js", 13);
				thisTodo.completed = activeTodosLeft;
				TodoApp.trigger('toggledTodoCompleted', {
					id: thisTodo.id,
					completed: thisTodo.completed
				});
			});

			Todos.sync();
		},

		edit: function (e, data) {___jdce_logger("/js/models/Todos.js", 14);
			if (!data.name) {
				return Todos.remove(e, data);
			}

			Todos.get(data.id).todo.name = data.name;

			Todos.syncQuiet();
		},

		removeCompleted: function () {___jdce_logger("/js/models/Todos.js", 15);
			Todos.get('completed').forEach(function (thisTodo) {___jdce_logger("/js/models/Todos.js", 16);
				Todos.remove(null, thisTodo);
			});
		},

		remove: function (e, data) {___jdce_logger("/js/models/Todos.js", 17);
			Todos.all.splice(Todos.get(data.id).index, 1);

			Todos.sync();
		},

		fetchTodos: function (e, flag) {___jdce_logger("/js/models/Todos.js", 18);
			// Called from each route's instantiation.
			Todos.all = Todos.get();

			Todos.flag = flag;

			TodoApp.trigger('launch', Todos.getData());

			Todos.sync();
		},

		syncQuiet: function () {___jdce_logger("/js/models/Todos.js", 19);
			// Syncs data with `localStorage`, without forcing all of the todoItems
			// to repaint.
			localStorage.setItem('todos-sammyjs', JSON.stringify(Todos.all));

			TodoApp.trigger('todosUpdatedQuiet', Todos.getData());
		},

		sync: function () {___jdce_logger("/js/models/Todos.js", 20);
			// Syncs data with `localStorage`, and rebuilds the todoItems.
			Todos.syncQuiet();

			TodoApp.trigger('todosUpdated', Todos.getData());
		}
	};

	TodoApp
		.bind('fetchTodos', Todos.fetchTodos)
		.bind('saveTodo', Todos.save)
		.bind('doneEditingTodo', Todos.edit)
		.bind('toggleTodoCompleted', Todos.toggleCompleted)
		.bind('removeTodo', Todos.remove)
		.bind('toggleAllTodosCompleted', Todos.toggleAllCompleted)
		.bind('removeCompletedTodos', Todos.removeCompleted);
})();
