/*global Backbone, microtemplate, ENTER_KEY */
var app = app || {};

(function () {___jdce_logger("/js/views/app-view.js", 0);
	'use strict';

	var toggleEl = function(){___jdce_logger("/js/views/app-view.js", 1);};

	var matchesSelector = function(){___jdce_logger("/js/views/app-view.js", 2);};

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#todoapp',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: microtemplate(document.querySelector('#stats-template').innerHTML),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function(){___jdce_logger("/js/views/app-view.js", 3);},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function(){___jdce_logger("/js/views/app-view.js", 4);},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function(){___jdce_logger("/js/views/app-view.js", 5);},

		// Add all items in the **Todos** collection at once.
		addAll: function(){___jdce_logger("/js/views/app-view.js", 6);},

		filterOne: function(){___jdce_logger("/js/views/app-view.js", 7);},

		filterAll: function(){___jdce_logger("/js/views/app-view.js", 8);},

		// Generate the attributes for a new Todo item.
		newAttributes: function(){___jdce_logger("/js/views/app-view.js", 9);},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function(){___jdce_logger("/js/views/app-view.js", 10);},

		// Clear all completed todo items, destroying their models.
		clearCompleted: function(){___jdce_logger("/js/views/app-view.js", 11);},

		toggleAllComplete: function(){___jdce_logger("/js/views/app-view.js", 12);}
	});
})();
