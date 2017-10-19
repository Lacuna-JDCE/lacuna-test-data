/*global window, Router, todoList */
(function (window, Router, todoList) {___jdce_logger("/js/routes.js", 0);
	'use strict';

	// We're using https://github.com/flatiron/director for routing

	var router = new Router({
		'/active': function () {___jdce_logger("/js/routes.js", 1);
			todoList.set('currentFilter', 'active');
		},
		'/completed': function () {___jdce_logger("/js/routes.js", 2);
			todoList.set('currentFilter', 'completed');
		}
	});

	router.configure({
		notfound: function () {___jdce_logger("/js/routes.js", 3);
			window.location.hash = '';
			todoList.set('currentFilter', 'all');
		}
	});

	router.init();

})(window, Router, todoList);
