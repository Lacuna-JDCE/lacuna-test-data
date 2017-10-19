/*global TodoApp */

(function () {___jdce_logger("/js/routes/completed.js", 0);
	'use strict';

	TodoApp.route('get', '#/completed', function () {___jdce_logger("/js/routes/completed.js", 1);
		TodoApp.trigger('fetchTodos', 'completed');
	});
})();
