/*global Router:false */
(function (todo, Router) {___jdce_logger("/js/models/router.js", 0);

	'use strict';

	todo.Router = function (dispatcher) {___jdce_logger("/js/models/router.js", 1);

		// create the router (director.js)
		var router = new Router().init().configure({
			notfound: render
		});

		// dispatch a custom event to render the template on a route change
		router.on(/.*/, render);

		function render() {___jdce_logger("/js/models/router.js", 2);
			dispatcher.dispatch('render');
		}

		return {
			getRoute: function () {___jdce_logger("/js/models/router.js", 3);
				return router.getRoute()[0];
			}
		};
	};

})(window.todo = window.todo || {}, Router);
