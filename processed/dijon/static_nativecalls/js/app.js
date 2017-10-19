/*global dijon, dijondemo */
(function( ns ) {___jdce_logger("/js/app.js", 0);
	'use strict';

	ns.App = function () {___jdce_logger("/js/app.js", 1);
		var system;
		return {
			startup: function() {___jdce_logger("/js/app.js", 2);
				system = new dijon.System();

				system.mapValue( 'system', system );
				system.mapOutlet('system');

				system.injectInto( new ns.Config() );

				system.notify('App:startup');
				system.notify('App:startupComplete');
			}
		};
	};

}( dijondemo ));

dijondemo.app = new dijondemo.App();
dijondemo.app.startup();
