/*global dijondemo, $ */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 14:20
 */
(function( ns ) {___jdce_logger("/js/views/FooterView.js", 0);
	'use strict';

	ns.views.FooterView = function() {___jdce_logger("/js/views/FooterView.js", 1);
		var $count = $('#todo-count'),
			$clearBtn = $('#clear-completed'),
			$footer = $('#todoapp').find('footer');

		return {
			system: undefined, //inject
			pluralizeUtil: undefined, //inject,
			todosModel: undefined, //inject
			setup: function(){___jdce_logger("/js/views/FooterView.js", 2);},
			render: function(){___jdce_logger("/js/views/FooterView.js", 3);},
			renderCounts: function(){___jdce_logger("/js/views/FooterView.js", 4);}
		};
	};

}( dijondemo ));
