/*global jQuery, Handlebars, Router */
jQuery(function ($) {___jdce_logger("/js/app.js", 0);
	'use strict';

	Handlebars.registerHelper('eq', function(){___jdce_logger("/js/app.js", 1);});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var util = {
		uuid: function () {___jdce_logger("/js/app.js", 2);
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {___jdce_logger("/js/app.js", 3);
			return count === 1 ? word : word + 's';
		},
		store: function (namespace, data) {___jdce_logger("/js/app.js", 4);
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};

	var App = {
		init: function () {___jdce_logger("/js/app.js", 5);
			this.todos = util.store('todos-jquery');
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.bindEvents();

			new Router({
				'/:filter': function (filter) {___jdce_logger("/js/app.js", 6);
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');
		},
		bindEvents: function () {___jdce_logger("/js/app.js", 7);
			$('#new-todo').on('keyup', this.create.bind(this));
			$('#toggle-all').on('change', this.toggleAll.bind(this));
			$('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
			$('#todo-list')
				.on('change', '.toggle', this.toggle.bind(this))
				.on('dblclick', 'label', this.editingMode.bind(this))
				.on('keyup', '.edit', this.editKeyup.bind(this))
				.on('focusout', '.edit', this.update.bind(this))
				.on('click', '.destroy', this.destroy.bind(this));
		},
		render: function () {___jdce_logger("/js/app.js", 8);
			var todos = this.getFilteredTodos();
			$('#todo-list').html(this.todoTemplate(todos));
			$('#main').toggle(todos.length > 0);
			$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
			this.renderFooter();
			$('#new-todo').focus();
			util.store('todos-jquery', this.todos);
		},
		renderFooter: function () {___jdce_logger("/js/app.js", 9);
			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			$('#footer').toggle(todoCount > 0).html(template);
		},
		toggleAll: function (e) {___jdce_logger("/js/app.js", 10);
			var isChecked = $(e.target).prop('checked');

			this.todos.forEach(function (todo) {___jdce_logger("/js/app.js", 11);
				todo.completed = isChecked;
			});

			this.render();
		},
		getActiveTodos: function () {___jdce_logger("/js/app.js", 12);
			return this.todos.filter(function (todo) {___jdce_logger("/js/app.js", 13);
				return !todo.completed;
			});
		},
		getCompletedTodos: function () {___jdce_logger("/js/app.js", 14);
			return this.todos.filter(function (todo) {___jdce_logger("/js/app.js", 15);
				return todo.completed;
			});
		},
		getFilteredTodos: function () {___jdce_logger("/js/app.js", 16);
			if (this.filter === 'active') {
				return this.getActiveTodos();
			}

			if (this.filter === 'completed') {
				return this.getCompletedTodos();
			}

			return this.todos;
		},
		destroyCompleted: function () {___jdce_logger("/js/app.js", 17);
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		getIndexFromEl: function (el) {___jdce_logger("/js/app.js", 18);
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		create: function (e) {___jdce_logger("/js/app.js", 19);
			var $input = $(e.target);
			var val = $input.val().trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			this.todos.push({
				id: util.uuid(),
				title: val,
				completed: false
			});

			$input.val('');

			this.render();
		},
		toggle: function (e) {___jdce_logger("/js/app.js", 20);
			var i = this.getIndexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.render();
		},
		editingMode: function (e) {___jdce_logger("/js/app.js", 21);
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			$input.val($input.val()).focus();
		},
		editKeyup: function (e) {___jdce_logger("/js/app.js", 22);
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
		},
		update: function (e) {___jdce_logger("/js/app.js", 23);
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim();

			if (!val) {
				this.destroy(e);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos[this.getIndexFromEl(el)].title = val;
			}

			this.render();
		},
		destroy: function (e) {___jdce_logger("/js/app.js", 24);
			this.todos.splice(this.getIndexFromEl(e.target), 1);
			this.render();
		}
	};

	App.init();
});
