/*global Backbone */
var app = app || {};

(function () {___jdce_logger("/js/routers/router.js", 0);
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function(){___jdce_logger("/js/routers/router.js", 1);}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
