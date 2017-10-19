/*global TodoMVC:true, Backbone, $ */

var TodoMVC = TodoMVC || {};

(function () {___jdce_logger("/js/TodoMVC.Router.js", 0);
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	// TodoList Router
	// ---------------
	//
	// Handles a single dynamic route to show
	// the active vs complete todo items
	TodoMVC.Router = Mn.AppRouter.extend({
		appRoutes: {
			'*filter': 'filterItems'
		}
	});

	// TodoList Controller (Mediator)
	// ------------------------------
	//
	// Control the workflow and logic that exists at the application
	// level, above the implementation detail of views and models
	TodoMVC.Controller = Mn.Object.extend({

		initialize: function () {___jdce_logger("/js/TodoMVC.Router.js", 1);
			this.todoList = new TodoMVC.TodoList();
		},

		// Start the app by showing the appropriate views
		// and fetching the list of todo items, if there are any
		start: function () {___jdce_logger("/js/TodoMVC.Router.js", 2);
			this.showHeader(this.todoList);
			this.showFooter(this.todoList);
			this.showTodoList(this.todoList);
			this.todoList.on('all', this.updateHiddenElements, this);
			this.todoList.fetch();
		},

		updateHiddenElements: function () {___jdce_logger("/js/TodoMVC.Router.js", 3);
			$('#main, #footer').toggle(!!this.todoList.length);
		},

		showHeader: function (todoList) {___jdce_logger("/js/TodoMVC.Router.js", 4);
			var header = new TodoMVC.HeaderLayout({
				collection: todoList
			});
			TodoMVC.App.root.showChildView('header', header);
		},

		showFooter: function (todoList) {___jdce_logger("/js/TodoMVC.Router.js", 5);
			var footer = new TodoMVC.FooterLayout({
				collection: todoList
			});
			TodoMVC.App.root.showChildView('footer', footer);
		},

		showTodoList: function (todoList) {___jdce_logger("/js/TodoMVC.Router.js", 6);
			TodoMVC.App.root.showChildView('main', new TodoMVC.ListView({
				collection: todoList
			}));
		},

		// Set the filter to show complete or all items
		filterItems: function (filter) {___jdce_logger("/js/TodoMVC.Router.js", 7);
			var newFilter = filter && filter.trim() || 'all';
			filterChannel.request('filterState').set('filter', newFilter);
		}
	});
})();
