/*global dijondemo, $ */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 13:38
 */
(function( ns ) {___jdce_logger("/js/views/TodoFormView.js", 0);
	'use strict';

	ns.views.TodoFormView = function() {___jdce_logger("/js/views/TodoFormView.js", 1);
		var $newTodo = $('#new-todo');
		return {
			system: undefined, //inject
			enterKey: undefined, //inject
			uuidUtil: undefined, //inject
			setup: function() {___jdce_logger("/js/views/TodoFormView.js", 2);
				var self = this;
				$newTodo.on( 'keyup', function(){___jdce_logger("/js/views/TodoFormView.js", 3);} );
			},
			render: function() {___jdce_logger("/js/views/TodoFormView.js", 4);}
		};
	};

}( dijondemo ));
