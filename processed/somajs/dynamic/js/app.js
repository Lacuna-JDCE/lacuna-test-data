/*global soma:false */
(function (todo, soma) {___jdce_logger("/js/app.js", 0);

	'use strict';

	todo.TodoApp = soma.Application.extend({
		init: function () {___jdce_logger("/js/app.js", 1);
			// mapping rules so the model and router can be injected
			this.injector.mapClass('model', todo.Model, true);
			this.injector.mapClass('router', todo.Router, true);
			// create templates for DOM Elements (optional soma-template plugin)
			this.createTemplate(todo.HeaderView, document.getElementById('header'));
			this.createTemplate(todo.MainView, document.getElementById('main'));
			this.createTemplate(todo.FooterView, document.getElementById('footer'));
		},
		start: function () {___jdce_logger("/js/app.js", 2);
			// dispatch a custom event to render the templates
			this.dispatcher.dispatch('render');
		}
	});

	// create the application
	new todo.TodoApp();

})(window.todo = window.todo || {}, soma);
