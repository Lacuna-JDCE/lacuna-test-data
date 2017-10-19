/*global riot, todoStorage */

(function () {___jdce_logger("/js/app.js", 0);
	'use strict';

	riot.mount('todo', { data: todoStorage.fetch() });
}());
