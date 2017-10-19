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
			return items.filter(function (item) {___jdce_logger("/js/views/main.js", 3);
				return filter === 'active' ? !item.completed : item.completed;
			});
		};

		// template function: set all items to either completed or not completed
		scope.toggleAll = function (event) {___jdce_logger("/js/views/main.js", 4);
			items.forEach(function (item) {___jdce_logger("/js/views/main.js", 5);
				item.completed = event.currentTarget.checked;
			});
			update();
		};

		// template function: set 1 item to either completed or not completed
		scope.toggle = function (event, item) {___jdce_logger("/js/views/main.js", 6);
			item.completed = !item.completed;
			update();
		};

		// template function: returns a css class depending if the item is completed or not completed
		scope.completedClass = function (completed) {___jdce_logger("/js/views/main.js", 7);
			return completed ? 'completed' : '';
		};

		// template function: removes an item
		scope.remove = function (event, item) {___jdce_logger("/js/views/main.js", 8);
			if (item) {
				items.splice(items.indexOf(item), 1);
				update();
			}
		};

		// template function: edit an item (used on a double click event)
		scope.edit = function (event, item) {___jdce_logger("/js/views/main.js", 9);
			item.editing = 'editing';
			template.render();
			template.element.querySelector('.edit').focus();
		};

		// template function: during edit mode, changes the value of an item after an enter key press
		scope.update = function (event, item) {___jdce_logger("/js/views/main.js", 10);
			if (cancelEditing(event, item)) {
				return;
			}
			var value = event.currentTarget.value.trim();
			if (event.which === ENTER_KEY || event.type === 'blur') {
				if (value) {
					item.title = value;
				}
				else {
					items.splice(items.indexOf(item), 1);
				}
				item.editing = '';
				event.currentTarget.value = value;
				update();
			}
		};

		// escape has been pressed, revert the value of the input
		function cancelEditing(event, item) {___jdce_logger("/js/views/main.js", 11);
			if (event.which === ESCAPE_KEY) {
				event.currentTarget.value = item.title;
				event.currentTarget.blur();
				update();
				return true;
			}
			else {
				return false;
			}
		}

		// save the changes to the model and dispatch a custom event to render the templates
		function update() {___jdce_logger("/js/views/main.js", 12);
			model.set(items);
			dispatcher.dispatch('render');
		}

		// listen to a custom event to render the main view
		dispatcher.addEventListener('render', function () {___jdce_logger("/js/views/main.js", 13);
			items = model.get();
			scope.active = model.getActive();
			scope.isVisible = scope.items().length > 0 ? true : false;
			scope.allCompleted = items.length > 0 && scope.active === 0 ? true : false;
			template.render();
		});

	};

})(window.todo = window.todo || {});
