/*!
 * jQuery JavaScript Library v2.1.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:10Z
 */

(function( global, factory ) {___jdce_logger("/bower_components/jquery/jquery.js", 0);

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function(){___jdce_logger("/bower_components/jquery/jquery.js", 1);};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {___jdce_logger("/bower_components/jquery/jquery.js", 2);

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {___jdce_logger("/bower_components/jquery/jquery.js", 3);
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function(){___jdce_logger("/bower_components/jquery/jquery.js", 4);};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 5);},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 6);},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function(){___jdce_logger("/bower_components/jquery/jquery.js", 7);},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {___jdce_logger("/bower_components/jquery/jquery.js", 8);
		return jQuery.each( this, callback, args );
	},

	map: function(){___jdce_logger("/bower_components/jquery/jquery.js", 9);},

	slice: function(){___jdce_logger("/bower_components/jquery/jquery.js", 10);},

	first: function(){___jdce_logger("/bower_components/jquery/jquery.js", 11);},

	last: function(){___jdce_logger("/bower_components/jquery/jquery.js", 12);},

	eq: function(){___jdce_logger("/bower_components/jquery/jquery.js", 13);},

	end: function(){___jdce_logger("/bower_components/jquery/jquery.js", 14);},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {___jdce_logger("/bower_components/jquery/jquery.js", 15);
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
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
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function(){___jdce_logger("/bower_components/jquery/jquery.js", 16);},

	noop: function() {___jdce_logger("/bower_components/jquery/jquery.js", 17);},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 18);
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 19);
		return obj != null && obj === obj.window;
	},

	isNumeric: function(){___jdce_logger("/bower_components/jquery/jquery.js", 20);},

	isPlainObject: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 21);
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 22);
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 23);
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function(){___jdce_logger("/bower_components/jquery/jquery.js", 24);},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {___jdce_logger("/bower_components/jquery/jquery.js", 25);
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function(){___jdce_logger("/bower_components/jquery/jquery.js", 26);},

	// args is for internal usage only
	each: function( obj, callback, args ) {___jdce_logger("/bower_components/jquery/jquery.js", 27);
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

	trim: function( text ) {___jdce_logger("/bower_components/jquery/jquery.js", 28);
		return text == null ? "" : trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {___jdce_logger("/bower_components/jquery/jquery.js", 29);
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 30);},

	merge: function( first, second ) {___jdce_logger("/bower_components/jquery/jquery.js", 31);
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {___jdce_logger("/bower_components/jquery/jquery.js", 32);
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function(){___jdce_logger("/bower_components/jquery/jquery.js", 33);},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {___jdce_logger("/bower_components/jquery/jquery.js", 34);
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {___jdce_logger("/bower_components/jquery/jquery.js", 35);
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {___jdce_logger("/bower_components/jquery/jquery.js", 36);
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 37);
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {___jdce_logger("/bower_components/jquery/jquery.js", 38);

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {___jdce_logger("/bower_components/jquery/jquery.js", 39);
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function(){___jdce_logger("/bower_components/jquery/jquery.js", 40);},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

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
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

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
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function(){___jdce_logger("/bower_components/jquery/jquery.js", 41);};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 42);} :

		// Support: IE<9
		// Otherwise append directly
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 43);}
	};
}

function Sizzle(){___jdce_logger("/bower_components/jquery/jquery.js", 44);}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {___jdce_logger("/bower_components/jquery/jquery.js", 45);
	var keys = [];

	function cache(){___jdce_logger("/bower_components/jquery/jquery.js", 46);}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 47);
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 48);
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle(){___jdce_logger("/bower_components/jquery/jquery.js", 49);}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck(){___jdce_logger("/bower_components/jquery/jquery.js", 50);}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {___jdce_logger("/bower_components/jquery/jquery.js", 51);
	return function(){___jdce_logger("/bower_components/jquery/jquery.js", 52);};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {___jdce_logger("/bower_components/jquery/jquery.js", 53);
	return function(){___jdce_logger("/bower_components/jquery/jquery.js", 54);};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 55);
	return markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 56);});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext(){___jdce_logger("/bower_components/jquery/jquery.js", 57);}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {___jdce_logger("/bower_components/jquery/jquery.js", 58);
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
setDocument = Sizzle.setDocument = function( node ) {___jdce_logger("/bower_components/jquery/jquery.js", 59);
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function(){___jdce_logger("/bower_components/jquery/jquery.js", 60);}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function(){___jdce_logger("/bower_components/jquery/jquery.js", 61);});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 62);
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 63);
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 64);
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 65);
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 66);};
		Expr.filter["ID"] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 67);};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function(){___jdce_logger("/bower_components/jquery/jquery.js", 68);};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 69);} :
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 70);};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function(){___jdce_logger("/bower_components/jquery/jquery.js", 71);};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 72);
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 73);
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
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

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 74);
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 75);} :
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 76);};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 77);} :
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 78);};

	return doc;
};

Sizzle.matches = function(){___jdce_logger("/bower_components/jquery/jquery.js", 79);};

Sizzle.matchesSelector = function(){___jdce_logger("/bower_components/jquery/jquery.js", 80);};

Sizzle.contains = function(){___jdce_logger("/bower_components/jquery/jquery.js", 81);};

Sizzle.attr = function(){___jdce_logger("/bower_components/jquery/jquery.js", 82);};

Sizzle.error = function(){___jdce_logger("/bower_components/jquery/jquery.js", 83);};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function(){___jdce_logger("/bower_components/jquery/jquery.js", 84);};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function(){___jdce_logger("/bower_components/jquery/jquery.js", 85);};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function(){___jdce_logger("/bower_components/jquery/jquery.js", 86);},

		"CHILD": function(){___jdce_logger("/bower_components/jquery/jquery.js", 87);},

		"PSEUDO": function(){___jdce_logger("/bower_components/jquery/jquery.js", 88);}
	},

	filter: {

		"TAG": function(){___jdce_logger("/bower_components/jquery/jquery.js", 89);},

		"CLASS": function(){___jdce_logger("/bower_components/jquery/jquery.js", 90);},

		"ATTR": function(){___jdce_logger("/bower_components/jquery/jquery.js", 91);},

		"CHILD": function(){___jdce_logger("/bower_components/jquery/jquery.js", 92);},

		"PSEUDO": function(){___jdce_logger("/bower_components/jquery/jquery.js", 93);}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 94);}),

		"has": markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 95);}),

		"contains": markFunction(function(){___jdce_logger("/bower_components/jquery/jquery.js", 96);}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function(){___jdce_logger("/bower_components/jquery/jquery.js", 97);}),

		// Miscellaneous
		"target": function(){___jdce_logger("/bower_components/jquery/jquery.js", 98);},

		"root": function(){___jdce_logger("/bower_components/jquery/jquery.js", 99);},

		"focus": function(){___jdce_logger("/bower_components/jquery/jquery.js", 100);},

		// Boolean properties
		"enabled": function(){___jdce_logger("/bower_components/jquery/jquery.js", 101);},

		"disabled": function(){___jdce_logger("/bower_components/jquery/jquery.js", 102);},

		"checked": function(){___jdce_logger("/bower_components/jquery/jquery.js", 103);},

		"selected": function(){___jdce_logger("/bower_components/jquery/jquery.js", 104);},

		// Contents
		"empty": function(){___jdce_logger("/bower_components/jquery/jquery.js", 105);},

		"parent": function(){___jdce_logger("/bower_components/jquery/jquery.js", 106);},

		// Element/input types
		"header": function(){___jdce_logger("/bower_components/jquery/jquery.js", 107);},

		"input": function(){___jdce_logger("/bower_components/jquery/jquery.js", 108);},

		"button": function(){___jdce_logger("/bower_components/jquery/jquery.js", 109);},

		"text": function(){___jdce_logger("/bower_components/jquery/jquery.js", 110);},

		// Position-in-collection
		"first": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 111);}),

		"last": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 112);}),

		"eq": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 113);}),

		"even": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 114);}),

		"odd": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 115);}),

		"lt": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 116);}),

		"gt": createPositionalPseudo(function(){___jdce_logger("/bower_components/jquery/jquery.js", 117);})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {___jdce_logger("/bower_components/jquery/jquery.js", 118);}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize(){___jdce_logger("/bower_components/jquery/jquery.js", 119);}

function toSelector(){___jdce_logger("/bower_components/jquery/jquery.js", 120);}

function addCombinator(){___jdce_logger("/bower_components/jquery/jquery.js", 121);}

function elementMatcher(){___jdce_logger("/bower_components/jquery/jquery.js", 122);}

function condense(){___jdce_logger("/bower_components/jquery/jquery.js", 123);}

function setMatcher(){___jdce_logger("/bower_components/jquery/jquery.js", 124);}

function matcherFromTokens(){___jdce_logger("/bower_components/jquery/jquery.js", 125);}

function matcherFromGroupMatchers(){___jdce_logger("/bower_components/jquery/jquery.js", 126);}

compile = Sizzle.compile = function(){___jdce_logger("/bower_components/jquery/jquery.js", 127);};

function multipleContexts(){___jdce_logger("/bower_components/jquery/jquery.js", 128);}

function select(){___jdce_logger("/bower_components/jquery/jquery.js", 129);}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {___jdce_logger("/bower_components/jquery/jquery.js", 130);
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 131);
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function(){___jdce_logger("/bower_components/jquery/jquery.js", 132);});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 133);
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function(){___jdce_logger("/bower_components/jquery/jquery.js", 134);});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {___jdce_logger("/bower_components/jquery/jquery.js", 135);
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function(){___jdce_logger("/bower_components/jquery/jquery.js", 136);});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow(){___jdce_logger("/bower_components/jquery/jquery.js", 137);}

jQuery.filter = function(){___jdce_logger("/bower_components/jquery/jquery.js", 138);};

jQuery.fn.extend({
	find: function(){___jdce_logger("/bower_components/jquery/jquery.js", 139);},
	filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 140);},
	not: function(){___jdce_logger("/bower_components/jquery/jquery.js", 141);},
	is: function(){___jdce_logger("/bower_components/jquery/jquery.js", 142);}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {___jdce_logger("/bower_components/jquery/jquery.js", 143);
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
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
					// Intentionally let the error be thrown if parseHTML is not present
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
						// Inject the element directly into the jQuery object
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
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function(){___jdce_logger("/bower_components/jquery/jquery.js", 144);},

	sibling: function(){___jdce_logger("/bower_components/jquery/jquery.js", 145);}
});

jQuery.fn.extend({
	has: function(){___jdce_logger("/bower_components/jquery/jquery.js", 146);},

	closest: function(){___jdce_logger("/bower_components/jquery/jquery.js", 147);},

	// Determine the position of an element within
	// the matched set of elements
	index: function(){___jdce_logger("/bower_components/jquery/jquery.js", 148);},

	add: function(){___jdce_logger("/bower_components/jquery/jquery.js", 149);},

	addBack: function(){___jdce_logger("/bower_components/jquery/jquery.js", 150);}
});

function sibling(){___jdce_logger("/bower_components/jquery/jquery.js", 151);}

jQuery.each({
	parent: function(){___jdce_logger("/bower_components/jquery/jquery.js", 152);},
	parents: function(){___jdce_logger("/bower_components/jquery/jquery.js", 153);},
	parentsUntil: function(){___jdce_logger("/bower_components/jquery/jquery.js", 154);},
	next: function(){___jdce_logger("/bower_components/jquery/jquery.js", 155);},
	prev: function(){___jdce_logger("/bower_components/jquery/jquery.js", 156);},
	nextAll: function(){___jdce_logger("/bower_components/jquery/jquery.js", 157);},
	prevAll: function(){___jdce_logger("/bower_components/jquery/jquery.js", 158);},
	nextUntil: function(){___jdce_logger("/bower_components/jquery/jquery.js", 159);},
	prevUntil: function(){___jdce_logger("/bower_components/jquery/jquery.js", 160);},
	siblings: function(){___jdce_logger("/bower_components/jquery/jquery.js", 161);},
	children: function(){___jdce_logger("/bower_components/jquery/jquery.js", 162);},
	contents: function(){___jdce_logger("/bower_components/jquery/jquery.js", 163);}
}, function( name, fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 164);
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 165);};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {___jdce_logger("/bower_components/jquery/jquery.js", 166);
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {___jdce_logger("/bower_components/jquery/jquery.js", 167);
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
jQuery.Callbacks = function( options ) {___jdce_logger("/bower_components/jquery/jquery.js", 168);

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {___jdce_logger("/bower_components/jquery/jquery.js", 169);
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
			add: function() {___jdce_logger("/bower_components/jquery/jquery.js", 170);
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {___jdce_logger("/bower_components/jquery/jquery.js", 171);
						jQuery.each( args, function( _, arg ) {___jdce_logger("/bower_components/jquery/jquery.js", 172);
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
			remove: function(){___jdce_logger("/bower_components/jquery/jquery.js", 173);},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function(){___jdce_logger("/bower_components/jquery/jquery.js", 174);},
			// Remove all callbacks from the list
			empty: function(){___jdce_logger("/bower_components/jquery/jquery.js", 175);},
			// Have the list do nothing anymore
			disable: function() {___jdce_logger("/bower_components/jquery/jquery.js", 176);
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function(){___jdce_logger("/bower_components/jquery/jquery.js", 177);},
			// Lock the list in its current state
			lock: function() {___jdce_logger("/bower_components/jquery/jquery.js", 178);
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function(){___jdce_logger("/bower_components/jquery/jquery.js", 179);},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {___jdce_logger("/bower_components/jquery/jquery.js", 180);
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function(){___jdce_logger("/bower_components/jquery/jquery.js", 181);},
			// To know if the callbacks have already been called at least once
			fired: function(){___jdce_logger("/bower_components/jquery/jquery.js", 182);}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {___jdce_logger("/bower_components/jquery/jquery.js", 183);
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function(){___jdce_logger("/bower_components/jquery/jquery.js", 184);},
				always: function(){___jdce_logger("/bower_components/jquery/jquery.js", 185);},
				then: function(){___jdce_logger("/bower_components/jquery/jquery.js", 186);},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 187);
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {___jdce_logger("/bower_components/jquery/jquery.js", 188);
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {___jdce_logger("/bower_components/jquery/jquery.js", 189);
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {___jdce_logger("/bower_components/jquery/jquery.js", 190);
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
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
	when: function(){___jdce_logger("/bower_components/jquery/jquery.js", 191);}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function(){___jdce_logger("/bower_components/jquery/jquery.js", 192);};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function(){___jdce_logger("/bower_components/jquery/jquery.js", 193);},

	// Handle when the DOM is ready
	ready: function( wait ) {___jdce_logger("/bower_components/jquery/jquery.js", 194);

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
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
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {___jdce_logger("/bower_components/jquery/jquery.js", 195);
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {___jdce_logger("/bower_components/jquery/jquery.js", 196);
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {___jdce_logger("/bower_components/jquery/jquery.js", 197);
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function(){___jdce_logger("/bower_components/jquery/jquery.js", 198);};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {___jdce_logger("/bower_components/jquery/jquery.js", 199);
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {___jdce_logger("/bower_components/jquery/jquery.js", 200);
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 201);}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {___jdce_logger("/bower_components/jquery/jquery.js", 202);
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 203);},
	get: function( owner, key ) {___jdce_logger("/bower_components/jquery/jquery.js", 204);
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function(){___jdce_logger("/bower_components/jquery/jquery.js", 205);},
	remove: function(){___jdce_logger("/bower_components/jquery/jquery.js", 206);},
	hasData: function( owner ) {___jdce_logger("/bower_components/jquery/jquery.js", 207);
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function(){___jdce_logger("/bower_components/jquery/jquery.js", 208);}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {___jdce_logger("/bower_components/jquery/jquery.js", 209);
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 210);},

	data: function(){___jdce_logger("/bower_components/jquery/jquery.js", 211);},

	removeData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 212);},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function(){___jdce_logger("/bower_components/jquery/jquery.js", 213);},

	_removeData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 214);}
});

jQuery.fn.extend({
	data: function( key, value ) {___jdce_logger("/bower_components/jquery/jquery.js", 215);
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function(){___jdce_logger("/bower_components/jquery/jquery.js", 216);});
		}

		return access( this, function( value ) {___jdce_logger("/bower_components/jquery/jquery.js", 217);
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function(){___jdce_logger("/bower_components/jquery/jquery.js", 218);});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function(){___jdce_logger("/bower_components/jquery/jquery.js", 219);}
});


jQuery.extend({
	queue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 220);},

	dequeue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 221);},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function(){___jdce_logger("/bower_components/jquery/jquery.js", 222);}
});

jQuery.fn.extend({
	queue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 223);},
	dequeue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 224);},
	clearQueue: function(){___jdce_logger("/bower_components/jquery/jquery.js", 225);},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function(){___jdce_logger("/bower_components/jquery/jquery.js", 226);}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function(){___jdce_logger("/bower_components/jquery/jquery.js", 227);};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {___jdce_logger("/bower_components/jquery/jquery.js", 228);
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) );

	// #11217 - WebKit loses check when the name is after the checked attribute
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue(){___jdce_logger("/bower_components/jquery/jquery.js", 229);}

function returnFalse() {___jdce_logger("/bower_components/jquery/jquery.js", 230);
	return false;
}

function safeActiveElement(){___jdce_logger("/bower_components/jquery/jquery.js", 231);}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {___jdce_logger("/bower_components/jquery/jquery.js", 232);

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function(){___jdce_logger("/bower_components/jquery/jquery.js", 233);};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {___jdce_logger("/bower_components/jquery/jquery.js", 234);

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
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
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {___jdce_logger("/bower_components/jquery/jquery.js", 235);

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

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

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
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
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function(){___jdce_logger("/bower_components/jquery/jquery.js", 236);},

	handlers: function(){___jdce_logger("/bower_components/jquery/jquery.js", 237);},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 238);}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 239);}
	},

	fix: function(){___jdce_logger("/bower_components/jquery/jquery.js", 240);},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function(){___jdce_logger("/bower_components/jquery/jquery.js", 241);},
			delegateType: "focusin"
		},
		blur: {
			trigger: function(){___jdce_logger("/bower_components/jquery/jquery.js", 242);},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function(){___jdce_logger("/bower_components/jquery/jquery.js", 243);},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function(){___jdce_logger("/bower_components/jquery/jquery.js", 244);}
		},

		beforeunload: {
			postDispatch: function(){___jdce_logger("/bower_components/jquery/jquery.js", 245);}
		}
	},

	simulate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 246);}
};

jQuery.removeEvent = function(){___jdce_logger("/bower_components/jquery/jquery.js", 247);};

jQuery.Event = function( src, props ) {___jdce_logger("/bower_components/jquery/jquery.js", 248);
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
		this.isDefaultPrevented = src.defaultPrevented ||
				// Support: Android < 4.0
				src.defaultPrevented === undefined &&
				src.getPreventDefault && src.getPreventDefault() ?
			returnTrue :
			returnFalse;

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

	preventDefault: function(){___jdce_logger("/bower_components/jquery/jquery.js", 249);},
	stopPropagation: function(){___jdce_logger("/bower_components/jquery/jquery.js", 250);},
	stopImmediatePropagation: function(){___jdce_logger("/bower_components/jquery/jquery.js", 251);}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {___jdce_logger("/bower_components/jquery/jquery.js", 252);
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function(){___jdce_logger("/bower_components/jquery/jquery.js", 253);}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {___jdce_logger("/bower_components/jquery/jquery.js", 254);

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function(){___jdce_logger("/bower_components/jquery/jquery.js", 255);};

		jQuery.event.special[ fix ] = {
			setup: function(){___jdce_logger("/bower_components/jquery/jquery.js", 256);},
			teardown: function(){___jdce_logger("/bower_components/jquery/jquery.js", 257);}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {___jdce_logger("/bower_components/jquery/jquery.js", 258);
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function(){___jdce_logger("/bower_components/jquery/jquery.js", 259);};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {___jdce_logger("/bower_components/jquery/jquery.js", 260);
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function(){___jdce_logger("/bower_components/jquery/jquery.js", 261);},
	off: function( types, selector, fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 262);
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
		return this.each(function() {___jdce_logger("/bower_components/jquery/jquery.js", 263);
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {___jdce_logger("/bower_components/jquery/jquery.js", 264);
		return this.each(function() {___jdce_logger("/bower_components/jquery/jquery.js", 265);
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function(){___jdce_logger("/bower_components/jquery/jquery.js", 266);}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget(){___jdce_logger("/bower_components/jquery/jquery.js", 267);}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript(){___jdce_logger("/bower_components/jquery/jquery.js", 268);}
function restoreScript(){___jdce_logger("/bower_components/jquery/jquery.js", 269);}

// Mark scripts as having already been evaluated
function setGlobalEval(){___jdce_logger("/bower_components/jquery/jquery.js", 270);}

function cloneCopyEvent(){___jdce_logger("/bower_components/jquery/jquery.js", 271);}

function getAll( context, tag ) {___jdce_logger("/bower_components/jquery/jquery.js", 272);
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput(){___jdce_logger("/bower_components/jquery/jquery.js", 273);}

jQuery.extend({
	clone: function(){___jdce_logger("/bower_components/jquery/jquery.js", 274);},

	buildFragment: function(){___jdce_logger("/bower_components/jquery/jquery.js", 275);},

	cleanData: function( elems ) {___jdce_logger("/bower_components/jquery/jquery.js", 276);
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function(){___jdce_logger("/bower_components/jquery/jquery.js", 277);},

	append: function(){___jdce_logger("/bower_components/jquery/jquery.js", 278);},

	prepend: function(){___jdce_logger("/bower_components/jquery/jquery.js", 279);},

	before: function(){___jdce_logger("/bower_components/jquery/jquery.js", 280);},

	after: function(){___jdce_logger("/bower_components/jquery/jquery.js", 281);},

	remove: function(){___jdce_logger("/bower_components/jquery/jquery.js", 282);},

	empty: function(){___jdce_logger("/bower_components/jquery/jquery.js", 283);},

	clone: function(){___jdce_logger("/bower_components/jquery/jquery.js", 284);},

	html: function( value ) {___jdce_logger("/bower_components/jquery/jquery.js", 285);
		return access( this, function( value ) {___jdce_logger("/bower_components/jquery/jquery.js", 286);
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function(){___jdce_logger("/bower_components/jquery/jquery.js", 287);},

	detach: function(){___jdce_logger("/bower_components/jquery/jquery.js", 288);},

	domManip: function(){___jdce_logger("/bower_components/jquery/jquery.js", 289);}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {___jdce_logger("/bower_components/jquery/jquery.js", 290);
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 291);};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay(){___jdce_logger("/bower_components/jquery/jquery.js", 292);}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay(){___jdce_logger("/bower_components/jquery/jquery.js", 293);}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function(){___jdce_logger("/bower_components/jquery/jquery.js", 294);};



function curCSS(){___jdce_logger("/bower_components/jquery/jquery.js", 295);}


function addGetHookIf( conditionFn, hookFn ) {___jdce_logger("/bower_components/jquery/jquery.js", 296);
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 297);}
	};
}


(function() {___jdce_logger("/bower_components/jquery/jquery.js", 298);
	var pixelPositionVal, boxSizingReliableVal,
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;" +
			"-moz-box-sizing:content-box;box-sizing:content-box",
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;" +
		"margin-top:1px";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable(){___jdce_logger("/bower_components/jquery/jquery.js", 299);}

	// Use window.getComputedStyle because jsdom on node.js will break without it.
	if ( window.getComputedStyle ) {
		jQuery.extend(support, {
			pixelPosition: function(){___jdce_logger("/bower_components/jquery/jquery.js", 300);},
			boxSizingReliable: function(){___jdce_logger("/bower_components/jquery/jquery.js", 301);},
			reliableMarginRight: function(){___jdce_logger("/bower_components/jquery/jquery.js", 302);}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function(){___jdce_logger("/bower_components/jquery/jquery.js", 303);};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName(){___jdce_logger("/bower_components/jquery/jquery.js", 304);}

function setPositiveNumber(){___jdce_logger("/bower_components/jquery/jquery.js", 305);}

function augmentWidthOrHeight(){___jdce_logger("/bower_components/jquery/jquery.js", 306);}

function getWidthOrHeight(){___jdce_logger("/bower_components/jquery/jquery.js", 307);}

function showHide(){___jdce_logger("/bower_components/jquery/jquery.js", 308);}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 309);}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function(){___jdce_logger("/bower_components/jquery/jquery.js", 310);},

	css: function(){___jdce_logger("/bower_components/jquery/jquery.js", 311);}
});

jQuery.each([ "height", "width" ], function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 312);
	jQuery.cssHooks[ name ] = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 313);},

		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 314);}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function(){___jdce_logger("/bower_components/jquery/jquery.js", 315);}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {___jdce_logger("/bower_components/jquery/jquery.js", 316);
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function(){___jdce_logger("/bower_components/jquery/jquery.js", 317);}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function(){___jdce_logger("/bower_components/jquery/jquery.js", 318);},
	show: function(){___jdce_logger("/bower_components/jquery/jquery.js", 319);},
	hide: function(){___jdce_logger("/bower_components/jquery/jquery.js", 320);},
	toggle: function(){___jdce_logger("/bower_components/jquery/jquery.js", 321);}
});


function Tween(){___jdce_logger("/bower_components/jquery/jquery.js", 322);}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function(){___jdce_logger("/bower_components/jquery/jquery.js", 323);},
	cur: function(){___jdce_logger("/bower_components/jquery/jquery.js", 324);},
	run: function(){___jdce_logger("/bower_components/jquery/jquery.js", 325);}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 326);},
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 327);}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 328);}
};

jQuery.easing = {
	linear: function(){___jdce_logger("/bower_components/jquery/jquery.js", 329);},
	swing: function(){___jdce_logger("/bower_components/jquery/jquery.js", 330);}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function(){___jdce_logger("/bower_components/jquery/jquery.js", 331);} ]
	};

// Animations created synchronously will run synchronously
function createFxNow(){___jdce_logger("/bower_components/jquery/jquery.js", 332);}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {___jdce_logger("/bower_components/jquery/jquery.js", 333);
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween(){___jdce_logger("/bower_components/jquery/jquery.js", 334);}

function defaultPrefilter(){___jdce_logger("/bower_components/jquery/jquery.js", 335);}

function propFilter(){___jdce_logger("/bower_components/jquery/jquery.js", 336);}

function Animation(){___jdce_logger("/bower_components/jquery/jquery.js", 337);}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function(){___jdce_logger("/bower_components/jquery/jquery.js", 338);},

	prefilter: function(){___jdce_logger("/bower_components/jquery/jquery.js", 339);}
});

jQuery.speed = function(){___jdce_logger("/bower_components/jquery/jquery.js", 340);};

jQuery.fn.extend({
	fadeTo: function(){___jdce_logger("/bower_components/jquery/jquery.js", 341);},
	animate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 342);},
	stop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 343);},
	finish: function(){___jdce_logger("/bower_components/jquery/jquery.js", 344);}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 345);
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 346);};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {___jdce_logger("/bower_components/jquery/jquery.js", 347);
	jQuery.fn[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 348);};
});

jQuery.timers = [];
jQuery.fx.tick = function(){___jdce_logger("/bower_components/jquery/jquery.js", 349);};

jQuery.fx.timer = function(){___jdce_logger("/bower_components/jquery/jquery.js", 350);};

jQuery.fx.interval = 13;

jQuery.fx.start = function(){___jdce_logger("/bower_components/jquery/jquery.js", 351);};

jQuery.fx.stop = function(){___jdce_logger("/bower_components/jquery/jquery.js", 352);};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function(){___jdce_logger("/bower_components/jquery/jquery.js", 353);};


(function() {___jdce_logger("/bower_components/jquery/jquery.js", 354);
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 355);},

	removeAttr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 356);}
});

jQuery.extend({
	attr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 357);},

	removeAttr: function(){___jdce_logger("/bower_components/jquery/jquery.js", 358);},

	attrHooks: {
		type: {
			set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 359);}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 360);}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 361);
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 362);};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 363);},

	removeProp: function(){___jdce_logger("/bower_components/jquery/jquery.js", 364);}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function(){___jdce_logger("/bower_components/jquery/jquery.js", 365);},

	propHooks: {
		tabIndex: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 366);}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 367);}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {___jdce_logger("/bower_components/jquery/jquery.js", 368);
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {___jdce_logger("/bower_components/jquery/jquery.js", 369);
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(){___jdce_logger("/bower_components/jquery/jquery.js", 370);});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 371);},

	toggleClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 372);},

	hasClass: function(){___jdce_logger("/bower_components/jquery/jquery.js", 373);}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function(){___jdce_logger("/bower_components/jquery/jquery.js", 374);}
});

jQuery.extend({
	valHooks: {
		select: {
			get: function(){___jdce_logger("/bower_components/jquery/jquery.js", 375);},

			set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 376);}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {___jdce_logger("/bower_components/jquery/jquery.js", 377);
	jQuery.valHooks[ this ] = {
		set: function(){___jdce_logger("/bower_components/jquery/jquery.js", 378);}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function(){___jdce_logger("/bower_components/jquery/jquery.js", 379);};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {___jdce_logger("/bower_components/jquery/jquery.js", 380);

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 381);
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function(){___jdce_logger("/bower_components/jquery/jquery.js", 382);},

	bind: function( types, data, fn ) {___jdce_logger("/bower_components/jquery/jquery.js", 383);
		return this.on( types, null, data, fn );
	},
	unbind: function(){___jdce_logger("/bower_components/jquery/jquery.js", 384);},

	delegate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 385);},
	undelegate: function(){___jdce_logger("/bower_components/jquery/jquery.js", 386);}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function(){___jdce_logger("/bower_components/jquery/jquery.js", 387);};


// Cross-browser xml parsing
jQuery.parseXML = function(){___jdce_logger("/bower_components/jquery/jquery.js", 388);};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

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
function addToPrefiltersOrTransports( structure ) {___jdce_logger("/bower_components/jquery/jquery.js", 389);

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {___jdce_logger("/bower_components/jquery/jquery.js", 390);

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

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
function inspectPrefiltersOrTransports(){___jdce_logger("/bower_components/jquery/jquery.js", 391);}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {___jdce_logger("/bower_components/jquery/jquery.js", 392);
	var key, deep,
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

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses(){___jdce_logger("/bower_components/jquery/jquery.js", 393);}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert(){___jdce_logger("/bower_components/jquery/jquery.js", 394);}

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
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

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
	ajaxSetup: function( target, settings ) {___jdce_logger("/bower_components/jquery/jquery.js", 395);
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function(){___jdce_logger("/bower_components/jquery/jquery.js", 396);},

	getJSON: function(){___jdce_logger("/bower_components/jquery/jquery.js", 397);},

	getScript: function(){___jdce_logger("/bower_components/jquery/jquery.js", 398);}
});

jQuery.each( [ "get", "post" ], function( i, method ) {___jdce_logger("/bower_components/jquery/jquery.js", 399);
	jQuery[ method ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 400);};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {___jdce_logger("/bower_components/jquery/jquery.js", 401);
	jQuery.fn[ type ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 402);};
});


jQuery._evalUrl = function(){___jdce_logger("/bower_components/jquery/jquery.js", 403);};


jQuery.fn.extend({
	wrapAll: function(){___jdce_logger("/bower_components/jquery/jquery.js", 404);},

	wrapInner: function(){___jdce_logger("/bower_components/jquery/jquery.js", 405);},

	wrap: function(){___jdce_logger("/bower_components/jquery/jquery.js", 406);},

	unwrap: function(){___jdce_logger("/bower_components/jquery/jquery.js", 407);}
});


jQuery.expr.filters.hidden = function(){___jdce_logger("/bower_components/jquery/jquery.js", 408);};
jQuery.expr.filters.visible = function(){___jdce_logger("/bower_components/jquery/jquery.js", 409);};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams(){___jdce_logger("/bower_components/jquery/jquery.js", 410);}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function(){___jdce_logger("/bower_components/jquery/jquery.js", 411);};

jQuery.fn.extend({
	serialize: function(){___jdce_logger("/bower_components/jquery/jquery.js", 412);},
	serializeArray: function(){___jdce_logger("/bower_components/jquery/jquery.js", 413);}
});


jQuery.ajaxSettings.xhr = function() {___jdce_logger("/bower_components/jquery/jquery.js", 414);
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function(){___jdce_logger("/bower_components/jquery/jquery.js", 415);});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function(){___jdce_logger("/bower_components/jquery/jquery.js", 416);});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function(){___jdce_logger("/bower_components/jquery/jquery.js", 417);}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function(){___jdce_logger("/bower_components/jquery/jquery.js", 418);});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(){___jdce_logger("/bower_components/jquery/jquery.js", 419);});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function(){___jdce_logger("/bower_components/jquery/jquery.js", 420);}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function(){___jdce_logger("/bower_components/jquery/jquery.js", 421);});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function(){___jdce_logger("/bower_components/jquery/jquery.js", 422);};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function(){___jdce_logger("/bower_components/jquery/jquery.js", 423);};




jQuery.expr.filters.animated = function(){___jdce_logger("/bower_components/jquery/jquery.js", 424);};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow(){___jdce_logger("/bower_components/jquery/jquery.js", 425);}

jQuery.offset = {
	setOffset: function(){___jdce_logger("/bower_components/jquery/jquery.js", 426);}
};

jQuery.fn.extend({
	offset: function(){___jdce_logger("/bower_components/jquery/jquery.js", 427);},

	position: function(){___jdce_logger("/bower_components/jquery/jquery.js", 428);},

	offsetParent: function(){___jdce_logger("/bower_components/jquery/jquery.js", 429);}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {___jdce_logger("/bower_components/jquery/jquery.js", 430);
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 431);};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {___jdce_logger("/bower_components/jquery/jquery.js", 432);
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function(){___jdce_logger("/bower_components/jquery/jquery.js", 433);}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {___jdce_logger("/bower_components/jquery/jquery.js", 434);
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {___jdce_logger("/bower_components/jquery/jquery.js", 435);
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function(){___jdce_logger("/bower_components/jquery/jquery.js", 436);};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function(){___jdce_logger("/bower_components/jquery/jquery.js", 437);};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function(){___jdce_logger("/bower_components/jquery/jquery.js", 438);});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function(){___jdce_logger("/bower_components/jquery/jquery.js", 439);};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
