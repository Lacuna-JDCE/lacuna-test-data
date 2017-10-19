/*jshint quotmark:false */
/*jshint newcap:false */


var app = app || {};

(function () {___jdce_logger("/js/stores/todoStore.js", 0);
	'use strict';

	var Utils = app.Utils;
	var LOCALSTORAGE_NAMESPACE = 'react-alt-todo';

	var TodoStore = function () {___jdce_logger("/js/stores/todoStore.js", 1);
		this.state = {
			todos: Utils.store(LOCALSTORAGE_NAMESPACE + '.todos'),
			nowShowing: Utils.store(LOCALSTORAGE_NAMESPACE + '.nowShowing') || app.ALL_TODOS,
			editing: Utils.store(LOCALSTORAGE_NAMESPACE + '.editing') || null
		};

		this.bindListeners({
			addTodo: app.todoActions.addTodo,
			toggleAll: app.todoActions.toggleAll,
			toggle: app.todoActions.toggle,
			destroy: app.todoActions.destroy,
			save: app.todoActions.save,
			clearCompleted: app.todoActions.clearCompleted,
			edit: app.todoActions.edit,
			show: app.todoActions.show
		});
	};

	TodoStore.prototype.addTodo = function (todo) {___jdce_logger("/js/stores/todoStore.js", 2);
		this.setState({
			todos: this.state.todos.concat(todo)
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	};

	TodoStore.prototype.toggleAll = function (checked) {___jdce_logger("/js/stores/todoStore.js", 3);
		var updatedTodos = this.state.todos.map(function (todo) {___jdce_logger("/js/stores/todoStore.js", 4);
			return Utils.extend({}, todo, {completed: checked});
		});

		this.setState({
			todos: updatedTodos
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	};

	TodoStore.prototype.toggle = function (todoToToggle) {___jdce_logger("/js/stores/todoStore.js", 5);
		var updatedTodos = this.state.todos.map(function (todo) {___jdce_logger("/js/stores/todoStore.js", 6);
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.setState({
			todos: updatedTodos
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	};

	TodoStore.prototype.destroy = function (todoToDestroy) {___jdce_logger("/js/stores/todoStore.js", 7);
		var updatedTodos = this.state.todos.filter(function (todo) {___jdce_logger("/js/stores/todoStore.js", 8);
			return todo !== todoToDestroy;
		});

		this.setState({
			todos: updatedTodos
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	};

	TodoStore.prototype.save = function (command) {___jdce_logger("/js/stores/todoStore.js", 9);
		var updatedTodos = this.state.todos.map(function (todo) {___jdce_logger("/js/stores/todoStore.js", 10);
			return todo !== command.todoToSave ?
				todo :
				Utils.extend({}, command.todoToSave, {title: command.text});
		});

		this.setState({
			todos: updatedTodos
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	};

	TodoStore.prototype.clearCompleted = function () {___jdce_logger("/js/stores/todoStore.js", 11);
		var updatedTodos = this.state.todos.filter(function (todo) {___jdce_logger("/js/stores/todoStore.js", 12);
			return !todo.completed;
		});

		this.setState({
			todos: updatedTodos
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	};

	TodoStore.prototype.edit = function (id) {___jdce_logger("/js/stores/todoStore.js", 13);
		this.setState({
			editing: id
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.editing', this.editing);
	};

	TodoStore.prototype.show = function (nowShowing) {___jdce_logger("/js/stores/todoStore.js", 14);
		this.setState({
			nowShowing: nowShowing
		});

		Utils.store(LOCALSTORAGE_NAMESPACE + '.nowShowing', this.nowShowing);
	};

	TodoStore.displayName = 'TodoStore';

	app.todoStore = app.alt.createStore(TodoStore);
})();
