/*global TodoApp */

(function () {___jdce_logger("/js/routes/home.js", 0);
	'use strict';

	TodoApp.route('get', '#/', function () {___jdce_logger("/js/routes/home.js", 1);
		TodoApp.trigger('fetchTodos');
	});
})();
