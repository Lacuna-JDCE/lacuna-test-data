/*global TodoMVC: true, Backbone */

var TodoMVC = TodoMVC || {};

(function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 0);
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	// Todo List Item View
	// -------------------
	//
	// Display an individual todo item, and respond to changes
	// that are made to the item, including marking completed.
	TodoMVC.TodoView = Mn.View.extend({

		tagName: 'li',

		template: '#template-todoItemView',

		className: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 1);
			return this.model.get('completed') ? 'completed' : 'active';
		},

		ui: {
			edit: '.edit',
			destroy: '.destroy',
			label: 'label',
			toggle: '.toggle'
		},

		events: {
			'click @ui.destroy': 'deleteModel',
			'dblclick @ui.label': 'onEditClick',
			'keydown @ui.edit': 'onEditKeypress',
			'focusout @ui.edit': 'onEditFocusout',
			'click @ui.toggle': 'toggle'
		},

		modelEvents: {
			change: 'render'
		},

		deleteModel: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 2);
			this.model.destroy();
		},

		toggle: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 3);
			this.model.toggle().save();
		},

		onEditClick: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 4);
			this.$el.addClass('editing');
			this.ui.edit.focus();
			this.ui.edit.val(this.ui.edit.val());
		},

		onEditFocusout: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 5);
			var todoText = this.ui.edit.val().trim();
			if (todoText) {
				this.model.set('title', todoText).save();
				this.$el.removeClass('editing');
			} else {
				this.destroy();
			}
		},

		onEditKeypress: function (e) {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 6);
			var ENTER_KEY = 13;
			var ESC_KEY = 27;

			if (e.which === ENTER_KEY) {
				this.onEditFocusout();
				return;
			}

			if (e.which === ESC_KEY) {
				this.ui.edit.val(this.model.get('title'));
				this.$el.removeClass('editing');
			}
		}
	});

	// Item List View Body
	// --------------
	//
	// Controls the rendering of the list of items, including the
	// filtering of items for display.
	TodoMVC.ListViewBody = Mn.CollectionView.extend({
		tagName: 'ul',

		id: 'todo-list',

		childView: TodoMVC.TodoView,

		filter: function (child) {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 7);
			var filteredOn = filterChannel.request('filterState').get('filter');
			return child.matchesFilter(filteredOn);
		}
	});

	// Item List View
	// --------------
	//
	// Manages List View
	TodoMVC.ListView = Mn.View.extend({

		template: '#template-todoListView',

		regions: {
			listBody: {
				el: 'ul',
				replaceElement: true
			}
		},

		ui: {
			toggle: '#toggle-all'
		},

		events: {
			'click @ui.toggle': 'onToggleAllClick'
		},

		collectionEvents: {
			'change:completed': 'render',
			all: 'setCheckAllState'
		},

		initialize: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 8);
			this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
		},

		setCheckAllState: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 9);
			function reduceCompleted(left, right) {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 10);
				return left && right.get('completed');
			}

			var allCompleted = this.collection.reduce(reduceCompleted, true);
			this.ui.toggle.prop('checked', allCompleted);
			this.$el.parent().toggle(!!this.collection.length);
		},

		onToggleAllClick: function (e) {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 11);
			var isChecked = e.currentTarget.checked;

			this.collection.each(function (todo) {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 12);
				todo.save({ completed: isChecked });
			});
		},

		onRender: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 13);
			this.showChildView('listBody', new TodoMVC.ListViewBody({
				collection: this.collection
			}));
		}
	});
})();
