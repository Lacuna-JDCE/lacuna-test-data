/// <reference path='../_all.ts' />
var todos;
(function (todos) {___jdce_logger("/js/Application.js", 0);
    'use strict';
    var TodoItem = (function () {___jdce_logger("/js/Application.js", 1);
        function TodoItem(title, completed) {___jdce_logger("/js/Application.js", 2);
            this.title = title;
            this.completed = completed;
        }
        return TodoItem;
    })();
    todos.TodoItem = TodoItem;
})(todos || (todos = {}));
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
/// <reference path='../_all.ts' />
var todos;
(function (todos) {___jdce_logger("/js/Application.js", 3);
    'use strict';
    /**
     * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
     */
    function todoFocus($timeout) {___jdce_logger("/js/Application.js", 4);
        return {
            link: function ($scope, element, attributes) {___jdce_logger("/js/Application.js", 5);
                $scope.$watch(attributes.todoFocus, function (newval) {___jdce_logger("/js/Application.js", 6);
                    if (newval) {
                        $timeout(function () {___jdce_logger("/js/Application.js", 7); return element[0].focus(); }, 0, false);
                    }
                });
            }
        };
    }
    todos.todoFocus = todoFocus;
    todoFocus.$inject = ['$timeout'];
})(todos || (todos = {}));
/// <reference path='../_all.ts' />
var todos;
(function (todos) {___jdce_logger("/js/Application.js", 8);
    'use strict';
    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    function todoBlur() {___jdce_logger("/js/Application.js", 9);
        return {
            link: function ($scope, element, attributes) {___jdce_logger("/js/Application.js", 10);
                element.bind('blur', function () {___jdce_logger("/js/Application.js", 11); $scope.$apply(attributes.todoBlur); });
                $scope.$on('$destroy', function () {___jdce_logger("/js/Application.js", 12); element.unbind('blur'); });
            }
        };
    }
    todos.todoBlur = todoBlur;
})(todos || (todos = {}));
/// <reference path='../_all.ts' />
var todos;
(function (todos) {___jdce_logger("/js/Application.js", 13);
    'use strict';
    var ESCAPE_KEY = 27;
    /**
     * Directive that cancels editing a todo if the user presses the Esc key.
     */
    function todoEscape() {___jdce_logger("/js/Application.js", 14);
        return {
            link: function ($scope, element, attributes) {___jdce_logger("/js/Application.js", 15);
                element.bind('keydown', function (event) {___jdce_logger("/js/Application.js", 16);
                    if (event.keyCode === ESCAPE_KEY) {
                        $scope.$apply(attributes.todoEscape);
                    }
                });
                $scope.$on('$destroy', function () {___jdce_logger("/js/Application.js", 17); element.unbind('keydown'); });
            }
        };
    }
    todos.todoEscape = todoEscape;
})(todos || (todos = {}));
/// <reference path='../_all.ts' />
var todos;
(function (todos_1) {___jdce_logger("/js/Application.js", 18);
    'use strict';
    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    var TodoStorage = (function () {___jdce_logger("/js/Application.js", 19);
        function TodoStorage() {___jdce_logger("/js/Application.js", 20);
            this.STORAGE_ID = 'todos-angularjs-typescript';
        }
        TodoStorage.prototype.get = function () {___jdce_logger("/js/Application.js", 21);
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        };
        TodoStorage.prototype.put = function (todos) {___jdce_logger("/js/Application.js", 22);
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        };
        return TodoStorage;
    })();
    todos_1.TodoStorage = TodoStorage;
})(todos || (todos = {}));
/// <reference path='../_all.ts' />
var todos;
(function (todos) {___jdce_logger("/js/Application.js", 23);
    'use strict';
    /**
     * The main controller for the app. The controller:
     * - retrieves and persists the model via the todoStorage service
     * - exposes the model to the template and provides event handlers
     */
    var TodoCtrl = (function () {___jdce_logger("/js/Application.js", 24);
        // dependencies are injected via AngularJS $injector
        // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
        function TodoCtrl($scope, $location, todoStorage, filterFilter) {___jdce_logger("/js/Application.js", 25);
            var _this = this;
            this.$scope = $scope;
            this.$location = $location;
            this.todoStorage = todoStorage;
            this.filterFilter = filterFilter;
            this.todos = $scope.todos = todoStorage.get();
            $scope.newTodo = '';
            $scope.editedTodo = null;
            // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
            // for its methods to be accessible from view / HTML
            $scope.vm = this;
            // watching for events/changes in scope, which are caused by view/user input
            // if you subscribe to scope or event with lifetime longer than this controller, make sure you unsubscribe.
            $scope.$watch('todos', function () {___jdce_logger("/js/Application.js", 26); return _this.onTodos(); }, true);
            $scope.$watch('location.path()', function (path) {___jdce_logger("/js/Application.js", 27); return _this.onPath(path); });
            if ($location.path() === '')
                $location.path('/');
            $scope.location = $location;
        }
        TodoCtrl.prototype.onPath = function (path) {___jdce_logger("/js/Application.js", 28);
            this.$scope.statusFilter = (path === '/active') ?
                { completed: false } : (path === '/completed') ?
                { completed: true } : {};
        };
        TodoCtrl.prototype.onTodos = function () {___jdce_logger("/js/Application.js", 29);
            this.$scope.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
            this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
            this.$scope.allChecked = !this.$scope.remainingCount;
            this.todoStorage.put(this.todos);
        };
        TodoCtrl.prototype.addTodo = function () {___jdce_logger("/js/Application.js", 30);
            var newTodo = this.$scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }
            this.todos.push(new todos.TodoItem(newTodo, false));
            this.$scope.newTodo = '';
        };
        TodoCtrl.prototype.editTodo = function (todoItem) {___jdce_logger("/js/Application.js", 31);
            this.$scope.editedTodo = todoItem;
            // Clone the original todo in case editing is cancelled.
            this.$scope.originalTodo = angular.extend({}, todoItem);
        };
        TodoCtrl.prototype.revertEdits = function (todoItem) {___jdce_logger("/js/Application.js", 32);
            this.todos[this.todos.indexOf(todoItem)] = this.$scope.originalTodo;
            this.$scope.reverted = true;
        };
        TodoCtrl.prototype.doneEditing = function (todoItem) {___jdce_logger("/js/Application.js", 33);
            this.$scope.editedTodo = null;
            this.$scope.originalTodo = null;
            if (this.$scope.reverted) {
                // Todo edits were reverted, don't save.
                this.$scope.reverted = null;
                return;
            }
            todoItem.title = todoItem.title.trim();
            if (!todoItem.title) {
                this.removeTodo(todoItem);
            }
        };
        TodoCtrl.prototype.removeTodo = function (todoItem) {___jdce_logger("/js/Application.js", 34);
            this.todos.splice(this.todos.indexOf(todoItem), 1);
        };
        TodoCtrl.prototype.clearDoneTodos = function () {___jdce_logger("/js/Application.js", 35);
            this.$scope.todos = this.todos = this.todos.filter(function (todoItem) {___jdce_logger("/js/Application.js", 36); return !todoItem.completed; });
        };
        TodoCtrl.prototype.markAll = function (completed) {___jdce_logger("/js/Application.js", 37);
            this.todos.forEach(function (todoItem) {___jdce_logger("/js/Application.js", 38); todoItem.completed = completed; });
        };
        // $inject annotation.
        // It provides $injector with information about dependencies to be injected into constructor
        // it is better to have it close to the constructor, because the parameters must match in count and type.
        // See http://docs.angularjs.org/guide/di
        TodoCtrl.$inject = [
            '$scope',
            '$location',
            'todoStorage',
            'filterFilter'
        ];
        return TodoCtrl;
    })();
    todos.TodoCtrl = TodoCtrl;
})(todos || (todos = {}));
/// <reference path='_all.ts' />
/**
 * The main TodoMVC app module.
 *
 * @type {angular.Module}
 */
var todos;
(function (todos) {___jdce_logger("/js/Application.js", 39);
    'use strict';
    var todomvc = angular.module('todomvc', [])
        .controller('todoCtrl', todos.TodoCtrl)
        .directive('todoBlur', todos.todoBlur)
        .directive('todoFocus', todos.todoFocus)
        .directive('todoEscape', todos.todoEscape)
        .service('todoStorage', todos.TodoStorage);
})(todos || (todos = {}));
/// <reference path='libs/jquery/jquery.d.ts' />
/// <reference path='libs/angular/angular.d.ts' />
/// <reference path='models/TodoItem.ts' />
/// <reference path='interfaces/ITodoScope.ts' />
/// <reference path='interfaces/ITodoStorage.ts' />
/// <reference path='directives/TodoFocus.ts' />
/// <reference path='directives/TodoBlur.ts' />
/// <reference path='directives/TodoEscape.ts' />
/// <reference path='services/TodoStorage.ts' />
/// <reference path='controllers/TodoCtrl.ts' />
/// <reference path='Application.ts' />
//# sourceMappingURL=Application.js.map