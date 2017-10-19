'use strict';
/*global m */
var app = app || {};

var uniqueId = (function () {___jdce_logger("/js/models/todo.js", 0);
	var count = 0;
	return function () {___jdce_logger("/js/models/todo.js", 1);
		return ++count;
	};
}());

// Todo Model
app.Todo = function (data) {___jdce_logger("/js/models/todo.js", 2);
	this.title = m.prop(data.title);
	this.completed = m.prop(data.completed || false);
	this.editing = m.prop(data.editing || false);
	this.key = uniqueId();
};
