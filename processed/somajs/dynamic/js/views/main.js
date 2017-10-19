(function (todo) {___jdce_logger("/js/views/main.js", 0);
	'use strict';

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	todo.MainView = function (scope, template, model, router, dispatcher) {___jdce_logger("/js/views/main.js", 1);

		// get data from the injected model
		var items = model.get();

		// template function: returns an array of items to display
		// can be different depending on the filter selected
		scope.items = function () {___jdce_logger("/js/views/main.js", 2);
			var filter = router.getRoute();
			if (filter === '') {
				return items;
			}
			return items.filter(function(){___jdce_logger("/js/views/main.js", 3);});
		};

		// template function: set all items to either completed or not completed
		scope.toggleAll = function(){___jdce_logger("/js/views/main.js", 4);};

		// template function: set 1 item to either completed or not completed
		scope.toggle = function(){___jdce_logger("/js/views/main.js", 5);};

		// template function: returns a css class depending if the item is completed or not completed
		scope.completedClass = function(){___jdce_logger("/js/views/main.js", 6);};

		// template function: removes an item
		scope.remove = function(){___jdce_logger("/js/views/main.js", 7);};

		// template function: edit an item (used on a double click event)
		scope.edit = function(){___jdce_logger("/js/views/main.js", 8);};

		// template function: during edit mode, changes the value of an item after an enter key press
		scope.update = function(){___jdce_logger("/js/views/main.js", 9);};

		// escape has been pressed, revert the value of the input
		function cancelEditing(){___jdce_logger("/js/views/main.js", 10);}

		// save the changes to the model and dispatch a custom event to render the templates
		function update(){___jdce_logger("/js/views/main.js", 11);}

		// listen to a custom event to render the main view
		dispatcher.addEventListener('render', function () {___jdce_logger("/js/views/main.js", 12);
			items = model.get();
			scope.active = model.getActive();
			scope.isVisible = scope.items().length > 0 ? true : false;
			scope.allCompleted = items.length > 0 && scope.active === 0 ? true : false;
			template.render();
		});

	};

})(window.todo = window.todo || {});
