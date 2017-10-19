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
		listNotificationInterests: function() {___jdce_logger("/js/view/mediator/TodoFormMediator.js", 0);
			return [ todomvc.AppConstants.TODOS_FILTERED ];
		},

		// Code to be executed when the Mediator instance is registered with the View
		onRegister: function() {___jdce_logger("/js/view/mediator/TodoFormMediator.js", 1);
			this.setViewComponent( new todomvc.view.component.TodoForm );
			this.viewComponent.addEventListener( todomvc.view.event.AppEvents.TOGGLE_COMPLETE, this );
			this.viewComponent.addEventListener( todomvc.view.event.AppEvents.TOGGLE_COMPLETE_ALL, this );
			this.viewComponent.addEventListener( todomvc.view.event.AppEvents.UPDATE_ITEM, this );
			this.viewComponent.addEventListener( todomvc.view.event.AppEvents.DELETE_ITEM, this );
			this.viewComponent.addEventListener( todomvc.view.event.AppEvents.ADD_ITEM, this );
			this.viewComponent.addEventListener( todomvc.view.event.AppEvents.CLEAR_COMPLETED, this );
		},

		// Handle events from the view component
		handleEvent: function(){___jdce_logger("/js/view/mediator/TodoFormMediator.js", 2);},

		// Handle notifications from other PureMVC actors
		handleNotification: function( note ) {___jdce_logger("/js/view/mediator/TodoFormMediator.js", 3);
			switch ( note.getName() ) {
				case todomvc.AppConstants.TODOS_FILTERED:
					this.viewComponent.setFilteredTodoList( note.getBody() );
					break;
			}
		},
	},

	// STATIC MEMBERS
	{
		NAME: 'TodoFormMediator'
	}
);
