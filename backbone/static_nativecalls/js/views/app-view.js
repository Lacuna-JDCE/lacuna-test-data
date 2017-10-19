/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {___jdce_logger("/js/views/app-view.js", 0);
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '.todoapp',

		// Our template for the line of statistics at the bottom of the app.
		statsTemplate: _.template($('#stats-template').html()),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress .new-todo': 'createOnEnter',
			'click .clear-completed': 'clearCompleted',
			'click .toggle-all': 'toggleAllComplete'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function(){___jdce_logger("/js/views/app-view.js", 1);},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {___jdce_logger("/js/views/app-view.js", 2);
			var completed = app.todos.completed().length;
			var remaining = app.todos.remaining().length;

			if (app.todos.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));

				this.$('.filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (app.TodoFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			this.allCheckbox.checked = !remaining;
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (todo) {___jdce_logger("/js/views/app-view.js", 3);
			var view = new app.TodoView({ model: todo });
			this.$list.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {___jdce_logger("/js/views/app-view.js", 4);
			this.$list.html('');
			app.todos.each(this.addOne, this);
		},

		filterOne: function (todo) {___jdce_logger("/js/views/app-view.js", 5);
			todo.trigger('visible');
		},

		filterAll: function () {___jdce_logger("/js/views/app-view.js", 6);
			app.todos.each(this.filterOne, this);
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function(){___jdce_logger("/js/views/app-view.js", 7);},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function(){___jdce_logger("/js/views/app-view.js", 8);},

		// Clear all completed todo items, destroying their models.
		clearCompleted: function(){___jdce_logger("/js/views/app-view.js", 9);},

		toggleAllComplete: function(){___jdce_logger("/js/views/app-view.js", 10);}
	});
})(jQuery);
