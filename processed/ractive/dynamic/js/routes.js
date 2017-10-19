/*global window, Router, todoList */
(function (window, Router, todoList) {___jdce_logger("/js/routes.js", 0);
	'use strict';

	// We're using https://github.com/flatiron/director for routing

	var router = new Router({
		'/active': function(){___jdce_logger("/js/routes.js", 1);},
		'/completed': function(){___jdce_logger("/js/routes.js", 2);}
	});

	router.configure({
		notfound: function(){___jdce_logger("/js/routes.js", 3);}
	});

	router.init();

})(window, Router, todoList);
