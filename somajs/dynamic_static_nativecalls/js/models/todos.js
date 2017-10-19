(function (todo) {___jdce_logger("/js/models/todos.js", 0);

	'use strict';

	todo.Model = function () {___jdce_logger("/js/models/todos.js", 1);

		var storeKey = 'todos-somajs';

		return {
			get: function () {___jdce_logger("/js/models/todos.js", 2);
				// get the data from the local storage
				return JSON.parse(localStorage.getItem(storeKey) || '[]');
			},
			set: function (items) {___jdce_logger("/js/models/todos.js", 3);
				// set the data to the local storage
				localStorage.setItem(storeKey, JSON.stringify(items));
			},
			getActive: function () {___jdce_logger("/js/models/todos.js", 4);
				// returns items that are not completed
				return this.get().filter(function (item) {___jdce_logger("/js/models/todos.js", 5);
					return !item.completed;
				}).length;
			}
		};
	};

})(window.todo = window.todo || {});
