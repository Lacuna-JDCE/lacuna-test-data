/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc')
	.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, store) {___jdce_logger("/js/controllers/todoCtrl.js", 0);
		'use strict';

		var todos = $scope.todos = store.todos;

		$scope.newTodo = '';
		$scope.editedTodo = null;

		$scope.$watch('todos', function () {___jdce_logger("/js/controllers/todoCtrl.js", 1);
			$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
			$scope.completedCount = todos.length - $scope.remainingCount;
			$scope.allChecked = !$scope.remainingCount;
		}, true);

		// Monitor the current route for changes and adjust the filter accordingly.
		$scope.$on('$routeChangeSuccess', function () {___jdce_logger("/js/controllers/todoCtrl.js", 2);
			var status = $scope.status = $routeParams.status || '';
			$scope.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});

		$scope.addTodo = function () {___jdce_logger("/js/controllers/todoCtrl.js", 3);
			var newTodo = {
				title: $scope.newTodo.trim(),
				completed: false
			};

			if (!newTodo.title) {
				return;
			}

			$scope.saving = true;
			store.insert(newTodo)
				.then(function success() {___jdce_logger("/js/controllers/todoCtrl.js", 4);
					$scope.newTodo = '';
				})
				.finally(function () {___jdce_logger("/js/controllers/todoCtrl.js", 5);
					$scope.saving = false;
				});
		};

		$scope.editTodo = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 6);
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.saveEdits = function (todo, event) {___jdce_logger("/js/controllers/todoCtrl.js", 7);
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			$scope.saveEvent = event;

			if ($scope.reverted) {
				// Todo edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			todo.title = todo.title.trim();

			if (todo.title === $scope.originalTodo.title) {
				$scope.editedTodo = null;
				return;
			}

			store[todo.title ? 'put' : 'delete'](todo)
				.then(function success() {___jdce_logger("/js/controllers/todoCtrl.js", 8);}, function error() {___jdce_logger("/js/controllers/todoCtrl.js", 9);
					todo.title = $scope.originalTodo.title;
				})
				.finally(function () {___jdce_logger("/js/controllers/todoCtrl.js", 10);
					$scope.editedTodo = null;
				});
		};

		$scope.revertEdits = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 11);
			todos[todos.indexOf(todo)] = $scope.originalTodo;
			$scope.editedTodo = null;
			$scope.originalTodo = null;
			$scope.reverted = true;
		};

		$scope.removeTodo = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 12);
			store.delete(todo);
		};

		$scope.saveTodo = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 13);
			store.put(todo);
		};

		$scope.toggleCompleted = function (todo, completed) {___jdce_logger("/js/controllers/todoCtrl.js", 14);
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			store.put(todo, todos.indexOf(todo))
				.then(function success() {___jdce_logger("/js/controllers/todoCtrl.js", 15);}, function error() {___jdce_logger("/js/controllers/todoCtrl.js", 16);
					todo.completed = !todo.completed;
				});
		};

		$scope.clearCompletedTodos = function () {___jdce_logger("/js/controllers/todoCtrl.js", 17);
			store.clearCompleted();
		};

		$scope.markAll = function (completed) {___jdce_logger("/js/controllers/todoCtrl.js", 18);
			todos.forEach(function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 19);
				if (todo.completed !== completed) {
					$scope.toggleCompleted(todo, completed);
				}
			});
		};
	});
