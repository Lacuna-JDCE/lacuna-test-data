/*global Knockback */
var app = app || {};

(function () {___jdce_logger("/js/viewmodels/todo.js", 0);
	'use strict';

	var ENTER_KEY = 13;
	var ESC_KEY = 27;

	// Todo View Model
	// ---------------

	app.TodoViewModel = kb.ViewModel.extend({
		constructor: function (model, options) {___jdce_logger("/js/viewmodels/todo.js", 1);
			// 'keys' option ensures two-way observables are created only for the title and completed attributes.
			// 'requires' option allows observables to be created for any attributes in addition to ensuring title and completed.
			// 'excludes' option blocks observables being created for specific attributes.
			kb.ViewModel.prototype.constructor.call(this, model, {keys: ['title', 'completed']}, options);

			// Use editTitle to delay updating model attributes until changes are accepted.
			this.editTitle = ko.observable();
			this.editing = ko.observable(false);

			// Subscribe to changes in completed so that they can be saved automatically
			this.completed.subscribe(function (completed) {___jdce_logger("/js/viewmodels/todo.js", 2); this.model().save({completed: completed}); }.bind(this));
		},

		onDestroy: function (self) {___jdce_logger("/js/viewmodels/todo.js", 3); self.model().destroy(); },

		// Start editing if not already editing.
		onCheckEditBegin: function (self) {___jdce_logger("/js/viewmodels/todo.js", 4);
			if (!self.editing()) {
				self.editTitle(self.title());
				self.editing(true);
				$('.todo-input').focus(); // give the input focus
			}
		},

		// Stop editing if already editing.
		onCheckEditEnd: function (self, event) {___jdce_logger("/js/viewmodels/todo.js", 5);
			if (self.editing()) {
				if (event.keyCode === ESC_KEY) {
					self.editing(false);
				}

				if ((event.keyCode === ENTER_KEY) || (event.type === 'blur')) {
					self.editing(false);

					// Save the editTitle in the model's title or delete the model if blank
					var title = self.editTitle();
					$.trim(title) ? self.model().save({title: $.trim(title)}) : self.model().destroy();
				}
			}
		}
	});
})();
