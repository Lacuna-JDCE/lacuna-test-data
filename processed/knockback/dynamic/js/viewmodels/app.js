/*global Knockback */
var app = app || {};

(function () {___jdce_logger("/js/viewmodels/app.js", 0);
	'use strict';

	var ENTER_KEY = 13;

	// Application View Model
	// ---------------

	// The application View Model is created and bound from the HTML using kb-inject.
	window.AppViewModel = kb.ViewModel.extend({
		constructor: function () {___jdce_logger("/js/viewmodels/app.js", 1);
			var self = this;
			kb.ViewModel.prototype.constructor.call(this);

			// New todo title.
			this.title = ko.observable('');

			// The function used for filtering is dynamically selected based on the filterMode.
			this.filterMode = ko.observable('');
			var filterFn = ko.computed(function () {___jdce_logger("/js/viewmodels/app.js", 2);
				switch (self.filterMode()) {
					case 'active':
						return (function (model) {___jdce_logger("/js/viewmodels/app.js", 3); return !model.get('completed'); });
					case 'completed':
						return (function (model) {___jdce_logger("/js/viewmodels/app.js", 4); return model.get('completed'); });
				};
				return (function () {___jdce_logger("/js/viewmodels/app.js", 5); return true; });
			});

			// A collectionObservable can be used to hold the instance of the collection.
			this.todos = kb.collectionObservable(new app.Todos(), app.TodoViewModel, {filters: filterFn});

			// Note: collectionObservables do not track nested model attribute changes by design to avoid
			// list redrawing when models change so changes need to be manually tracked and triggered.
			this.todoAttributesTrigger = kb.triggeredObservable(this.todos.collection(), 'change add remove');
			this.todoStats = ko.computed(function () {___jdce_logger("/js/viewmodels/app.js", 6);
				self.todoAttributesTrigger(); // manual dependency on model attribute changes
				return {
					tasksExist: !!self.todos.collection().length,
					completedCount: self.todos.collection().where({completed: true}).length,
					remainingCount: self.todos.collection().where({completed: false}).length
				};
			});

			// When the checkbox state is written to the observable, all of the models are updated
			this.toggleCompleted = ko.computed({
				read: function () {___jdce_logger("/js/viewmodels/app.js", 7); return !self.todoStats().remainingCount; },
				write: function (value) {___jdce_logger("/js/viewmodels/app.js", 8); self.todos.collection().each(function (model) {___jdce_logger("/js/viewmodels/app.js", 9); model.save({completed: value}); }); }
			});

			// Fetch the todos and the collectionObservable will update once the models are loaded
			this.todos.collection().fetch();

			// Use a Backbone router to update the filter mode
			new Backbone.Router().route('*filter', null, function (filter) {___jdce_logger("/js/viewmodels/app.js", 10); self.filterMode(filter || ''); });
			Backbone.history.start();
		},

		// Create a new model in the underlying collection and the observable will automatically synchronize
		onAddTodo: function (self, e) {___jdce_logger("/js/viewmodels/app.js", 11);
			if (e.keyCode === ENTER_KEY && $.trim(self.title())) {
				self.todos.collection().create({title: $.trim(self.title())});
				self.title('');
			}
		},

		// Operate on the underlying collection instead of the observable given the observable could be filtered
		onClearCompleted: function (self) {___jdce_logger("/js/viewmodels/app.js", 12); _.invoke(self.todos.collection().where({completed: true}), 'destroy'); },

		// Helper function to keep expressions out of markup
		getLabel: function (count) {___jdce_logger("/js/viewmodels/app.js", 13); return ko.utils.unwrapObservable(count) === 1 ? 'item' : 'items'; }
	});
})();
