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
			setup: function(){___jdce_logger("/js/views/TodoListView.js", 2);},
			render: function(){___jdce_logger("/js/views/TodoListView.js", 3);}
		};
	};

}( dijondemo ));
