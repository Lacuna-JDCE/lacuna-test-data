/*global TodoApp */

(function () {___jdce_logger("/js/routes/active.js", 0);
	'use strict';

	TodoApp.route('get', '#/active', function () {___jdce_logger("/js/routes/active.js", 1);
		TodoApp.trigger('fetchTodos', 'active');
	});
})();
