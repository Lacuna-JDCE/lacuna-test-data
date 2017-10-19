/**
 * @author Mike Britton, Cliff Hall
 *
 * @class TodoProxy
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 *
 */
puremvc.define({
		name: 'todomvc.model.proxy.TodoProxy',
		parent: puremvc.Proxy
	},

	// INSTANCE MEMBERS
	{
		todos: [],
		stats: {},
		filter: todomvc.AppConstants.FILTER_ALL,
		LOCAL_STORAGE: 'todos-puremvc',

		onRegister: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 0);},

		loadData: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 1);},

		saveData: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 2);},

		computeStats: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 3);},

		filterTodos: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 4);},

		todosModified: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 5);},

		removeTodosCompleted: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 6);},

		deleteTodo: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 7);},

		toggleCompleteStatus: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 8);},

		updateTodo: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 9);},

		addTodo: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 10);},

		getCompletedCount: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 11);},

		getUuid: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 12);}
	},

	// CLASS MEMBERS
	{
		NAME: 'TodoProxy'
	}
);
