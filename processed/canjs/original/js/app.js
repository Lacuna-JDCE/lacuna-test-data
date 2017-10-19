/* global $, can */
(function () {___jdce_logger("/js/app.js", 0);
	'use strict';

	$(function () {___jdce_logger("/js/app.js", 1);
		// Set up a route that maps to the `filter` attribute
		can.route(':filter');

		// Render #app-template
		$('#todoapp').html(can.view('app-template', {}));

		// Start the router
		can.route.ready();
	});
})();
