(function (exports) {___jdce_logger("/js/store.js", 0);

	'use strict';

	var STORAGE_KEY = 'todos-riotjs';

	exports.todoStorage = {
		fetch: function () {___jdce_logger("/js/store.js", 1);
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function(){___jdce_logger("/js/store.js", 2);}
	};

})(window);
