'use strict';
/*global m */

var app = app || {};
app.controller = function () {___jdce_logger("/js/controllers/todo.js", 0);

	// Todo collection
	this.list = app.storage.get();

	// Update with props
	this.list = this.list.map(function (item) {___jdce_logger("/js/controllers/todo.js", 1);
		return new app.Todo(item);
	});

	// Temp title placeholder
	this.title = m.prop('');

	// Todo list filter
	this.filter = m.prop(m.route.param('filter') || '');

	this.add = function () {___jdce_logger("/js/controllers/todo.js", 2);
		var title = this.title().trim();
		if (title) {
			this.list.push(new app.Todo({title: title}));
			app.storage.put(this.list);
		}
		this.title('');
	};

	this.isVisible = function (todo) {___jdce_logger("/js/controllers/todo.js", 3);
		switch (this.filter()) {
			case 'active':
				return !todo.completed();
			case 'completed':
				return todo.completed();
			default:
				return true;
		}
	};

	this.complete = function (todo) {___jdce_logger("/js/controllers/todo.js", 4);
		if (todo.completed()) {
			todo.completed(false);
		} else {
			todo.completed(true);
		}
		app.storage.put(this.list);
	};

	this.edit = function (todo) {___jdce_logger("/js/controllers/todo.js", 5);
		todo.previousTitle = todo.title();
		todo.editing(true);
	};

	this.doneEditing = function (todo, index) {___jdce_logger("/js/controllers/todo.js", 6);
		if (!todo.editing()) {
			return;
		}

		todo.editing(false);
		todo.title(todo.title().trim());
		if (!todo.title()) {
			this.list.splice(index, 1);
		}
		app.storage.put(this.list);
	};

	this.cancelEditing = function (todo) {___jdce_logger("/js/controllers/todo.js", 7);
		todo.title(todo.previousTitle);
		todo.editing(false);
	};

	this.clearTitle = function () {___jdce_logger("/js/controllers/todo.js", 8);
		this.title('');
	};

	this.remove = function (key) {___jdce_logger("/js/controllers/todo.js", 9);
		this.list.splice(key, 1);
		app.storage.put(this.list);
	};

	this.clearCompleted = function () {___jdce_logger("/js/controllers/todo.js", 10);
		for (var i = this.list.length - 1; i >= 0; i--) {
			if (this.list[i].completed()) {
				this.list.splice(i, 1);
			}
		}
		app.storage.put(this.list);
	};

	this.amountCompleted = function () {___jdce_logger("/js/controllers/todo.js", 11);
		var amount = 0;
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].completed()) {
				amount++;
			}
		}
		return amount;
	};

	this.allCompleted = function () {___jdce_logger("/js/controllers/todo.js", 12);
		for (var i = 0; i < this.list.length; i++) {
			if (!this.list[i].completed()) {
				return false;
			}
		}
		return true;
	};

	this.completeAll = function () {___jdce_logger("/js/controllers/todo.js", 13);
		var allCompleted = this.allCompleted();
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].completed(!allCompleted);
		}
		app.storage.put(this.list);
	};
};
