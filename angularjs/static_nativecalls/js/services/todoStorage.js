/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
	.factory('todoStorage', function ($http, $injector) {___jdce_logger("/js/services/todoStorage.js", 0);
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {___jdce_logger("/js/services/todoStorage.js", 1);
				return $injector.get('api');
			}, function () {___jdce_logger("/js/services/todoStorage.js", 2);
				return $injector.get('localStorage');
			});
	})

	.factory('api', function ($resource) {___jdce_logger("/js/services/todoStorage.js", 3);
		'use strict';

		var store = {
			todos: [],

			api: $resource('/api/todos/:id', null,
				{
					update: { method:'PUT' }
				}
			),

			clearCompleted: function () {___jdce_logger("/js/services/todoStorage.js", 4);
				var originalTodos = store.todos.slice(0);

				var incompleteTodos = store.todos.filter(function (todo) {___jdce_logger("/js/services/todoStorage.js", 5);
					return !todo.completed;
				});

				angular.copy(incompleteTodos, store.todos);

				return store.api.delete(function () {___jdce_logger("/js/services/todoStorage.js", 6);
					}, function error() {___jdce_logger("/js/services/todoStorage.js", 7);
						angular.copy(originalTodos, store.todos);
					});
			},

			delete: function (todo) {___jdce_logger("/js/services/todoStorage.js", 8);
				var originalTodos = store.todos.slice(0);

				store.todos.splice(store.todos.indexOf(todo), 1);
				return store.api.delete({ id: todo.id },
					function () {___jdce_logger("/js/services/todoStorage.js", 9);
					}, function error() {___jdce_logger("/js/services/todoStorage.js", 10);
						angular.copy(originalTodos, store.todos);
					});
			},

			get: function () {___jdce_logger("/js/services/todoStorage.js", 11);
				return store.api.query(function (resp) {___jdce_logger("/js/services/todoStorage.js", 12);
					angular.copy(resp, store.todos);
				});
			},

			insert: function (todo) {___jdce_logger("/js/services/todoStorage.js", 13);
				var originalTodos = store.todos.slice(0);

				return store.api.save(todo,
					function success(resp) {___jdce_logger("/js/services/todoStorage.js", 14);
						todo.id = resp.id;
						store.todos.push(todo);
					}, function error() {___jdce_logger("/js/services/todoStorage.js", 15);
						angular.copy(originalTodos, store.todos);
					})
					.$promise;
			},

			put: function (todo) {___jdce_logger("/js/services/todoStorage.js", 16);
				return store.api.update({ id: todo.id }, todo)
					.$promise;
			}
		};

		return store;
	})

	.factory('localStorage', function ($q) {___jdce_logger("/js/services/todoStorage.js", 17);
		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		var store = {
			todos: [],

			_getFromLocalStorage: function () {___jdce_logger("/js/services/todoStorage.js", 18);
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (todos) {___jdce_logger("/js/services/todoStorage.js", 19);
				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			},

			clearCompleted: function () {___jdce_logger("/js/services/todoStorage.js", 20);
				var deferred = $q.defer();

				var incompleteTodos = store.todos.filter(function (todo) {___jdce_logger("/js/services/todoStorage.js", 21);
					return !todo.completed;
				});

				angular.copy(incompleteTodos, store.todos);

				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			delete: function (todo) {___jdce_logger("/js/services/todoStorage.js", 22);
				var deferred = $q.defer();

				store.todos.splice(store.todos.indexOf(todo), 1);

				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			get: function () {___jdce_logger("/js/services/todoStorage.js", 23);
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			insert: function (todo) {___jdce_logger("/js/services/todoStorage.js", 24);
				var deferred = $q.defer();

				store.todos.push(todo);

				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			put: function (todo, index) {___jdce_logger("/js/services/todoStorage.js", 25);
				var deferred = $q.defer();

				store.todos[index] = todo;

				store._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			}
		};

		return store;
	});
