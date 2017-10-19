/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {___jdce_logger("/js/todoModel.js", 0);
	'use strict';

	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {___jdce_logger("/js/todoModel.js", 1);
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	app.TodoModel.prototype.subscribe = function (onChange) {___jdce_logger("/js/todoModel.js", 2);
		this.onChanges.push(onChange);
	};

	app.TodoModel.prototype.inform = function () {___jdce_logger("/js/todoModel.js", 3);
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) {___jdce_logger("/js/todoModel.js", 4); cb(); });
	};

	app.TodoModel.prototype.addTodo = function (title) {___jdce_logger("/js/todoModel.js", 5);
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false
		});

		this.inform();
	};

	app.TodoModel.prototype.toggleAll = function (checked) {___jdce_logger("/js/todoModel.js", 6);
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		this.todos = this.todos.map(function (todo) {___jdce_logger("/js/todoModel.js", 7);
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();
	};

	app.TodoModel.prototype.toggle = function (todoToToggle) {___jdce_logger("/js/todoModel.js", 8);
		this.todos = this.todos.map(function (todo) {___jdce_logger("/js/todoModel.js", 9);
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.inform();
	};

	app.TodoModel.prototype.destroy = function (todo) {___jdce_logger("/js/todoModel.js", 10);
		this.todos = this.todos.filter(function (candidate) {___jdce_logger("/js/todoModel.js", 11);
			return candidate !== todo;
		});

		this.inform();
	};

	app.TodoModel.prototype.save = function (todoToSave, text) {___jdce_logger("/js/todoModel.js", 12);
		this.todos = this.todos.map(function (todo) {___jdce_logger("/js/todoModel.js", 13);
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();
	};

	app.TodoModel.prototype.clearCompleted = function () {___jdce_logger("/js/todoModel.js", 14);
		this.todos = this.todos.filter(function (todo) {___jdce_logger("/js/todoModel.js", 15);
			return !todo.completed;
		});

		this.inform();
	};

})();
