/**
 * @author Mike Britton
 *
 * @class PrepModelCommand
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
		name: 'todomvc.controller.command.PrepModelCommand',
		parent: puremvc.SimpleCommand
	},

	// INSTANCE MEMBERS
	{
		/**
		 * Register Proxies with the Model
		 * @override
		 */
		execute: function(note) {___jdce_logger("/js/controller/command/PrepModelCommand.js", 0);
			this.facade.registerProxy( new todomvc.model.proxy.TodoProxy() );
		}
	}
);
