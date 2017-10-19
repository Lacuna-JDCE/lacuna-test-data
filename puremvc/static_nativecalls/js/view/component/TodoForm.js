/**
 * @author Mike Britton, Cliff Hall
 *
 * @class TodoForm
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
		name: 'todomvc.view.component.TodoForm',
		constructor: function(){___jdce_logger("/js/view/component/TodoForm.js", 0);}
	},

	// INSTANCE MEMBERS
	{
			ENTER_KEY: 13,
			ESC_KEY: 27,

			addEventListener: function ( type, listener, useCapture ){___jdce_logger("/js/view/component/TodoForm.js", 1);
				todomvc.view.event.AppEvents.addEventListener ( this.todoApp, type, listener, useCapture );
			},

			createEvent: function(){___jdce_logger("/js/view/component/TodoForm.js", 2);},

			dispatchEvent: function(){___jdce_logger("/js/view/component/TodoForm.js", 3);},

			abandonEditTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 4);},

			dispatchToggleComplete: function(){___jdce_logger("/js/view/component/TodoForm.js", 5);},

			dispatchToggleCompleteAll: function(){___jdce_logger("/js/view/component/TodoForm.js", 6);},

			dispatchClearCompleted: function(){___jdce_logger("/js/view/component/TodoForm.js", 7);},

			dispatchDelete: function(){___jdce_logger("/js/view/component/TodoForm.js", 8);},

			dispatchAddTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 9);},

			dispatchUpdateTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 10);},

			setFilteredTodoList: function(){___jdce_logger("/js/view/component/TodoForm.js", 11);},

			getTodoById: function(){___jdce_logger("/js/view/component/TodoForm.js", 12);},

			updateFilter: function(){___jdce_logger("/js/view/component/TodoForm.js", 13);},

			updateToggleAllCheckbox: function(){___jdce_logger("/js/view/component/TodoForm.js", 14);},

			updateClearButton: function(){___jdce_logger("/js/view/component/TodoForm.js", 15);},

			updateTodoCount: function(){___jdce_logger("/js/view/component/TodoForm.js", 16);}
	},

	// STATIC MEMBERS
	{
		NAME: 'TodoForm',
	}
);
