/*global Backbone */

// This file acts as a Service, providing
// the rest of the app access to the filter state
// as needed, without them needing to know the implementation
// details
(function () {___jdce_logger("/js/TodoMVC.FilterState.js", 0);
	'use strict';
	var filterState = new Backbone.Model({
		filter: 'all'
	});

	var filterChannel = Backbone.Radio.channel('filter');
	filterChannel.reply('filterState', function () {___jdce_logger("/js/TodoMVC.FilterState.js", 1);
		return filterState;
	});
})();
