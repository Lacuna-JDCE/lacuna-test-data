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

		onRegister: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 0);
			this.loadData();
		},

		loadData: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 1);
			var storageObject;
			if ( !localStorage.getItem( this.LOCAL_STORAGE ) ) {
				this.saveData();
			}
			storageObject = JSON.parse( localStorage.getItem( this.LOCAL_STORAGE ) );
			this.todos = storageObject.todos;
			this.filter = storageObject.filter;
			this.computeStats();
		},

		saveData: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 2);
			var storageObject = { todos:this.todos, filter:this.filter };
			localStorage.setItem( this.LOCAL_STORAGE, JSON.stringify( storageObject ) );
		},

		computeStats: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 3);
			this.stats.totalTodo        = this.todos.length;
			this.stats.todoCompleted    = this.getCompletedCount();
			this.stats.todoLeft         = this.stats.totalTodo - this.stats.todoCompleted;
		},

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

		todosModified: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 5);
			this.computeStats();
			this.filterTodos( this.filter );
		},

		removeTodosCompleted: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 6);
			var i = this.todos.length;
			while ( i-- ) {
				if ( this.todos[ i ].completed ) {
					this.todos.splice( i, 1 );
				}
			}
			this.todosModified();
		},

		deleteTodo: function( id ) {___jdce_logger("/js/model/proxy/TodoProxy.js", 7);
			var i = this.todos.length;
			while ( i-- ) {
				if ( this.todos[i].id === id ) {
					this.todos.splice(i, 1);
				}
			}
			this.todosModified();
		},

		toggleCompleteStatus: function( status ) {___jdce_logger("/js/model/proxy/TodoProxy.js", 8);
			var i = this.todos.length;
			while ( i-- ) {
				this.todos[ i ].completed = status;
			}
			this.todosModified();
		},

		updateTodo: function( todo ) {___jdce_logger("/js/model/proxy/TodoProxy.js", 9);
			var i = this.todos.length;
			while ( i-- ) {
				if ( this.todos[ i ].id === todo.id ) {
					 this.todos[ i ].title = todo.title;
					 this.todos[ i ].completed = todo.completed;
				}
			}
			this.todosModified();
		},

		addTodo: function( newTodo ) {___jdce_logger("/js/model/proxy/TodoProxy.js", 10);
			newTodo.id = this.getUuid();
			this.todos.unshift( newTodo );
			this.todosModified();
		},

		getCompletedCount: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 11);
			var i = this.todos.length,
				completed = 0;

			while ( i-- ) {
				if ( this.todos[ i ].completed ) {
					completed++;
				}
			}
			return completed;
		},

		getUuid: function() {___jdce_logger("/js/model/proxy/TodoProxy.js", 12);
			var i, random, uuid = '';

			for ( i = 0; i < 32; i++ ) {
				random = Math.random() * 16 | 0;
				if ( i === 8 || i === 12 || i === 16 || i === 20 ) {
					uuid += '-';
				}
				uuid += ( i === 12 ? 4 : (i === 16 ? ( random & 3 | 8 ) : random) ).toString( 16 );
			}
			return uuid;
		}
	},

	// CLASS MEMBERS
	{
		NAME: 'TodoProxy'
	}
);
