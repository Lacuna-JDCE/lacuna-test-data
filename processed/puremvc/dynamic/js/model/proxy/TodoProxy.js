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

		saveData: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 2);
			var storageObject = { todos:this.todos, filter:this.filter };
			localStorage.setItem( this.LOCAL_STORAGE, JSON.stringify( storageObject ) );
		},

		computeStats: function(){___jdce_logger("/js/model/proxy/TodoProxy.js", 3);},

		filterTodos: function ( filter ) {___jdce_logger("/js/model/proxy/TodoProxy.js", 4);
			var i;
			this.filter = filter;
			this.saveData();

			i = this.todos.length,
				filtered = [];

			while ( i-- ) {
				if ( filter === todomvc.AppConstants.FILTER_ALL ) {
					filtered.push( this.todos[ i ] );
				} else if ( this.todos[i].completed === true && filter === todomvc.AppConstants.FILTER_COMPLETED ) {
					filtered.push( this.todos[ i ] );
				} else if ( this.todos[i].completed === false && filter === todomvc.AppConstants.FILTER_ACTIVE ) {
					filtered.push( this.todos[ i ] );
				}
			}

			this.sendNotification( todomvc.AppConstants.TODOS_FILTERED, { todos:filtered, stats:this.stats, filter:this.filter } );
		},

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
