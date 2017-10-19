(function ($, kendo) {___jdce_logger("/js/lib/kendo.bindings.custom.js", 0);
	'use strict';

	var ENTER_KEY = 13;

	// Create a custom "enter" binding by extending the kendo.data.Binder
	// object with a custom init function that binds to the keyup event and,
	// if the enter key is pressed, will call a bound function.
	kendo.data.binders.enter = kendo.data.Binder.extend({
		init: function (widget, bindings, options) {___jdce_logger("/js/lib/kendo.bindings.custom.js", 1);
			// Call the "base" init method
			kendo.data.Binder.fn.init.call(this, widget, bindings, options);

			$(this.element).bind('keyup', function(){___jdce_logger("/js/lib/kendo.bindings.custom.js", 2);}.bind(this));
		},
		// The refresh function must be specified in a custom binding,
		// even when empty.
		refresh: function () {___jdce_logger("/js/lib/kendo.bindings.custom.js", 3);}
	});

	var ESCAPE_KEY = 27;

	// Create a custom "enter" binding by extending the kendo.data.Binder
	// object with a custom init function that binds to the keyup event and,
	// if the enter key is pressed, will call a bound function.
	kendo.data.binders.escape = kendo.data.Binder.extend({
		init: function(){___jdce_logger("/js/lib/kendo.bindings.custom.js", 4);},
		// The refresh function must be specified in a custom binding,
		// even when empty.
		refresh: function(){___jdce_logger("/js/lib/kendo.bindings.custom.js", 5);}
	});

})($, kendo);