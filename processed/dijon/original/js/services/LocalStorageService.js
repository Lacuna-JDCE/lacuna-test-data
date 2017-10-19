/*global dijondemo */
/**
 * @author Camille Reynders
 * Date: 03/02/12
 * Time: 13:27
 */
(function( ns ) {___jdce_logger("/js/services/LocalStorageService.js", 0);
	'use strict';

	ns.services.LocalStorageService = function() {___jdce_logger("/js/services/LocalStorageService.js", 1);
		return {
			system: undefined, //inject
			store: function( data ) {___jdce_logger("/js/services/LocalStorageService.js", 2);
				return localStorage.setItem( 'todos-dijon', JSON.stringify( data ) );
			},
			retrieve: function() {___jdce_logger("/js/services/LocalStorageService.js", 3);
				var data = localStorage.getItem( 'todos-dijon' ),
					output = ( data && JSON.parse( data ) ) || [];
				this.system.notify( 'StorageService:retrieveCompleted', output );
			}
		};
	};

}( dijondemo ));
