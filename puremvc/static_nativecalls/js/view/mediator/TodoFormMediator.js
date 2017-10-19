/**
 * @author Mike Britton
 *
 * @class TodoFormMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
		name: 'todomvc.view.mediator.TodoFormMediator',
		parent: puremvc.Mediator
	},

	// INSTANCE MEMBERS
	{
		// Notifications this mediator is interested in
		listNotificationInterests: function(){___jdce_logger("/js/view/mediator/TodoFormMediator.js", 0);},

		// Code to be executed when the Mediator instance is registered with the View
		onRegister: function(){___jdce_logger("/js/view/mediator/TodoFormMediator.js", 1);},

		// Handle events from the view component
		handleEvent: function(){___jdce_logger("/js/view/mediator/TodoFormMediator.js", 2);},

		// Handle notifications from other PureMVC actors
		handleNotification: function(){___jdce_logger("/js/view/mediator/TodoFormMediator.js", 3);},
	},

	// STATIC MEMBERS
	{
		NAME: 'TodoFormMediator'
	}
);
