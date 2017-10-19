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

	$scope.$watch('todos', function(){___jdce_logger("/js/controllers/todoCtrl.js", 1);}, true);

	$scope.addTodo = function(){___jdce_logger("/js/controllers/todoCtrl.js", 2);};

	$scope.editTodo = function(){___jdce_logger("/js/controllers/todoCtrl.js", 3);};

	$scope.doneEditing = function(){___jdce_logger("/js/controllers/todoCtrl.js", 4);};

	$scope.revertEditing = function(){___jdce_logger("/js/controllers/todoCtrl.js", 5);};

	$scope.removeTodo = function(){___jdce_logger("/js/controllers/todoCtrl.js", 6);};

	$scope.clearCompletedTodos = function(){___jdce_logger("/js/controllers/todoCtrl.js", 7);};

	$scope.markAll = function(){___jdce_logger("/js/controllers/todoCtrl.js", 8);};

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location;
});
