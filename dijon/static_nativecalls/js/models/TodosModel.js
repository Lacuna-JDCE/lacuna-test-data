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
			getIndex: function( id ) {___jdce_logger("/js/models/TodosModel.js", 3);
				var list = _list,
					todo,
					i;

				for ( i in _list ) {
					todo = _list[ i ];
					if ( todo.id === id ) {
						return i;
					}
				}

				return -1;
			},
			notifyOfListUpdate: function() {___jdce_logger("/js/models/TodosModel.js", 4);
				var list = this.getList();
				this.system.notify( 'TodosModel:todosListUpdated', list );
			},
			setList: function(){___jdce_logger("/js/models/TodosModel.js", 5);},
			getList: function() {___jdce_logger("/js/models/TodosModel.js", 6);
				return _list;
			},
			add: function( vo ) {___jdce_logger("/js/models/TodosModel.js", 7);
				_list.push( vo );
				this.notifyOfListUpdate();
			},
			toggleDone: function(){___jdce_logger("/js/models/TodosModel.js", 8);},
			setTitle: function(){___jdce_logger("/js/models/TodosModel.js", 9);},
			remove: function( id ) {___jdce_logger("/js/models/TodosModel.js", 10);
				_list.splice( this.getIndex( id ), 1 );
				this.notifyOfListUpdate();
			},
			setDoneForAll: function(){___jdce_logger("/js/models/TodosModel.js", 11);},
			removeAllDone: function(){___jdce_logger("/js/models/TodosModel.js", 12);},
			getNumTotal: function(){___jdce_logger("/js/models/TodosModel.js", 13);},
			getNumActive: function(){___jdce_logger("/js/models/TodosModel.js", 14);}
		};
	};

}( dijondemo ));
