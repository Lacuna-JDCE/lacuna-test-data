(function (todo) {___jdce_logger("/js/views/header.js", 0);

	'use strict';

	var ENTER_KEY = 13;

	todo.HeaderView = function (scope, template, model, dispatcher) {___jdce_logger("/js/views/header.js", 1);

		// get data from the injected model
		var items = model.get();

		// template function: add a new item on an enter key press
		scope.add = function(){___jdce_logger("/js/views/header.js", 2);};

		// template function: remove text from the input (used on blur event)
		scope.clear = function(){___jdce_logger("/js/views/header.js", 3);};

		// save the changes to the model and dispatch a custom event to render the templates
		function update(){___jdce_logger("/js/views/header.js", 4);}

		// listen to a custom event to render the header view
		dispatcher.addEventListener('render', function () {___jdce_logger("/js/views/header.js", 5);
			items = model.get();
			template.render();
		});

	};

})(window.todo = window.todo || {});
