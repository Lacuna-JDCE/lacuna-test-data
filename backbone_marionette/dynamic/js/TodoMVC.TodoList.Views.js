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

		className: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 1);},

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

		deleteModel: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 2);},

		toggle: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 3);},

		onEditClick: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 4);},

		onEditFocusout: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 5);},

		onEditKeypress: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 6);}
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

		filter: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 7);}
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
			function reduceCompleted(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 10);}

			var allCompleted = this.collection.reduce(reduceCompleted, true);
			this.ui.toggle.prop('checked', allCompleted);
			this.$el.parent().toggle(!!this.collection.length);
		},

		onToggleAllClick: function(){___jdce_logger("/js/TodoMVC.TodoList.Views.js", 11);},

		onRender: function () {___jdce_logger("/js/TodoMVC.TodoList.Views.js", 12);
			this.showChildView('listBody', new TodoMVC.ListViewBody({
				collection: this.collection
			}));
		}
	});
})();
