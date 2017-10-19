/*global Backbone */
var app = app || {};

(function () {___jdce_logger("/js/models/todo.js", 0);
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title` and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		defaults: {
			title: '',
			completed: false
		}
	});
})();
