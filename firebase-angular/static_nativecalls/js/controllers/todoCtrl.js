/*global todomvc, angular, Firebase */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the $firebaseArray service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, $firebaseArray) {___jdce_logger("/js/controllers/todoCtrl.js", 0);
	var url = 'https://todomvc-angular.firebaseio.com/todos';
	var fireRef = new Firebase(url);

	// Bind the todos to the firebase provider.
	$scope.todos = $firebaseArray(fireRef);
	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.$watch('todos', function () {___jdce_logger("/js/controllers/todoCtrl.js", 1);
		var total = 0;
		var remaining = 0;
		$scope.todos.forEach(function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 2);
			// Skip invalid entries so they don't break the entire app.
			if (!todo || !todo.title) {
				return;
			}

			total++;
			if (todo.completed === false) {
				remaining++;
			}
		});
		$scope.totalCount = total;
		$scope.remainingCount = remaining;
		$scope.completedCount = total - remaining;
		$scope.allChecked = remaining === 0;
	}, true);

	$scope.addTodo = function () {___jdce_logger("/js/controllers/todoCtrl.js", 3);
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}
		$scope.todos.$add({
			title: newTodo,
			completed: false
		});
		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 4);
		$scope.editedTodo = todo;
		$scope.originalTodo = angular.extend({}, $scope.editedTodo);
	};

	$scope.doneEditing = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 5);
		$scope.editedTodo = null;
		var title = todo.title.trim();
		if (title) {
			$scope.todos.$save(todo);
		} else {
			$scope.removeTodo(todo);
		}
	};

	$scope.revertEditing = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 6);
		todo.title = $scope.originalTodo.title;
		$scope.doneEditing(todo);
	};

	$scope.removeTodo = function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 7);
		$scope.todos.$remove(todo);
	};

	$scope.clearCompletedTodos = function () {___jdce_logger("/js/controllers/todoCtrl.js", 8);
		$scope.todos.forEach(function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 9);
			if (todo.completed) {
				$scope.removeTodo(todo);
			}
		});
	};

	$scope.markAll = function (allCompleted) {___jdce_logger("/js/controllers/todoCtrl.js", 10);
		$scope.todos.forEach(function (todo) {___jdce_logger("/js/controllers/todoCtrl.js", 11);
			todo.completed = allCompleted;
			$scope.todos.$save(todo);
		});
	};

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;
});
