(function (todo) {___jdce_logger("/js/views/footer.js", 0);

	'use strict';

	todo.FooterView = function (scope, template, model, router, dispatcher) {___jdce_logger("/js/views/footer.js", 1);

		// get data from the injected model
		var items = model.get();

		// template function: returns a css class for the current filter (all/active/completed)
		scope.highlightFilter = function (filter) {___jdce_logger("/js/views/footer.js", 2);
			var route = router.getRoute();
			return route === filter ? 'selected' : '';
		};

		// template function: returns the number of completed items
		scope.clearCompleted = function () {___jdce_logger("/js/views/footer.js", 3);
			items = items.filter(function (item) {___jdce_logger("/js/views/footer.js", 4);
				return !item.completed;
			});
			update();
		};

		// save the changes to the model and dispatch a custom event to render the templates
		function update() {___jdce_logger("/js/views/footer.js", 5);
			model.set(items);
			dispatcher.dispatch('render');
		}

		// listen to a custom event to render the footer view
		dispatcher.addEventListener('render', function () {___jdce_logger("/js/views/footer.js", 6);
			items = model.get();
			scope.active = model.getActive();
			scope.completed = items.length - scope.active;
			scope.itemLabel = scope.active === 1 ? 'item' : 'items';
			scope.footerVisible = items.length > 0 ? true : false;
			scope.clearCompletedVisible = scope.completed > 0 ? true : false;
			template.render();
		});

	};

})(window.todo = window.todo || {});
