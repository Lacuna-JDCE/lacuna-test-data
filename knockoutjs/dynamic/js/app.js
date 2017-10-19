/*global ko, Router */
(function () {___jdce_logger("/js/app.js", 0);
	'use strict';

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	// A factory function we can use to create binding handlers for specific
	// keycodes.
	function keyhandlerBindingFactory(keyCode) {___jdce_logger("/js/app.js", 1);
		return {
			init: function (element, valueAccessor, allBindingsAccessor, data, bindingContext) {___jdce_logger("/js/app.js", 2);
				var wrappedHandler, newValueAccessor;

				// wrap the handler with a check for the enter key
				wrappedHandler = function(){___jdce_logger("/js/app.js", 3);};

				// create a valueAccessor with the options that we would want to pass to the event binding
				newValueAccessor = function () {___jdce_logger("/js/app.js", 4);
					return {
						keyup: wrappedHandler
					};
				};

				// call the real event binding's init function
				ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
			}
		};
	}

	// a custom binding to handle the enter key
	ko.bindingHandlers.enterKey = keyhandlerBindingFactory(ENTER_KEY);

	// another custom binding, this time to handle the escape key
	ko.bindingHandlers.escapeKey = keyhandlerBindingFactory(ESCAPE_KEY);

	// wrapper to hasFocus that also selects text and applies focus async
	ko.bindingHandlers.selectAndFocus = {
		init: function(){___jdce_logger("/js/app.js", 5);},
		update: function(){___jdce_logger("/js/app.js", 6);}
	};

	// represent a single todo item
	var Todo = function(){___jdce_logger("/js/app.js", 7);};

	// our main view model
	var ViewModel = function (todos) {___jdce_logger("/js/app.js", 8);
		// map array of passed in todos to an observableArray of Todo objects
		this.todos = ko.observableArray(todos.map(function(){___jdce_logger("/js/app.js", 9);}));

		// store the new todo value being entered
		this.current = ko.observable();

		this.showMode = ko.observable('all');

		this.filteredTodos = ko.computed(function () {___jdce_logger("/js/app.js", 10);
			switch (this.showMode()) {
			case 'active':
				return this.todos().filter(function(){___jdce_logger("/js/app.js", 11);});
			case 'completed':
				return this.todos().filter(function(){___jdce_logger("/js/app.js", 12);});
			default:
				return this.todos();
			}
		}.bind(this));

		// add a new todo, when enter key is pressed
		this.add = function(){___jdce_logger("/js/app.js", 13);}.bind(this);

		// remove a single todo
		this.remove = function(){___jdce_logger("/js/app.js", 14);}.bind(this);

		// remove all completed todos
		this.removeCompleted = function(){___jdce_logger("/js/app.js", 15);}.bind(this);

		// edit an item
		this.editItem = function(){___jdce_logger("/js/app.js", 16);}.bind(this);

		// stop editing an item.  Remove the item, if it is now empty
		this.saveEditing = function(){___jdce_logger("/js/app.js", 17);}.bind(this);

		// cancel editing an item and revert to the previous content
		this.cancelEditing = function(){___jdce_logger("/js/app.js", 18);}.bind(this);

		// count of all completed todos
		this.completedCount = ko.computed(function () {___jdce_logger("/js/app.js", 19);
			return this.todos().filter(function(){___jdce_logger("/js/app.js", 20);}).length;
		}.bind(this));

		// count of todos that are not complete
		this.remainingCount = ko.computed(function () {___jdce_logger("/js/app.js", 21);
			return this.todos().length - this.completedCount();
		}.bind(this));

		// writeable computed observable to handle marking all complete/incomplete
		this.allCompleted = ko.computed({
			//always return true/false based on the done flag of all todos
			read: function () {___jdce_logger("/js/app.js", 22);
				return !this.remainingCount();
			}.bind(this),
			// set all todos to the written value (true/false)
			write: function(){___jdce_logger("/js/app.js", 23);}.bind(this)
		});

		// helper function to keep expressions out of markup
		this.getLabel = function (count) {___jdce_logger("/js/app.js", 24);
			return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items';
		}.bind(this);

		// internal computed observable that fires whenever anything changes in our todos
		ko.computed(function () {___jdce_logger("/js/app.js", 25);
			// store a clean copy to local storage, which also creates a dependency on
			// the observableArray and all observables in each item
			localStorage.setItem('todos-knockoutjs', ko.toJSON(this.todos));
		}.bind(this)).extend({
			rateLimit: { timeout: 500, method: 'notifyWhenChangesStop' }
		}); // save at most twice per second
	};

	// check local storage for todos
	var todos = ko.utils.parseJson(localStorage.getItem('todos-knockoutjs'));

	// bind a new instance of our view model to the page
	var viewModel = new ViewModel(todos || []);
	ko.applyBindings(viewModel);

	// set up filter routing
	/*jshint newcap:false */
	Router({ '/:filter': viewModel.showMode }).init();
}());
