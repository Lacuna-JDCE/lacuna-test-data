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
				$todoList.on( 'change', '.toggle', function(){___jdce_logger("/js/views/TodoListView.js", 3);});
				$todoList.on( 'dblclick', 'label', function(){___jdce_logger("/js/views/TodoListView.js", 4);} );
				$todoList.on( 'keypress', '.edit', function(){___jdce_logger("/js/views/TodoListView.js", 5);});
				$todoList.on( 'blur', '.edit', function(){___jdce_logger("/js/views/TodoListView.js", 6);});
				$todoList.on( 'click', '.destroy', function(){___jdce_logger("/js/views/TodoListView.js", 7);});
				$toggleAll.on( 'change', function(){___jdce_logger("/js/views/TodoListView.js", 8);});
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
