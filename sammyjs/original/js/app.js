/*global Sammy, jQuery, TodoApp */

(function (window, $) {___jdce_logger("/js/app.js", 0);
	'use strict';

	window.TodoApp = Sammy('#todoapp').use('Template');

	TodoApp.notFound = function () {___jdce_logger("/js/app.js", 1);
		this.runRoute('get', '#/');
	};

	$(function () {___jdce_logger("/js/app.js", 2);
		TodoApp.run('#/');
	});
})(window, jQuery);
