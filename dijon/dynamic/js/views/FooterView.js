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
			setup: function() {___jdce_logger("/js/views/FooterView.js", 2);
				var self = this;
				$clearBtn.on( 'click', function(){___jdce_logger("/js/views/FooterView.js", 3);});

			},
			render: function() {___jdce_logger("/js/views/FooterView.js", 4);
				this.renderCounts( this.todosModel.getNumTotal(), this.todosModel.getNumActive() );
			},
			renderCounts: function( numTodosTotal, numTodosActive ) {___jdce_logger("/js/views/FooterView.js", 5);
				var numTodosCompleted = numTodosTotal - numTodosActive,
					countTitle = '<strong>' + numTodosActive + '</strong> ' + this.pluralizeUtil.pluralize( numTodosActive, 'item' ) + ' left';

				// Only show the footer when there are at least one todo.
				$footer.toggle( !!numTodosTotal );

				// Toggle clear button
				$clearBtn.toggle( !!numTodosCompleted );
			}
		};
	};

}( dijondemo ));
