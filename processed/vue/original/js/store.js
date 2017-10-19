/*jshint unused:false */

(function (exports) {___jdce_logger("/js/store.js", 0);

	'use strict';

	var STORAGE_KEY = 'todos-vuejs';

	exports.todoStorage = {
		fetch: function () {___jdce_logger("/js/store.js", 1);
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (todos) {___jdce_logger("/js/store.js", 2);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	};

})(window);
