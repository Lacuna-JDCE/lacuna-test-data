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

			addEventListener: function(){___jdce_logger("/js/view/component/TodoForm.js", 1);},

			createEvent: function(){___jdce_logger("/js/view/component/TodoForm.js", 2);},

			dispatchEvent: function(){___jdce_logger("/js/view/component/TodoForm.js", 3);},

			abandonEditTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 4);},

			dispatchToggleComplete: function(){___jdce_logger("/js/view/component/TodoForm.js", 5);},

			dispatchToggleCompleteAll: function(){___jdce_logger("/js/view/component/TodoForm.js", 6);},

			dispatchClearCompleted: function(){___jdce_logger("/js/view/component/TodoForm.js", 7);},

			dispatchDelete: function(){___jdce_logger("/js/view/component/TodoForm.js", 8);},

			dispatchAddTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 9);},

			dispatchUpdateTodo: function(){___jdce_logger("/js/view/component/TodoForm.js", 10);},

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
					todomvc.view.event.AppEvents.addEventListener( checkbox, 'change', function(){___jdce_logger("/js/view/component/TodoForm.js", 12);});

					// Create div text
					label = document.createElement( 'label' );
					label.setAttribute( 'data-todo-id', todo.id );
					label.appendChild( document.createTextNode( todo.title ) );

					// Create delete button
					deleteLink = document.createElement( 'button' );
					deleteLink.className = 'destroy';
					deleteLink.setAttribute( 'data-todo-id', todo.id );
					deleteLink.component = this;
					todomvc.view.event.AppEvents.addEventListener( deleteLink, 'click', function(){___jdce_logger("/js/view/component/TodoForm.js", 13);});

					// Create divDisplay
					divDisplay = document.createElement( 'div' );
					divDisplay.className = 'view';
					divDisplay.setAttribute( 'data-todo-id', todo.id );
					divDisplay.appendChild( checkbox );
					divDisplay.appendChild( label );
					divDisplay.appendChild( deleteLink );
					todomvc.view.event.AppEvents.addEventListener( divDisplay, 'dblclick', function(){___jdce_logger("/js/view/component/TodoForm.js", 14);});

					// Create todo input
					inputEditTodo = document.createElement( 'input' );
					inputEditTodo.id = 'input_' + todo.id;
					inputEditTodo.className = 'edit';
					inputEditTodo.value = todo.title;
					inputEditTodo.completed = todo.completed;
					inputEditTodo.component = this;
					todomvc.view.event.AppEvents.addEventListener( inputEditTodo, 'keypress', function(){___jdce_logger("/js/view/component/TodoForm.js", 15);});

					todomvc.view.event.AppEvents.addEventListener( inputEditTodo, 'keydown', function(){___jdce_logger("/js/view/component/TodoForm.js", 16);});

					todomvc.view.event.AppEvents.addEventListener( inputEditTodo, 'blur', function(){___jdce_logger("/js/view/component/TodoForm.js", 17);});

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

			getTodoById: function(){___jdce_logger("/js/view/component/TodoForm.js", 18);},

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
