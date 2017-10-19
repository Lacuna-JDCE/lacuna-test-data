(function (window) {___jdce_logger("/js/controller.js", 0);
	'use strict';

	/**
	 * Takes a model and view and acts as the controller between them
	 *
	 * @constructor
	 * @param {object} model The model instance
	 * @param {object} view The view instance
	 */
	function Controller(model, view) {___jdce_logger("/js/controller.js", 1);
		var self = this;
		self.model = model;
		self.view = view;

		self.view.bind('newTodo', function (title) {___jdce_logger("/js/controller.js", 2);
			self.addItem(title);
		});

		self.view.bind('itemEdit', function (item) {___jdce_logger("/js/controller.js", 3);
			self.editItem(item.id);
		});

		self.view.bind('itemEditDone', function (item) {___jdce_logger("/js/controller.js", 4);
			self.editItemSave(item.id, item.title);
		});

		self.view.bind('itemEditCancel', function (item) {___jdce_logger("/js/controller.js", 5);
			self.editItemCancel(item.id);
		});

		self.view.bind('itemRemove', function (item) {___jdce_logger("/js/controller.js", 6);
			self.removeItem(item.id);
		});

		self.view.bind('itemToggle', function (item) {___jdce_logger("/js/controller.js", 7);
			self.toggleComplete(item.id, item.completed);
		});

		self.view.bind('removeCompleted', function () {___jdce_logger("/js/controller.js", 8);
			self.removeCompletedItems();
		});

		self.view.bind('toggleAll', function (status) {___jdce_logger("/js/controller.js", 9);
			self.toggleAll(status.completed);
		});
	}

	/**
	 * Loads and initialises the view
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	Controller.prototype.setView = function(){___jdce_logger("/js/controller.js", 10);};

	/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	Controller.prototype.showAll = function(){___jdce_logger("/js/controller.js", 11);};

	/**
	 * Renders all active tasks
	 */
	Controller.prototype.showActive = function(){___jdce_logger("/js/controller.js", 12);};

	/**
	 * Renders all completed tasks
	 */
	Controller.prototype.showCompleted = function(){___jdce_logger("/js/controller.js", 13);};

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	Controller.prototype.addItem = function (title) {___jdce_logger("/js/controller.js", 14);
		var self = this;

		if (title.trim() === '') {
			return;
		}

		self.model.create(title, function () {___jdce_logger("/js/controller.js", 15);
			self.view.render('clearNewTodo');
			self._filter(true);
		});
	};

	/*
	 * Triggers the item editing mode.
	 */
	Controller.prototype.editItem = function (id) {___jdce_logger("/js/controller.js", 16);
		var self = this;
		self.model.read(id, function(){___jdce_logger("/js/controller.js", 17);});
	};

	/*
	 * Finishes the item editing mode successfully.
	 */
	Controller.prototype.editItemSave = function (id, title) {___jdce_logger("/js/controller.js", 18);
		var self = this;
		title = title.trim();

		if (title.length !== 0) {
			self.model.update(id, {title: title}, function(){___jdce_logger("/js/controller.js", 19);});
		} else {
			self.removeItem(id);
		}
	};

	/*
	 * Cancels the item editing mode.
	 */
	Controller.prototype.editItemCancel = function (id) {___jdce_logger("/js/controller.js", 20);
		var self = this;
		self.model.read(id, function(){___jdce_logger("/js/controller.js", 21);});
	};

	/**
	 * By giving it an ID it'll find the DOM element matching that ID,
	 * remove it from the DOM and also remove it from storage.
	 *
	 * @param {number} id The ID of the item to remove from the DOM and
	 * storage
	 */
	Controller.prototype.removeItem = function (id) {___jdce_logger("/js/controller.js", 22);
		var self = this;
		self.model.remove(id, function () {___jdce_logger("/js/controller.js", 23);
			self.view.render('removeItem', id);
		});

		self._filter();
	};

	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	Controller.prototype.removeCompletedItems = function () {___jdce_logger("/js/controller.js", 24);
		var self = this;
		self.model.read({ completed: true }, function(){___jdce_logger("/js/controller.js", 25);});

		self._filter();
	};

	/**
	 * Give it an ID of a model and a checkbox and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} checkbox The checkbox to check the state of complete
	 *                          or not
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	Controller.prototype.toggleComplete = function (id, completed, silent) {___jdce_logger("/js/controller.js", 26);
		var self = this;
		self.model.update(id, { completed: completed }, function(){___jdce_logger("/js/controller.js", 27);});

		if (!silent) {
			self._filter();
		}
	};

	/**
	 * Will toggle ALL checkboxes' on/off state and completeness of models.
	 * Just pass in the event object.
	 */
	Controller.prototype.toggleAll = function (completed) {___jdce_logger("/js/controller.js", 28);
		var self = this;
		self.model.read({ completed: !completed }, function(){___jdce_logger("/js/controller.js", 29);});

		self._filter();
	};

	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 */
	Controller.prototype._updateCount = function () {___jdce_logger("/js/controller.js", 30);
		var self = this;
		self.model.getCount(function(){___jdce_logger("/js/controller.js", 31);});
	};

	/**
	 * Re-filters the todo items, based on the active route.
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 */
	Controller.prototype._filter = function (force) {___jdce_logger("/js/controller.js", 32);
		var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

		// Update the elements on the page, which change with each completed todo
		this._updateCount();

		// If the last active route isn't "All", or we're switching routes, we
		// re-create the todo item elements, calling:
		//   this.show[All|Active|Completed]();
		if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this['show' + activeRoute]();
		}

		this._lastActiveRoute = activeRoute;
	};

	/**
	 * Simply updates the filter nav's selected states
	 */
	Controller.prototype._updateFilterState = function(){___jdce_logger("/js/controller.js", 33);};

	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
