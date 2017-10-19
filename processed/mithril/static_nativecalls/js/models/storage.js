'use strict';
var app = app || {};

(function () {___jdce_logger("/js/models/storage.js", 0);
	var STORAGE_ID = 'todos-mithril';
	app.storage = {
		get: function () {___jdce_logger("/js/models/storage.js", 1);
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put: function(){___jdce_logger("/js/models/storage.js", 2);}
	};
})();
