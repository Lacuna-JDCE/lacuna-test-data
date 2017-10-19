/*global window, Ractive */
(function (window, Ractive) {___jdce_logger("/js/app.js", 0);
	'use strict';

	// Create some filter functions, which we'll need later
	var filters = {
		completed: function(){___jdce_logger("/js/app.js", 1);},
		active: function(){___jdce_logger("/js/app.js", 2);}
	};

	// The keycode for the 'enter' and 'escape' keys
	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	// Create our Ractive instance
	var todoList = new Ractive({
		// Specify a target element - an ID, a CSS selector, or the element itself
		el: 'todoapp',

		// Specify a template, or the ID of a script tag containing the template
		template: '#main',

		// This is our viewmodel - as well as our list of tasks (which gets added
		// later from localStorage - see persistence.js), it includes helper
		// functions and computed values
		data: {
			filter: function(){___jdce_logger("/js/app.js", 3);},

			// completedTasks() and activeTasks() are computed values, that will update
			// our app view reactively whenever `items` changes (including changes to
			// child properties like `items[1].completed`)
			completedTasks: function(){___jdce_logger("/js/app.js", 4);},

			activeTasks: function(){___jdce_logger("/js/app.js", 5);},

			// By default, show all tasks. This value changes when the route changes
			// (see routes.js)
			currentFilter: 'all'
		},

		// We can define custom events. Here, we're defining an `enter` event,
		// and an `escape` event, which fire when the user hits those keys while
		// an input is focused:
		//
		// <input id="edit" class="edit" on-blur-enter="submit" on-escape="cancel" autofocus>
		events: (function () {___jdce_logger("/js/app.js", 6);
			var makeCustomEvent = function (keyCode) {___jdce_logger("/js/app.js", 7);
				return function (node, fire) {___jdce_logger("/js/app.js", 8);
					var keydownHandler = function(){___jdce_logger("/js/app.js", 9);};

					node.addEventListener('keydown', keydownHandler, false);

					return {
						teardown: function(){___jdce_logger("/js/app.js", 10);}
					};
				};
			};

			return {
				enter: makeCustomEvent(ENTER_KEY),
				escape: makeCustomEvent(ESCAPE_KEY)
			};
		}())
	});


	// Here, we're defining how to respond to user interactions. Unlike many
	// libraries, where you use CSS selectors to dictate what event corresponds
	// to what action, in Ractive the 'meaning' of the event is baked into the
	// template itself (e.g. <button on-click='remove'>Remove</button>).
	todoList.on({

		// Removing a todo is as straightforward as splicing it out of the array -
		// Ractive intercepts calls to array mutator methods and updates the view
		// accordingly. The DOM is updated in the most efficient manner possible.
		remove: function(){___jdce_logger("/js/app.js", 11);},

		// The `event` object contains useful properties for (e.g.) retrieving
		// data from the DOM
		newTodo: function(){___jdce_logger("/js/app.js", 12);},

		edit: function(){___jdce_logger("/js/app.js", 13);},

		submit: function(){___jdce_logger("/js/app.js", 14);},

		cancel: function(){___jdce_logger("/js/app.js", 15);},

		clearCompleted: function(){___jdce_logger("/js/app.js", 16);},

		toggleAll: function(){___jdce_logger("/js/app.js", 17);}
	});

	window.todoList = todoList;

})(window, Ractive);
