/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['firebase']);

todomvc.filter('todoFilter', function ($location) {___jdce_logger("/js/app.js", 0);
	return function (input) {___jdce_logger("/js/app.js", 1);
		var filtered = {};
		angular.forEach(input, function (todo, id) {___jdce_logger("/js/app.js", 2);
			var path = $location.path();
			if (path === '/active') {
				if (!todo.completed) {
					filtered[id] = todo;
				}
			} else if (path === '/completed') {
				if (todo.completed) {
					filtered[id] = todo;
				}
			} else {
				filtered[id] = todo;
			}
		});
		return filtered;
	};
});
