/*global jQuery, sap */
/*jshint unused:false */

(function () {___jdce_logger("/js/app.js", 0);
	'use strict';

	var oRootView;

	jQuery.sap.registerModulePath('todo', 'js/todo');

	// build the application root view and place on page
	oRootView = sap.ui.view({
		type: sap.ui.core.mvc.ViewType.JS,
		id: 'todoView',
		viewName: 'todo.Todo'
	});

	oRootView.placeAt('main');
})();
