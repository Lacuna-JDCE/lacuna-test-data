/*global TodoMVC:true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {___jdce_logger("/js/TodoMVC.Layout.js", 0);
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	TodoMVC.RootLayout = Mn.View.extend({

		el: '#todoapp',

		regions: {
			header: '#header',
			main: '#main',
			footer: '#footer'
		}
	});

	// Layout Header View
	// ------------------
	TodoMVC.HeaderLayout = Mn.View.extend({

		template: '#template-header',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			input: '#new-todo'
		},

		events: {
			'keypress @ui.input': 'onInputKeypress',
			'keyup @ui.input': 'onInputKeyup'
		},

		// According to the spec
		// If escape is pressed during the edit, the edit state should be left and any changes be discarded.
		onInputKeyup: function (e) {___jdce_logger("/js/TodoMVC.Layout.js", 1);
			var ESC_KEY = 27;

			if (e.which === ESC_KEY) {
				this.render();
			}
		},

		onInputKeypress: function (e) {___jdce_logger("/js/TodoMVC.Layout.js", 2);
			var ENTER_KEY = 13;
			var todoText = this.ui.input.val().trim();

			if (e.which === ENTER_KEY && todoText) {
				this.collection.create({
					title: todoText
				});
				this.ui.input.val('');
			}
		}
	});

	// Layout Footer View
	// ------------------
	TodoMVC.FooterLayout = Mn.View.extend({
		template: '#template-footer',

		// UI bindings create cached attributes that
		// point to jQuery selected objects
		ui: {
			filters: '#filters a',
			completed: '.completed a',
			active: '.active a',
			all: '.all a',
			summary: '#todo-count',
			clear: '#clear-completed'
		},

		events: {
			'click @ui.clear': 'onClearClick'
		},

		collectionEvents: {
			all: 'render'
		},

		templateContext: {
			activeCountLabel: function () {___jdce_logger("/js/TodoMVC.Layout.js", 3);
				return (this.activeCount === 1 ? 'item' : 'items') + ' left';
			}
		},

		initialize: function () {___jdce_logger("/js/TodoMVC.Layout.js", 4);
			this.listenTo(filterChannel.request('filterState'), 'change:filter', this.updateFilterSelection, this);
		},

		serializeData: function () {___jdce_logger("/js/TodoMVC.Layout.js", 5);
			var active = this.collection.getActive().length;
			var total = this.collection.length;

			return {
				activeCount: active,
				totalCount: total,
				completedCount: total - active
			};
		},

		onRender: function () {___jdce_logger("/js/TodoMVC.Layout.js", 6);
			this.$el.parent().toggle(this.collection.length > 0);
			this.updateFilterSelection();
		},

		updateFilterSelection: function () {___jdce_logger("/js/TodoMVC.Layout.js", 7);
			this.ui.filters.removeClass('selected');
			this.ui[filterChannel.request('filterState').get('filter')]
			.addClass('selected');
		},

		onClearClick: function () {___jdce_logger("/js/TodoMVC.Layout.js", 8);
			var completed = this.collection.getCompleted();
			completed.forEach(function (todo) {___jdce_logger("/js/TodoMVC.Layout.js", 9);
				todo.destroy();
			});
		}
	});
})();
