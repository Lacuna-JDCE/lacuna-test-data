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

		self.view.bind('newTodo', function(){___jdce_logger("/js/controller.js", 2);});

		self.view.bind('itemEdit', function(){___jdce_logger("/js/controller.js", 3);});

		self.view.bind('itemEditDone', function(){___jdce_logger("/js/controller.js", 4);});

		self.view.bind('itemEditCancel', function(){___jdce_logger("/js/controller.js", 5);});

		self.view.bind('itemRemove', function(){___jdce_logger("/js/controller.js", 6);});

		self.view.bind('itemToggle', function(){___jdce_logger("/js/controller.js", 7);});

		self.view.bind('removeCompleted', function(){___jdce_logger("/js/controller.js", 8);});

		self.view.bind('toggleAll', function(){___jdce_logger("/js/controller.js", 9);});
	}

	/**
	 * Loads and initialises the view
	 *
	 * @param {string} '' | 'active' | 'completed'
	 */
	Controller.prototype.setView = function (locationHash) {___jdce_logger("/js/controller.js", 10);
		var route = locationHash.split('/')[1];
		var page = route || '';
		this._updateFilterState(page);
	};

	/**
	 * An event to fire on load. Will get all items and display them in the
	 * todo-list
	 */
	Controller.prototype.showAll = function () {___jdce_logger("/js/controller.js", 11);
		var self = this;
		self.model.read(function (data) {___jdce_logger("/js/controller.js", 12);
			self.view.render('showEntries', data);
		});
	};

	/**
	 * Renders all active tasks
	 */
	Controller.prototype.showActive = function(){___jdce_logger("/js/controller.js", 13);};

	/**
	 * Renders all completed tasks
	 */
	Controller.prototype.showCompleted = function(){___jdce_logger("/js/controller.js", 14);};

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	Controller.prototype.addItem = function(){___jdce_logger("/js/controller.js", 15);};

	/*
	 * Triggers the item editing mode.
	 */
	Controller.prototype.editItem = function(){___jdce_logger("/js/controller.js", 16);};

	/*
	 * Finishes the item editing mode successfully.
	 */
	Controller.prototype.editItemSave = function(){___jdce_logger("/js/controller.js", 17);};

	/*
	 * Cancels the item editing mode.
	 */
	Controller.prototype.editItemCancel = function(){___jdce_logger("/js/controller.js", 18);};

	/**
	 * By giving it an ID it'll find the DOM element matching that ID,
	 * remove it from the DOM and also remove it from storage.
	 *
	 * @param {number} id The ID of the item to remove from the DOM and
	 * storage
	 */
	Controller.prototype.removeItem = function(){___jdce_logger("/js/controller.js", 19);};

	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	Controller.prototype.removeCompletedItems = function(){___jdce_logger("/js/controller.js", 20);};

	/**
	 * Give it an ID of a model and a checkbox and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} checkbox The checkbox to check the state of complete
	 *                          or not
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	Controller.prototype.toggleComplete = function(){___jdce_logger("/js/controller.js", 21);};

	/**
	 * Will toggle ALL checkboxes' on/off state and completeness of models.
	 * Just pass in the event object.
	 */
	Controller.prototype.toggleAll = function(){___jdce_logger("/js/controller.js", 22);};

	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 */
	Controller.prototype._updateCount = function () {___jdce_logger("/js/controller.js", 23);
		var self = this;
		self.model.getCount(function (todos) {___jdce_logger("/js/controller.js", 24);
			self.view.render('updateElementCount', todos.active);
			self.view.render('clearCompletedButton', {
				completed: todos.completed,
				visible: todos.completed > 0
			});

			self.view.render('toggleAll', {checked: todos.completed === todos.total});
			self.view.render('contentBlockVisibility', {visible: todos.total > 0});
		});
	};

	/**
	 * Re-filters the todo items, based on the active route.
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 */
	Controller.prototype._filter = function (force) {___jdce_logger("/js/controller.js", 25);
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
	Controller.prototype._updateFilterState = function (currentPage) {___jdce_logger("/js/controller.js", 26);
		// Store a reference to the active route, allowing us to re-filter todo
		// items as they are marked complete or incomplete.
		this._activeRoute = currentPage;

		if (currentPage === '') {
			this._activeRoute = 'All';
		}

		this._filter();

		this.view.render('setFilter', currentPage);
	};

	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
