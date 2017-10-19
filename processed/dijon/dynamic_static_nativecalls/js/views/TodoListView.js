/*global dijondemo, $, Handlebars */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 13:39
 */
(function( ns ) {___jdce_logger("/js/views/TodoListView.js", 0);
	'use strict';

	ns.views.TodoListView = function() {___jdce_logger("/js/views/TodoListView.js", 1);
		var _template = Handlebars.compile( $('#todo-template').html() ),
			$toggleAll = $('#toggle-all'),
			$todoList = $('#todo-list'),
			$main = $('#main'),
			$count = $('#todo-count');
		return {
			system: undefined, //inject
			enterKey: undefined,
			todosModel: undefined, //inject
			setup: function() {___jdce_logger("/js/views/TodoListView.js", 2);
				var self = this;
				$todoList.on( 'change', '.toggle', function() {___jdce_logger("/js/views/TodoListView.js", 3);
					var id = $( this ).closest('li').data('id');
					self.system.notify( 'TodoListView:toggleDoneOfTodo', id );
				});
				$todoList.on( 'dblclick', 'label', function() {___jdce_logger("/js/views/TodoListView.js", 4);
					$( this ).closest('li').addClass('editing').find('.edit').focus();
				} );
				$todoList.on( 'keypress', '.edit', function( e ) {___jdce_logger("/js/views/TodoListView.js", 5);
					if ( e.which === self.enterKey ) {
						e.target.blur();
					}
				});
				$todoList.on( 'blur', '.edit', function() {___jdce_logger("/js/views/TodoListView.js", 6);
					var id = $( this ).closest('li').data('id'),
						val = $.trim( $( this ).removeClass('editing').val() );
					if ( val ){
						self.system.notify( 'TodoListView:setTitleOfTodo', id, val );
					} else {
						self.system.notify( 'TodoListView:removeTodo', id );
					}
				});
				$todoList.on( 'click', '.destroy', function() {___jdce_logger("/js/views/TodoListView.js", 7);
					var id = $( this ).closest('li').data('id');
					self.system.notify( 'TodoListView:removeTodo', id );
				});
				$toggleAll.on( 'change', function() {___jdce_logger("/js/views/TodoListView.js", 8);
					var isChecked = !!$( this ).prop('checked');
					self.system.notify( 'TodoListView:setDoneForAllTodos', isChecked );
				});
			},
			render: function() {___jdce_logger("/js/views/TodoListView.js", 9);
				var todoList = this.todosModel.getList();
				$todoList.html( _template( todoList ) );
				$main.toggle( !!todoList.length );
				$toggleAll.prop( 'checked', !this.todosModel.getNumActive() );
			}
		};
	};

}( dijondemo ));
