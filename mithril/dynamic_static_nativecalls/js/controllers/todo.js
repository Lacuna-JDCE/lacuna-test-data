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

	this.add = function(){___jdce_logger("/js/controllers/todo.js", 2);};

	this.isVisible = function(){___jdce_logger("/js/controllers/todo.js", 3);};

	this.complete = function(){___jdce_logger("/js/controllers/todo.js", 4);};

	this.edit = function(){___jdce_logger("/js/controllers/todo.js", 5);};

	this.doneEditing = function(){___jdce_logger("/js/controllers/todo.js", 6);};

	this.cancelEditing = function(){___jdce_logger("/js/controllers/todo.js", 7);};

	this.clearTitle = function(){___jdce_logger("/js/controllers/todo.js", 8);};

	this.remove = function(){___jdce_logger("/js/controllers/todo.js", 9);};

	this.clearCompleted = function(){___jdce_logger("/js/controllers/todo.js", 10);};

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

	this.completeAll = function(){___jdce_logger("/js/controllers/todo.js", 13);};
};
