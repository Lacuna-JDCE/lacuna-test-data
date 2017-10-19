/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {___jdce_logger("/js/views/todo-view.js", 0);
	'use strict';

	// Todo Item View
	// --------------

	// The DOM element for a todo item...
	app.TodoView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'keydown .edit': 'revertOnEscape',
			'blur .edit': 'close'
		},

		// The TodoView listens for changes to its model, re-rendering. Since
		// there's a one-to-one correspondence between a **Todo** and a
		// **TodoView** in this app, we set a direct reference on the model for
		// convenience.
		initialize: function(){___jdce_logger("/js/views/todo-view.js", 1);},

		// Re-render the titles of the todo item.
		render: function () {___jdce_logger("/js/views/todo-view.js", 2);
			// Backbone LocalStorage is adding `id` attribute instantly after
			// creating a model.  This causes our TodoView to render twice. Once
			// after creating a model and once on `id` change.  We want to
			// filter out the second redundant render, which is caused by this
			// `id` change.  It's known Backbone LocalStorage bug, therefore
			// we've to create a workaround.
			// https://github.com/tastejs/todomvc/issues/469
			if (this.model.changed.id !== undefined) {
				return;
			}

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},

		toggleVisible: function () {___jdce_logger("/js/views/todo-view.js", 3);
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {___jdce_logger("/js/views/todo-view.js", 4);
			return this.model.get('completed') ?
				app.TodoFilter === 'active' :
				app.TodoFilter === 'completed';
		},

		// Toggle the `"completed"` state of the model.
		toggleCompleted: function(){___jdce_logger("/js/views/todo-view.js", 5);},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function(){___jdce_logger("/js/views/todo-view.js", 6);},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function () {___jdce_logger("/js/views/todo-view.js", 7);
			var value = this.$input.val();
			var trimmedValue = value.trim();

			// We don't want to handle blur events from an item that is no
			// longer being edited. Relying on the CSS class here has the
			// benefit of us not having to maintain state in the DOM and the
			// JavaScript logic.
			if (!this.$el.hasClass('editing')) {
				return;
			}

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function(){___jdce_logger("/js/views/todo-view.js", 8);},

		// If you're pressing `escape` we revert your change by simply leaving
		// the `editing` state.
		revertOnEscape: function(){___jdce_logger("/js/views/todo-view.js", 9);},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {___jdce_logger("/js/views/todo-view.js", 10);
			this.model.destroy();
		}
	});
})(jQuery);
