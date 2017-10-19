(function ($, kendo) {___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 0);
	'use strict';

	var itemBase, separator, idField;

	kendo.data.extensions = kendo.data.extensions || {};

	// Function to create a quasi-unique GUID for localStorage
	var getGuid = function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 1);};

	// Obtains the list of keys from localStorage
	var getKeys = function () {___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 2);
		var keysList = localStorage.getItem(itemBase);
		return keysList ? keysList.split(',') : [];
	};

	// Checks the localStorage key list for the current id and,
	// if it doesn't exist, adds that key to the list and saves
	// the list back to localStorage.
	var addKeyIfNew = function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 3);};

	// Fetches an array of objects from localStorage
	var getFromLocalStorage = function () {___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 4);
		var keys = getKeys(),
			todos = [];

		$.each(keys, function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 5);});

		return todos;
	};

	// Saves the current item to localStorage
	var saveToLocalStorage = function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 6);};

	// Removes the current item from localStorage
	var removeFromLocalStorage = function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 7);};

	// Specify a CRUD transport object for our custom Kendo DataSource
	var localTransports = {
		read: function (options) {___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 8);
			var todos = getFromLocalStorage();

			options.success(todos);
		},
		create: function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 9);},
		update: function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 10);},
		destroy: function(){___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 11);}
	};

	// Create the custom DataSource by extending a kendo.data.DataSource
	// and specify an init method that wires up needed functionality.
	kendo.data.extensions.LocalStorageDataSource = kendo.data.DataSource.extend({
		init: function (options) {___jdce_logger("/js/lib/kendo.data.localstoragedatasource.js", 12);
			// DataSource consumers can specify custom itemBase and separator
			// strings when initializing the DataSource. These values are
			// used when saving records to localStorage.
			itemBase = options.itemBase || 'kendo-ds';
			separator = options.separator || '-';
			idField = options.schema.model.idField;

			// The idField is required. If not specified on the model, throw an error
			if (!idField) {
				throw new Error('An id field is required in order to work with localStorage. Please specify an id on your Model.');
			}

			// Call the "base" DataSource init function and provide our custom transport object
			kendo.data.DataSource.fn.init.call(this, $.extend(true, {}, { transport: localTransports }, options));
		}
	});
})($, kendo);
