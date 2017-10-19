/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {___jdce_logger("/bower_components/jquery/jquery.js", 0);

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {___jdce_logger("/bower_components/jquery/jquery.js", 1);
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function(){___jdce_logger("/bower_components/jquery/jquery.js", 2);},

	// The ready event handler
	completed = function( event ) {___jdce_logger("/bower_components/jquery/jquery.js", 3);

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {___jdce_logger("/bower_components/jquery/jquery.js", 4);
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {___jdce_logger("/bower_components/jquery/jquery.js", 5);
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function(){___jdce_logger("/bower_components/jquery/jquery.js", 6);},

	toArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 7);},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 8);},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function(){___jdce_logger("/bower_components/jquery/jquery.js", 9);},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {___jdce_logger("/bower_components/jquery/jquery.js", 10);
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 11);
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function(){___jdce_logger("/bower_components/jquery/jquery.js", 12);},

	first: function(){___jdce_logger("/bower_components/jquery/jquery.js", 13);},

	last: function(){___jdce_logger("/bower_components/jquery/jquery.js", 14);},

	eq: function(){___jdce_logger("/bower_components/jquery/jquery.js", 15);},

	map: function(){___jdce_logger("/bower_components/jquery/jquery.js", 16);},

	end: function(){___jdce_logger("/bower_components/jquery/jquery.js", 17);},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {___jdce_logger("/bower_components/jquery/jquery.js", 18);
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function(){___jdce_logger("/bower_components/jquery/jquery.js", 19);},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function(){___jdce_logger("/bower_components/jquery/jquery.js", 20);},

	// Handle when the DOM is ready
	ready: function( wait ) {___jdce_logger("/bower_components/jquery/jquery.js", 21);

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 22);
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function(){___jdce_logger("/bower_components/jquery/jquery.js", 23);},

	isWindow: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 24);
		return obj != null && obj == obj.window;
	},

	isNumeric: function(){___jdce_logger("/bower_components/jquery/jquery.js", 25);},

	type: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 26);
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 27);
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function(){___jdce_logger("/bower_components/jquery/jquery.js", 28);},

	error: function(){___jdce_logger("/bower_components/jquery/jquery.js", 29);},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function(){___jdce_logger("/bower_components/jquery/jquery.js", 30);},

	parseJSON: function(){___jdce_logger("/bower_components/jquery/jquery.js", 31);},

	// Cross-browser xml parsing
	parseXML: function(){___jdce_logger("/bower_components/jquery/jquery.js", 32);},

	noop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 33);},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function(){___jdce_logger("/bower_components/jquery/jquery.js", 34);},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function(){___jdce_logger("/bower_components/jquery/jquery.js", 35);},

	nodeName: function(){___jdce_logger("/bower_components/jquery/jquery.js", 36);},

	// args is for internal usage only
	each: function( obj, callback, args ) {___jdce_logger("/bower_components/jquery/jquery.js", 37);
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 38);} :

		// Otherwise use our own trimming functionality
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 39);},

	// results is for internal usage only
	makeArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 40);},

	inArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 41);},

	merge: function(){___jdce_logger("/bower_components/jquery/jquery.js", 42);},

	grep: function(){___jdce_logger("/bower_components/jquery/jquery.js", 43);},

	// arg is for internal usage only
	map: function(){___jdce_logger("/bower_components/jquery/jquery.js", 44);},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function(){___jdce_logger("/bower_components/jquery/jquery.js", 45);},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function(){___jdce_logger("/bower_components/jquery/jquery.js", 46);},

	now: function() {___jdce_logger("/bower_components/jquery/jquery.js", 47);
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 48);
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function(){___jdce_logger("/bower_components/jquery/jquery.js", 49);})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {___jdce_logger("/bower_components/jquery/jquery.js", 50);
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 51);
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {___jdce_logger("/bower_components/jquery/jquery.js", 52);
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {___jdce_logger("/bower_components/jquery/jquery.js", 53);
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {___jdce_logger("/bower_components/jquery/jquery.js", 54);

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {___jdce_logger("/bower_components/jquery/jquery.js", 55);
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {___jdce_logger("/bower_components/jquery/jquery.js", 56);
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {___jdce_logger("/bower_components/jquery/jquery.js", 57);
						jQuery.each( args, function( _, arg ) {___jdce_logger("/bower_components/jquery/jquery.js", 58);
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function(){___jdce_logger("/bower_components/jquery/jquery.js", 59);},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function(){___jdce_logger("/bower_components/jquery/jquery.js", 60);},
			// Remove all callbacks from the list
			empty: function(){___jdce_logger("/bower_components/jquery/jquery.js", 61);},
			// Have the list do nothing anymore
			disable: function() {___jdce_logger("/bower_components/jquery/jquery.js", 62);
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function(){___jdce_logger("/bower_components/jquery/jquery.js", 63);},
			// Lock the list in its current state
			lock: function() {___jdce_logger("/bower_components/jquery/jquery.js", 64);
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function(){___jdce_logger("/bower_components/jquery/jquery.js", 65);},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {___jdce_logger("/bower_components/jquery/jquery.js", 66);
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function(){___jdce_logger("/bower_components/jquery/jquery.js", 67);},
			// To know if the callbacks have already been called at least once
			fired: function(){___jdce_logger("/bower_components/jquery/jquery.js", 68);}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {___jdce_logger("/bower_components/jquery/jquery.js", 69);
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function(){___jdce_logger("/bower_components/jquery/jquery.js", 70);},
				always: function(){___jdce_logger("/bower_components/jquery/jquery.js", 71);},
				then: function(){___jdce_logger("/bower_components/jquery/jquery.js", 72);},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 73);
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {___jdce_logger("/bower_components/jquery/jquery.js", 74);
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {___jdce_logger("/bower_components/jquery/jquery.js", 75);
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 76);};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function(){___jdce_logger("/bower_components/jquery/jquery.js", 77);}
});
jQuery.support = (function() {___jdce_logger("/bower_components/jquery/jquery.js", 78);

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function(){___jdce_logger("/bower_components/jquery/jquery.js", 79);});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {___jdce_logger("/bower_components/jquery/jquery.js", 80);
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){___jdce_logger("/bower_components/jquery/jquery.js", 81);
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData(){___jdce_logger("/bower_components/jquery/jquery.js", 82);}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {___jdce_logger("/bower_components/jquery/jquery.js", 83);
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function(){___jdce_logger("/bower_components/jquery/jquery.js", 84);},

	removeData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 85);},

	// For internal use only.
	_data: function( elem, name, data ) {___jdce_logger("/bower_components/jquery/jquery.js", 86);
		return internalData( elem, name, data, true );
	},

	_removeData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 87);},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {___jdce_logger("/bower_components/jquery/jquery.js", 88);
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function(){___jdce_logger("/bower_components/jquery/jquery.js", 89);},

	removeData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 90);}
});

function dataAttr(){___jdce_logger("/bower_components/jquery/jquery.js", 91);}

// checks a cache object for emptiness
function isEmptyDataObject(){___jdce_logger("/bower_components/jquery/jquery.js", 92);}
jQuery.extend({
	queue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 93);},

	dequeue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 94);},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function(){___jdce_logger("/bower_components/jquery/jquery.js", 95);}
});

jQuery.fn.extend({
	queue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 96);},
	dequeue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 97);},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function(){___jdce_logger("/bower_components/jquery/jquery.js", 98);},
	clearQueue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 99);},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function(){___jdce_logger("/bower_components/jquery/jquery.js", 100);}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 101);},

	removeAttr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 102);},

	prop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 103);},

	removeProp: function(){___jdce_logger("/bower_components/jquery/jquery.js", 104);},

	addClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 105);},

	removeClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 106);},

	toggleClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 107);},

	hasClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 108);},

	val: function(){___jdce_logger("/bower_components/jquery/jquery.js", 109);}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 110);}
		},
		select: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 111);},

			set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 112);}
		}
	},

	attr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 113);},

	removeAttr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 114);},

	attrHooks: {
		type: {
			set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 115);}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 116);},

	propHooks: {
		tabIndex: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 117);}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 118);},
	set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 119);}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 120);},
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 121);}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 122);},
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 123);}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 124);}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function(){___jdce_logger("/bower_components/jquery/jquery.js", 125);});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function(){___jdce_logger("/bower_components/jquery/jquery.js", 126);});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function(){___jdce_logger("/bower_components/jquery/jquery.js", 127);});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 128);},
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 129);}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 130);}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function(){___jdce_logger("/bower_components/jquery/jquery.js", 131);});
}
jQuery.each([ "radio", "checkbox" ], function() {___jdce_logger("/bower_components/jquery/jquery.js", 132);
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 133);}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue(){___jdce_logger("/bower_components/jquery/jquery.js", 134);}

function returnFalse() {___jdce_logger("/bower_components/jquery/jquery.js", 135);
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function(){___jdce_logger("/bower_components/jquery/jquery.js", 136);},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {___jdce_logger("/bower_components/jquery/jquery.js", 137);
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {___jdce_logger("/bower_components/jquery/jquery.js", 138);
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function(){___jdce_logger("/bower_components/jquery/jquery.js", 139);},

	handlers: function(){___jdce_logger("/bower_components/jquery/jquery.js", 140);},

	fix: function(){___jdce_logger("/bower_components/jquery/jquery.js", 141);},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 142);}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 143);}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function(){___jdce_logger("/bower_components/jquery/jquery.js", 144);}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function(){___jdce_logger("/bower_components/jquery/jquery.js", 145);},
			delegateType: "focusin"
		},
		blur: {
			trigger: function(){___jdce_logger("/bower_components/jquery/jquery.js", 146);},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function(){___jdce_logger("/bower_components/jquery/jquery.js", 147);}
		}
	},

	simulate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 148);}
};

jQuery.removeEvent = document.removeEventListener ?
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 149);} :
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 150);};

jQuery.Event = function( src, props ) {___jdce_logger("/bower_components/jquery/jquery.js", 151);
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function(){___jdce_logger("/bower_components/jquery/jquery.js", 152);},
	stopPropagation: function(){___jdce_logger("/bower_components/jquery/jquery.js", 153);},
	stopImmediatePropagation: function(){___jdce_logger("/bower_components/jquery/jquery.js", 154);}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {___jdce_logger("/bower_components/jquery/jquery.js", 155);
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function(){___jdce_logger("/bower_components/jquery/jquery.js", 156);}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function(){___jdce_logger("/bower_components/jquery/jquery.js", 157);},

		postDispatch: function(){___jdce_logger("/bower_components/jquery/jquery.js", 158);},

		teardown: function(){___jdce_logger("/bower_components/jquery/jquery.js", 159);}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function(){___jdce_logger("/bower_components/jquery/jquery.js", 160);},

		handle: function(){___jdce_logger("/bower_components/jquery/jquery.js", 161);},

		teardown: function(){___jdce_logger("/bower_components/jquery/jquery.js", 162);}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {___jdce_logger("/bower_components/jquery/jquery.js", 163);

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function(){___jdce_logger("/bower_components/jquery/jquery.js", 164);};

		jQuery.event.special[ fix ] = {
			setup: function(){___jdce_logger("/bower_components/jquery/jquery.js", 165);},
			teardown: function(){___jdce_logger("/bower_components/jquery/jquery.js", 166);}
		};
	});
}

jQuery.fn.extend({

	on: function(){___jdce_logger("/bower_components/jquery/jquery.js", 167);},
	one: function(){___jdce_logger("/bower_components/jquery/jquery.js", 168);},
	off: function( types, selector, fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 169);
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {___jdce_logger("/bower_components/jquery/jquery.js", 170);
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function(){___jdce_logger("/bower_components/jquery/jquery.js", 171);},
	unbind: function(){___jdce_logger("/bower_components/jquery/jquery.js", 172);},

	delegate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 173);},
	undelegate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 174);},

	trigger: function( type, data ) {___jdce_logger("/bower_components/jquery/jquery.js", 175);
		return this.each(function() {___jdce_logger("/bower_components/jquery/jquery.js", 176);
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function(){___jdce_logger("/bower_components/jquery/jquery.js", 177);}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {___jdce_logger("/bower_components/jquery/jquery.js", 178);

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function(){___jdce_logger("/bower_components/jquery/jquery.js", 179);},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function(){___jdce_logger("/bower_components/jquery/jquery.js", 180);};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function(){___jdce_logger("/bower_components/jquery/jquery.js", 181);};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 182);
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {___jdce_logger("/bower_components/jquery/jquery.js", 183);
	var cache,
		keys = [];

	return (cache = function(){___jdce_logger("/bower_components/jquery/jquery.js", 184);});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 185);
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 186);
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle(){___jdce_logger("/bower_components/jquery/jquery.js", 187);}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {___jdce_logger("/bower_components/jquery/jquery.js", 188);
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {___jdce_logger("/bower_components/jquery/jquery.js", 189);
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 190);
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 191);
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 192);
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 193);
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 194);
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function(){___jdce_logger("/bower_components/jquery/jquery.js", 195);},
			"type": function(){___jdce_logger("/bower_components/jquery/jquery.js", 196);}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 197);};
		Expr.filter["ID"] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 198);};
	} else {
		Expr.find["ID"] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 199);};
		Expr.filter["ID"] =  function(){___jdce_logger("/bower_components/jquery/jquery.js", 200);};
	}

	// Tag
	Expr.find["TAG"] = support.tagNameNoComments ?
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 201);} :
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 202);};

	// Name
	Expr.find["NAME"] = support.getByName && function(){___jdce_logger("/bower_components/jquery/jquery.js", 203);};

	// Class
	Expr.find["CLASS"] = support.getByClassName && function(){___jdce_logger("/bower_components/jquery/jquery.js", 204);};

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21),
	// no need to also add to buggyMatches since matches checks buggyQSA
	// A support test would require too much code (would include document ready)
	rbuggyQSA = [ ":focus" ];

	if ( (support.qsa = isNative(doc.querySelectorAll)) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 205);
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 206);

			// Opera 10-12/IE8 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<input type='hidden' i=''/>";
			if ( div.querySelectorAll("[i^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = isNative( (matches = docElem.matchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.webkitMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 207);
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = new RegExp( rbuggyMatches.join("|") );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = isNative(docElem.contains) || docElem.compareDocumentPosition ?
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 208);} :
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 209);};

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {___jdce_logger("/bower_components/jquery/jquery.js", 210);
		var compare;

		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( (compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b )) ) {
			if ( compare & 1 || a.parentNode && a.parentNode.nodeType === 11 ) {
				if ( a === doc || contains( preferredDoc, a ) ) {
					return -1;
				}
				if ( b === doc || contains( preferredDoc, b ) ) {
					return 1;
				}
				return 0;
			}
			return compare & 4 ? -1 : 1;
		}

		return a.compareDocumentPosition ? -1 : 1;
	} :
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 211);};

	// Always assume the presence of duplicates if sort doesn't
	// pass them to our comparison function (as in Google Chrome).
	hasDuplicate = false;
	[0, 0].sort( sortOrder );
	support.detectDuplicates = hasDuplicate;

	return document;
};

Sizzle.matches = function(){___jdce_logger("/bower_components/jquery/jquery.js", 212);};

Sizzle.matchesSelector = function(){___jdce_logger("/bower_components/jquery/jquery.js", 213);};

Sizzle.contains = function(){___jdce_logger("/bower_components/jquery/jquery.js", 214);};

Sizzle.attr = function(){___jdce_logger("/bower_components/jquery/jquery.js", 215);};

Sizzle.error = function(){___jdce_logger("/bower_components/jquery/jquery.js", 216);};

// Document sorting and removing duplicates
Sizzle.uniqueSort = function(){___jdce_logger("/bower_components/jquery/jquery.js", 217);};

function siblingCheck(){___jdce_logger("/bower_components/jquery/jquery.js", 218);}

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {___jdce_logger("/bower_components/jquery/jquery.js", 219);
	return function(){___jdce_logger("/bower_components/jquery/jquery.js", 220);};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {___jdce_logger("/bower_components/jquery/jquery.js", 221);
	return function(){___jdce_logger("/bower_components/jquery/jquery.js", 222);};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 223);
	return markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 224);});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function(){___jdce_logger("/bower_components/jquery/jquery.js", 225);};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function(){___jdce_logger("/bower_components/jquery/jquery.js", 226);},

		"CHILD": function(){___jdce_logger("/bower_components/jquery/jquery.js", 227);},

		"PSEUDO": function(){___jdce_logger("/bower_components/jquery/jquery.js", 228);}
	},

	filter: {

		"TAG": function(){___jdce_logger("/bower_components/jquery/jquery.js", 229);},

		"CLASS": function(){___jdce_logger("/bower_components/jquery/jquery.js", 230);},

		"ATTR": function(){___jdce_logger("/bower_components/jquery/jquery.js", 231);},

		"CHILD": function(){___jdce_logger("/bower_components/jquery/jquery.js", 232);},

		"PSEUDO": function(){___jdce_logger("/bower_components/jquery/jquery.js", 233);}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 234);}),

		"has": markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 235);}),

		"contains": markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 236);}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function(){___jdce_logger("/bower_components/jquery/jquery.js", 237);}),

		// Miscellaneous
		"target": function(){___jdce_logger("/bower_components/jquery/jquery.js", 238);},

		"root": function(){___jdce_logger("/bower_components/jquery/jquery.js", 239);},

		"focus": function(){___jdce_logger("/bower_components/jquery/jquery.js", 240);},

		// Boolean properties
		"enabled": function(){___jdce_logger("/bower_components/jquery/jquery.js", 241);},

		"disabled": function(){___jdce_logger("/bower_components/jquery/jquery.js", 242);},

		"checked": function(){___jdce_logger("/bower_components/jquery/jquery.js", 243);},

		"selected": function(){___jdce_logger("/bower_components/jquery/jquery.js", 244);},

		// Contents
		"empty": function(){___jdce_logger("/bower_components/jquery/jquery.js", 245);},

		"parent": function(){___jdce_logger("/bower_components/jquery/jquery.js", 246);},

		// Element/input types
		"header": function(){___jdce_logger("/bower_components/jquery/jquery.js", 247);},

		"input": function(){___jdce_logger("/bower_components/jquery/jquery.js", 248);},

		"button": function(){___jdce_logger("/bower_components/jquery/jquery.js", 249);},

		"text": function(){___jdce_logger("/bower_components/jquery/jquery.js", 250);},

		// Position-in-collection
		"first": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 251);}),

		"last": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 252);}),

		"eq": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 253);}),

		"even": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 254);}),

		"odd": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 255);}),

		"lt": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 256);}),

		"gt": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 257);})
	}
};

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

function tokenize(){___jdce_logger("/bower_components/jquery/jquery.js", 258);}

function toSelector(){___jdce_logger("/bower_components/jquery/jquery.js", 259);}

function addCombinator(){___jdce_logger("/bower_components/jquery/jquery.js", 260);}

function elementMatcher(){___jdce_logger("/bower_components/jquery/jquery.js", 261);}

function condense(){___jdce_logger("/bower_components/jquery/jquery.js", 262);}

function setMatcher(){___jdce_logger("/bower_components/jquery/jquery.js", 263);}

function matcherFromTokens(){___jdce_logger("/bower_components/jquery/jquery.js", 264);}

function matcherFromGroupMatchers(){___jdce_logger("/bower_components/jquery/jquery.js", 265);}

compile = Sizzle.compile = function(){___jdce_logger("/bower_components/jquery/jquery.js", 266);};

function multipleContexts(){___jdce_logger("/bower_components/jquery/jquery.js", 267);}

function select(){___jdce_logger("/bower_components/jquery/jquery.js", 268);}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Easy API for creating new setFilters
function setFilters() {___jdce_logger("/bower_components/jquery/jquery.js", 269);}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Initialize with the default document
setDocument();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function(){___jdce_logger("/bower_components/jquery/jquery.js", 270);},

	has: function(){___jdce_logger("/bower_components/jquery/jquery.js", 271);},

	not: function(){___jdce_logger("/bower_components/jquery/jquery.js", 272);},

	filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 273);},

	is: function(){___jdce_logger("/bower_components/jquery/jquery.js", 274);},

	closest: function(){___jdce_logger("/bower_components/jquery/jquery.js", 275);},

	// Determine the position of an element within
	// the matched set of elements
	index: function(){___jdce_logger("/bower_components/jquery/jquery.js", 276);},

	add: function(){___jdce_logger("/bower_components/jquery/jquery.js", 277);},

	addBack: function(){___jdce_logger("/bower_components/jquery/jquery.js", 278);}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

function sibling(){___jdce_logger("/bower_components/jquery/jquery.js", 279);}

jQuery.each({
	parent: function(){___jdce_logger("/bower_components/jquery/jquery.js", 280);},
	parents: function(){___jdce_logger("/bower_components/jquery/jquery.js", 281);},
	parentsUntil: function(){___jdce_logger("/bower_components/jquery/jquery.js", 282);},
	next: function(){___jdce_logger("/bower_components/jquery/jquery.js", 283);},
	prev: function(){___jdce_logger("/bower_components/jquery/jquery.js", 284);},
	nextAll: function(){___jdce_logger("/bower_components/jquery/jquery.js", 285);},
	prevAll: function(){___jdce_logger("/bower_components/jquery/jquery.js", 286);},
	nextUntil: function(){___jdce_logger("/bower_components/jquery/jquery.js", 287);},
	prevUntil: function(){___jdce_logger("/bower_components/jquery/jquery.js", 288);},
	siblings: function(){___jdce_logger("/bower_components/jquery/jquery.js", 289);},
	children: function(){___jdce_logger("/bower_components/jquery/jquery.js", 290);},
	contents: function(){___jdce_logger("/bower_components/jquery/jquery.js", 291);}
}, function( name, fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 292);
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 293);};
});

jQuery.extend({
	filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 294);},

	dir: function(){___jdce_logger("/bower_components/jquery/jquery.js", 295);},

	sibling: function(){___jdce_logger("/bower_components/jquery/jquery.js", 296);}
});

// Implement the identical functionality for filter and not
function winnow(){___jdce_logger("/bower_components/jquery/jquery.js", 297);}
function createSafeFragment( document ) {___jdce_logger("/bower_components/jquery/jquery.js", 298);
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function(){___jdce_logger("/bower_components/jquery/jquery.js", 299);},

	wrapAll: function(){___jdce_logger("/bower_components/jquery/jquery.js", 300);},

	wrapInner: function(){___jdce_logger("/bower_components/jquery/jquery.js", 301);},

	wrap: function(){___jdce_logger("/bower_components/jquery/jquery.js", 302);},

	unwrap: function(){___jdce_logger("/bower_components/jquery/jquery.js", 303);},

	append: function(){___jdce_logger("/bower_components/jquery/jquery.js", 304);},

	prepend: function(){___jdce_logger("/bower_components/jquery/jquery.js", 305);},

	before: function(){___jdce_logger("/bower_components/jquery/jquery.js", 306);},

	after: function(){___jdce_logger("/bower_components/jquery/jquery.js", 307);},

	// keepData is for internal use only--do not document
	remove: function(){___jdce_logger("/bower_components/jquery/jquery.js", 308);},

	empty: function(){___jdce_logger("/bower_components/jquery/jquery.js", 309);},

	clone: function(){___jdce_logger("/bower_components/jquery/jquery.js", 310);},

	html: function(){___jdce_logger("/bower_components/jquery/jquery.js", 311);},

	replaceWith: function(){___jdce_logger("/bower_components/jquery/jquery.js", 312);},

	detach: function(){___jdce_logger("/bower_components/jquery/jquery.js", 313);},

	domManip: function(){___jdce_logger("/bower_components/jquery/jquery.js", 314);}
});

function findOrAppend(){___jdce_logger("/bower_components/jquery/jquery.js", 315);}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(){___jdce_logger("/bower_components/jquery/jquery.js", 316);}
function restoreScript(){___jdce_logger("/bower_components/jquery/jquery.js", 317);}

// Mark scripts as having already been evaluated
function setGlobalEval(){___jdce_logger("/bower_components/jquery/jquery.js", 318);}

function cloneCopyEvent(){___jdce_logger("/bower_components/jquery/jquery.js", 319);}

function fixCloneNodeIssues(){___jdce_logger("/bower_components/jquery/jquery.js", 320);}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {___jdce_logger("/bower_components/jquery/jquery.js", 321);
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 322);};
});

function getAll(){___jdce_logger("/bower_components/jquery/jquery.js", 323);}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked(){___jdce_logger("/bower_components/jquery/jquery.js", 324);}

jQuery.extend({
	clone: function(){___jdce_logger("/bower_components/jquery/jquery.js", 325);},

	buildFragment: function(){___jdce_logger("/bower_components/jquery/jquery.js", 326);},

	cleanData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 327);}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName(){___jdce_logger("/bower_components/jquery/jquery.js", 328);}

function isHidden(){___jdce_logger("/bower_components/jquery/jquery.js", 329);}

function showHide(){___jdce_logger("/bower_components/jquery/jquery.js", 330);}

jQuery.fn.extend({
	css: function(){___jdce_logger("/bower_components/jquery/jquery.js", 331);},
	show: function(){___jdce_logger("/bower_components/jquery/jquery.js", 332);},
	hide: function(){___jdce_logger("/bower_components/jquery/jquery.js", 333);},
	toggle: function(){___jdce_logger("/bower_components/jquery/jquery.js", 334);}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 335);}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function(){___jdce_logger("/bower_components/jquery/jquery.js", 336);},

	css: function(){___jdce_logger("/bower_components/jquery/jquery.js", 337);},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function(){___jdce_logger("/bower_components/jquery/jquery.js", 338);}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function(){___jdce_logger("/bower_components/jquery/jquery.js", 339);};

	curCSS = function(){___jdce_logger("/bower_components/jquery/jquery.js", 340);};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function(){___jdce_logger("/bower_components/jquery/jquery.js", 341);};

	curCSS = function(){___jdce_logger("/bower_components/jquery/jquery.js", 342);};
}

function setPositiveNumber(){___jdce_logger("/bower_components/jquery/jquery.js", 343);}

function augmentWidthOrHeight(){___jdce_logger("/bower_components/jquery/jquery.js", 344);}

function getWidthOrHeight(){___jdce_logger("/bower_components/jquery/jquery.js", 345);}

// Try to determine the default display value of an element
function css_defaultDisplay(){___jdce_logger("/bower_components/jquery/jquery.js", 346);}

// Called ONLY from within css_defaultDisplay
function actualDisplay(){___jdce_logger("/bower_components/jquery/jquery.js", 347);}

jQuery.each([ "height", "width" ], function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 348);
	jQuery.cssHooks[ name ] = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 349);},

		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 350);}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 351);},

		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 352);}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {___jdce_logger("/bower_components/jquery/jquery.js", 353);
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 354);}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {___jdce_logger("/bower_components/jquery/jquery.js", 355);
			jQuery.cssHooks[ prop ] = {
				get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 356);}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function(){___jdce_logger("/bower_components/jquery/jquery.js", 357);};

	jQuery.expr.filters.visible = function(){___jdce_logger("/bower_components/jquery/jquery.js", 358);};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {___jdce_logger("/bower_components/jquery/jquery.js", 359);
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function(){___jdce_logger("/bower_components/jquery/jquery.js", 360);}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function(){___jdce_logger("/bower_components/jquery/jquery.js", 361);},
	serializeArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 362);}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function(){___jdce_logger("/bower_components/jquery/jquery.js", 363);};

function buildParams(){___jdce_logger("/bower_components/jquery/jquery.js", 364);}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 365);

	// Handle event binding
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 366);};
});

jQuery.fn.hover = function(){___jdce_logger("/bower_components/jquery/jquery.js", 367);};
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {___jdce_logger("/bower_components/jquery/jquery.js", 368);

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {___jdce_logger("/bower_components/jquery/jquery.js", 369);

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports(){___jdce_logger("/bower_components/jquery/jquery.js", 370);}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {___jdce_logger("/bower_components/jquery/jquery.js", 371);
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function(){___jdce_logger("/bower_components/jquery/jquery.js", 372);};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){___jdce_logger("/bower_components/jquery/jquery.js", 373);
	jQuery.fn[ type ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 374);};
});

jQuery.each( [ "get", "post" ], function( i, method ) {___jdce_logger("/bower_components/jquery/jquery.js", 375);
	jQuery[ method ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 376);};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {___jdce_logger("/bower_components/jquery/jquery.js", 377);
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function(){___jdce_logger("/bower_components/jquery/jquery.js", 378);},

	getScript: function(){___jdce_logger("/bower_components/jquery/jquery.js", 379);},

	getJSON: function(){___jdce_logger("/bower_components/jquery/jquery.js", 380);}
});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses(){___jdce_logger("/bower_components/jquery/jquery.js", 381);}

// Chain conversions given the request and the original response
function ajaxConvert(){___jdce_logger("/bower_components/jquery/jquery.js", 382);}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function(){___jdce_logger("/bower_components/jquery/jquery.js", 383);}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function(){___jdce_logger("/bower_components/jquery/jquery.js", 384);});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(){___jdce_logger("/bower_components/jquery/jquery.js", 385);});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function(){___jdce_logger("/bower_components/jquery/jquery.js", 386);}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function(){___jdce_logger("/bower_components/jquery/jquery.js", 387);});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function(){___jdce_logger("/bower_components/jquery/jquery.js", 388);};

// Functions to create xhrs
function createStandardXHR() {___jdce_logger("/bower_components/jquery/jquery.js", 389);
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR(){___jdce_logger("/bower_components/jquery/jquery.js", 390);}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 391);} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function(){___jdce_logger("/bower_components/jquery/jquery.js", 392);});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function(){___jdce_logger("/bower_components/jquery/jquery.js", 393);}]
	};

// Animations created synchronously will run synchronously
function createFxNow(){___jdce_logger("/bower_components/jquery/jquery.js", 394);}

function createTweens(){___jdce_logger("/bower_components/jquery/jquery.js", 395);}

function Animation(){___jdce_logger("/bower_components/jquery/jquery.js", 396);}

function propFilter(){___jdce_logger("/bower_components/jquery/jquery.js", 397);}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function(){___jdce_logger("/bower_components/jquery/jquery.js", 398);},

	prefilter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 399);}
});

function defaultPrefilter(){___jdce_logger("/bower_components/jquery/jquery.js", 400);}

function Tween(){___jdce_logger("/bower_components/jquery/jquery.js", 401);}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function(){___jdce_logger("/bower_components/jquery/jquery.js", 402);},
	cur: function(){___jdce_logger("/bower_components/jquery/jquery.js", 403);},
	run: function(){___jdce_logger("/bower_components/jquery/jquery.js", 404);}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 405);},
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 406);}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 407);}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 408);
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 409);};
});

jQuery.fn.extend({
	fadeTo: function(){___jdce_logger("/bower_components/jquery/jquery.js", 410);},
	animate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 411);},
	stop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 412);},
	finish: function(){___jdce_logger("/bower_components/jquery/jquery.js", 413);}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {___jdce_logger("/bower_components/jquery/jquery.js", 414);
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {___jdce_logger("/bower_components/jquery/jquery.js", 415);
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 416);};
});

jQuery.speed = function(){___jdce_logger("/bower_components/jquery/jquery.js", 417);};

jQuery.easing = {
	linear: function(){___jdce_logger("/bower_components/jquery/jquery.js", 418);},
	swing: function(){___jdce_logger("/bower_components/jquery/jquery.js", 419);}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function(){___jdce_logger("/bower_components/jquery/jquery.js", 420);};

jQuery.fx.timer = function(){___jdce_logger("/bower_components/jquery/jquery.js", 421);};

jQuery.fx.interval = 13;

jQuery.fx.start = function(){___jdce_logger("/bower_components/jquery/jquery.js", 422);};

jQuery.fx.stop = function(){___jdce_logger("/bower_components/jquery/jquery.js", 423);};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function(){___jdce_logger("/bower_components/jquery/jquery.js", 424);};
}
jQuery.fn.offset = function(){___jdce_logger("/bower_components/jquery/jquery.js", 425);};

jQuery.offset = {

	setOffset: function(){___jdce_logger("/bower_components/jquery/jquery.js", 426);}
};


jQuery.fn.extend({

	position: function(){___jdce_logger("/bower_components/jquery/jquery.js", 427);},

	offsetParent: function(){___jdce_logger("/bower_components/jquery/jquery.js", 428);}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {___jdce_logger("/bower_components/jquery/jquery.js", 429);
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 430);};
});

function getWindow(){___jdce_logger("/bower_components/jquery/jquery.js", 431);}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {___jdce_logger("/bower_components/jquery/jquery.js", 432);
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {___jdce_logger("/bower_components/jquery/jquery.js", 433);
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 434);};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// })();
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function(){___jdce_logger("/bower_components/jquery/jquery.js", 435);} );
}

})( window );
