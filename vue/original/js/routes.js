/*global app, Router */

(function (app, Router) {___jdce_logger("/js/routes.js", 0);

	'use strict';

	var router = new Router();

	['all', 'active', 'completed'].forEach(function (visibility) {___jdce_logger("/js/routes.js", 1);
		router.on(visibility, function () {___jdce_logger("/js/routes.js", 2);
			app.visibility = visibility;
		});
	});

	router.configure({
		notfound: function () {___jdce_logger("/js/routes.js", 3);
			window.location.hash = '';
			app.visibility = 'all';
		}
	});

	router.init();

})(app, Router);
