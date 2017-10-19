/*global dijondemo */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 14:39
 */
(function( ns ) {___jdce_logger("/js/models/TodosModel.js", 0);
	'use strict';

	ns.models.TodosModel = function() {___jdce_logger("/js/models/TodosModel.js", 1);
		var _list = [];
		return {
			system: undefined, //inject,
			getTodo: function(){___jdce_logger("/js/models/TodosModel.js", 2);},
			getIndex: function(){___jdce_logger("/js/models/TodosModel.js", 3);},
			notifyOfListUpdate: function(){___jdce_logger("/js/models/TodosModel.js", 4);},
			setList: function( list ) {___jdce_logger("/js/models/TodosModel.js", 5);
				_list = list || [];
				this.system.notify( 'TodosModel:todosListUpdated', list );
			},
			getList: function() {___jdce_logger("/js/models/TodosModel.js", 6);
				return _list;
			},
			add: function(){___jdce_logger("/js/models/TodosModel.js", 7);},
			toggleDone: function(){___jdce_logger("/js/models/TodosModel.js", 8);},
			setTitle: function(){___jdce_logger("/js/models/TodosModel.js", 9);},
			remove: function(){___jdce_logger("/js/models/TodosModel.js", 10);},
			setDoneForAll: function(){___jdce_logger("/js/models/TodosModel.js", 11);},
			removeAllDone: function(){___jdce_logger("/js/models/TodosModel.js", 12);},
			getNumTotal: function() {___jdce_logger("/js/models/TodosModel.js", 13);
				return _list.length;
			},
			getNumActive: function() {___jdce_logger("/js/models/TodosModel.js", 14);
				var count = 0,
					i;
				for ( i in _list ) {
					if ( !_list[ i ].completed ) {
						count++;
					}
				}
				return count;
			}
		};
	};

}( dijondemo ));
