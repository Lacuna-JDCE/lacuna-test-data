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

			createEvent: function( eventName ) {___jdce_logger("/js/view/component/TodoForm.js", 2);
			   return todomvc.view.event.AppEvents.createEvent( eventName );
			},

			dispatchEvent: function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 3);
			   todomvc.view.event.AppEvents.dispatchEvent( this.todoApp, event );
			},

			abandonEditTodo: function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 4);
				var todo, todoId, div, inputEditTodo;
				inputEditTodo = event.target;
				todoId = inputEditTodo.getAttribute( 'data-todo-id' )
				todo = this.getTodoById( todoId );
				inputEditTodo.value = todo.title;
				inputEditTodo.completed = todo.completed;
				div = document.getElementById( 'li_' + todoId );
				div.className = 'view';
				this.newTodoField.focus();
                        },

			dispatchToggleComplete: function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 5);
			   var todo, toggleItemCompleteEvent;
			   todo = this.getTodoById( event.target.getAttribute( 'data-todo-id' ) );
			   todo.id = event.target.getAttribute( 'data-todo-id' );
			   todo.completed = event.target.checked;
			   toggleItemCompleteEvent = this.createEvent( todomvc.view.event.AppEvents.TOGGLE_COMPLETE );
			   toggleItemCompleteEvent.todo = todo;
			   this.dispatchEvent( toggleItemCompleteEvent );
			},

			dispatchToggleCompleteAll: function(){___jdce_logger("/js/view/component/TodoForm.js", 6);},

			dispatchClearCompleted: function(){___jdce_logger("/js/view/component/TodoForm.js", 7);},

			dispatchDelete: function( id ) {___jdce_logger("/js/view/component/TodoForm.js", 8);
				var deleteItemEvent = this.createEvent( todomvc.view.event.AppEvents.DELETE_ITEM );
				deleteItemEvent.todoId = id;
				this.dispatchEvent( deleteItemEvent );
			},

			dispatchAddTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 9);},

			dispatchUpdateTodo: function(event) {___jdce_logger("/js/view/component/TodoForm.js", 10);
				var eventType, updateItemEvent, todo = {};
				todo.id = event.target.id.slice(6);
				todo.title = event.target.value.trim();
				todo.completed = event.target.completed;
				eventType = ( todo.title === "" ) ?
					todomvc.view.event.AppEvents.DELETE_ITEM : todomvc.view.event.AppEvents.UPDATE_ITEM;
				updateItemEvent = this.createEvent( eventType );
				updateItemEvent.todo = todo;
				updateItemEvent.todoId = todo.id;
				this.dispatchEvent( updateItemEvent );
			},

			setFilteredTodoList: function( data ) {___jdce_logger("/js/view/component/TodoForm.js", 11);
				var todo, checkbox, label, deleteLink, divDisplay,
					inputEditTodo, li, i, todoId, div, inputEditTodo;

				// Update instance data
				this.todos  = data.todos;
				this.stats  = data.stats;
				this.filter = data.filter;

				// Hide main section if no todos
				this.main.style.display = this.stats.totalTodo ? 'block' : 'none';

				// Create Todo list
				this.todoList.innerHTML = '';
				this.newTodoField.value = '';
				for ( i=0; i < this.todos.length; i++ ) {

					todo = this.todos[i];

					// Create checkbox
					checkbox = document.createElement( 'input' );
					checkbox.className = 'toggle';
					checkbox.setAttribute( 'data-todo-id', todo.id );
					checkbox.type = 'checkbox';
					checkbox.component = this;
					todomvc.view.event.AppEvents.addEventListener( checkbox, 'change', function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 12);
						this.component.dispatchToggleComplete( event );
					});

					// Create div text
					label = document.createElement( 'label' );
					label.setAttribute( 'data-todo-id', todo.id );
					label.appendChild( document.createTextNode( todo.title ) );

					// Create delete button
					deleteLink = document.createElement( 'button' );
					deleteLink.className = 'destroy';
					deleteLink.setAttribute( 'data-todo-id', todo.id );
					deleteLink.component = this;
					todomvc.view.event.AppEvents.addEventListener( deleteLink, 'click', function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 13);
						this.component.dispatchDelete( event.target.getAttribute( 'data-todo-id' ) );
					});

					// Create divDisplay
					divDisplay = document.createElement( 'div' );
					divDisplay.className = 'view';
					divDisplay.setAttribute( 'data-todo-id', todo.id );
					divDisplay.appendChild( checkbox );
					divDisplay.appendChild( label );
					divDisplay.appendChild( deleteLink );
					todomvc.view.event.AppEvents.addEventListener( divDisplay, 'dblclick', function() {___jdce_logger("/js/view/component/TodoForm.js", 14);
						todoId = this.getAttribute( 'data-todo-id' );
						div = document.getElementById( 'li_' + todoId );
						inputEditTodo = document.getElementById( 'input_' + todoId );
						inputEditTodo.setAttribute( 'data-todo-id', todoId );
						div.className = 'editing';
						inputEditTodo.focus();

					});

					// Create todo input
					inputEditTodo = document.createElement( 'input' );
					inputEditTodo.id = 'input_' + todo.id;
					inputEditTodo.className = 'edit';
					inputEditTodo.value = todo.title;
					inputEditTodo.completed = todo.completed;
					inputEditTodo.component = this;
					todomvc.view.event.AppEvents.addEventListener( inputEditTodo, 'keypress', function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 15);
						if ( event.keyCode === this.component.ENTER_KEY ) {
							this.component.dispatchUpdateTodo( event );
						}
					});

					todomvc.view.event.AppEvents.addEventListener( inputEditTodo, 'keydown', function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 16);
						if ( event.keyCode === this.component.ESC_KEY ) {
							this.component.abandonEditTodo( event );
						}
					});

					todomvc.view.event.AppEvents.addEventListener( inputEditTodo, 'blur', function( event ) {___jdce_logger("/js/view/component/TodoForm.js", 17);
						this.component.dispatchUpdateTodo( event );
					});

					// Create Todo ListItem and add to list
					li = document.createElement( 'li' );
					li.id = 'li_' + todo.id;
					li.appendChild( divDisplay );
					li.appendChild( inputEditTodo );
					if ( todo.completed ) {
						li.className += 'completed';
						checkbox.checked = true;
					}
					this.todoList.appendChild( li );
				}

				// Update UI
				this.footer.style.display = this.stats.totalTodo ? 'block' : 'none';
				this.updateToggleAllCheckbox();
				this.updateClearButton();
				this.updateTodoCount();
				this.updateFilter();

			},

			getTodoById: function( id ) {___jdce_logger("/js/view/component/TodoForm.js", 18);
			   var i;
				for ( i = 0; i < this.todos.length; i++ ) {
					if ( this.todos[ i ].id === id ) {
						return this.todos[i];
					}
				}
			},

			updateFilter: function() {___jdce_logger("/js/view/component/TodoForm.js", 19);
				this.filterAll.className        = ( this.filter === todomvc.AppConstants.FILTER_ALL ) ? 'selected' : '';
				this.filterActive.className     = ( this.filter === todomvc.AppConstants.FILTER_ACTIVE ) ? 'selected' : '';
				this.filterCompleted.className  = ( this.filter === todomvc.AppConstants.FILTER_COMPLETED ) ? 'selected' : '';

			},

			updateToggleAllCheckbox: function() {___jdce_logger("/js/view/component/TodoForm.js", 20);
				var i, checked = ( this.todos.length > 0 );
				for ( i = 0; i < this.todos.length; i++ ) {
					if ( this.todos[ i ].completed === false ) {
						checked = false;
						break;
					}
				}
				this.toggleAllCheckbox.checked = checked;
			},

			updateClearButton: function() {___jdce_logger("/js/view/component/TodoForm.js", 21);
				this.clearButton.style.display = ( this.stats.todoCompleted === 0 ) ? 'none' : 'block';
				this.clearButton.innerHTML = 'Clear completed';
			},

			updateTodoCount: function() {___jdce_logger("/js/view/component/TodoForm.js", 22);
				var number = document.createElement( 'strong' ),
					text   = ' ' + (this.stats.todoLeft === 1 ? 'item' : 'items' ) + ' left';
				number.innerHTML = this.stats.todoLeft;
				this.todoCount.innerHTML = null;
				this.todoCount.appendChild( number );
				this.todoCount.appendChild( document.createTextNode( text ) );
			}
	},

	// STATIC MEMBERS
	{
		NAME: 'TodoForm',
	}
);
