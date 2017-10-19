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
			getTodo: function( id ) {___jdce_logger("/js/models/TodosModel.js", 2);
				return _list[ this.getIndex( id ) ];
			},
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
			setList: function( list ) {___jdce_logger("/js/models/TodosModel.js", 5);
				_list = list || [];
				this.system.notify( 'TodosModel:todosListUpdated', list );
			},
			getList: function() {___jdce_logger("/js/models/TodosModel.js", 6);
				return _list;
			},
			add: function( vo ) {___jdce_logger("/js/models/TodosModel.js", 7);
				_list.push( vo );
				this.notifyOfListUpdate();
			},
			toggleDone: function( id ) {___jdce_logger("/js/models/TodosModel.js", 8);
				var todo = this.getTodo( id );
				todo.completed = !todo.completed;
				this.notifyOfListUpdate();
			},
			setTitle: function( id, title ) {___jdce_logger("/js/models/TodosModel.js", 9);
				this.getTodo( id ).title = title;
				this.notifyOfListUpdate();
			},
			remove: function( id ) {___jdce_logger("/js/models/TodosModel.js", 10);
				_list.splice( this.getIndex( id ), 1 );
				this.notifyOfListUpdate();
			},
			setDoneForAll: function( completed ) {___jdce_logger("/js/models/TodosModel.js", 11);
				var i;
				for ( i in _list ) {
					_list[ i ].completed = completed;
				}
				this.notifyOfListUpdate();
			},
			removeAllDone: function() {___jdce_logger("/js/models/TodosModel.js", 12);
				var i,
					n = 0;
				for ( i = _list.length - 1 ; i >= n ; i-- ) {
					if ( _list[ i ].completed ) {
						_list.splice( i, 1 );
					}
				}
				this.notifyOfListUpdate();
			},
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
