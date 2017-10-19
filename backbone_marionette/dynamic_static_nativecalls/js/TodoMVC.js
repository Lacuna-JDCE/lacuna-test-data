/*global Backbone, TodoMVC:true, $ */

var TodoMVC = TodoMVC || {};

$(function () {___jdce_logger("/js/TodoMVC.js", 0);
	'use strict';

	// After we initialize the app, we want to kick off the router
	// and controller, which will handle initializing our Views
	TodoMVC.App.on('start', function () {___jdce_logger("/js/TodoMVC.js", 1);
		var controller = new TodoMVC.Controller();
		controller.router = new TodoMVC.Router({
			controller: controller
		});

		controller.start();
		Backbone.history.start();
	});

	// start the TodoMVC app (defined in js/TodoMVC.js)
	TodoMVC.App.start();
});
