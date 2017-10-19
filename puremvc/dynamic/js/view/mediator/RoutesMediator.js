/**
 * @author Cliff Hall
 *
 * @class RoutesMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
		name: 'todomvc.view.mediator.RoutesMediator',
		parent: puremvc.Mediator
	},

	// INSTANCE MEMBERS
	{
		// the router (Flatirion Director)
		router: null,

		// setup the routes when mediator is registered
		onRegister: function(){___jdce_logger("/js/view/mediator/RoutesMediator.js", 0);},

		getRouteForFilter: function(){___jdce_logger("/js/view/mediator/RoutesMediator.js", 1);},

		// route handlers
		handleFilterAll: function () {___jdce_logger("/js/view/mediator/RoutesMediator.js", 2);
			this.resource.facade.sendNotification( todomvc.AppConstants.FILTER_TODOS, todomvc.AppConstants.FILTER_ALL );
		},

		handleFilterActive: function(){___jdce_logger("/js/view/mediator/RoutesMediator.js", 3);},

		handleFilterCompleted: function(){___jdce_logger("/js/view/mediator/RoutesMediator.js", 4);},

	 },

	 // STATIC MEMBERS
	 {
		 NAME: 'RoutesMediator'
	 }
);
