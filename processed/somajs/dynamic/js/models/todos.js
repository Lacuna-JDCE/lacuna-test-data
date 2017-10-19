(function (todo) {___jdce_logger("/js/models/todos.js", 0);

	'use strict';

	todo.Model = function () {___jdce_logger("/js/models/todos.js", 1);

		var storeKey = 'todos-somajs';

		return {
			get: function () {___jdce_logger("/js/models/todos.js", 2);
				// get the data from the local storage
				return JSON.parse(localStorage.getItem(storeKey) || '[]');
			},
			set: function(){___jdce_logger("/js/models/todos.js", 3);},
			getActive: function () {___jdce_logger("/js/models/todos.js", 4);
				// returns items that are not completed
				return this.get().filter(function(){___jdce_logger("/js/models/todos.js", 5);}).length;
			}
		};
	};

})(window.todo = window.todo || {});
