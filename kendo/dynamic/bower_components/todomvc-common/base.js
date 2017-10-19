(function () {___jdce_logger("/bower_components/todomvc-common/base.js", 0);
	'use strict';

	// Underscore's Template Module
	// Courtesy of underscorejs.org
	var _ = (function (_) {___jdce_logger("/bower_components/todomvc-common/base.js", 1);
		_.defaults = function(){___jdce_logger("/bower_components/todomvc-common/base.js", 2);}

		// By default, Underscore uses ERB-style template delimiters, change the
		// following template settings to use alternative delimiters.
		_.templateSettings = {
			evaluate    : /<%([\s\S]+?)%>/g,
			interpolate : /<%=([\s\S]+?)%>/g,
			escape      : /<%-([\s\S]+?)%>/g
		};

		// When customizing `templateSettings`, if you don't want to define an
		// interpolation, evaluation or escaping regex, we need one that is
		// guaranteed not to match.
		var noMatch = /(.)^/;

		// Certain characters need to be escaped so that they can be put into a
		// string literal.
		var escapes = {
			"'":      "'",
			'\\':     '\\',
			'\r':     'r',
			'\n':     'n',
			'\t':     't',
			'\u2028': 'u2028',
			'\u2029': 'u2029'
		};

		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

		// JavaScript micro-templating, similar to John Resig's implementation.
		// Underscore templating handles arbitrary delimiters, preserves whitespace,
		// and correctly escapes quotes within interpolated code.
		_.template = function(){___jdce_logger("/bower_components/todomvc-common/base.js", 3);};

		return _;
	})({});

	if (location.hostname === 'todomvc.com') {
		window._gaq = [['_setAccount','UA-31081062-1'],['_trackPageview']];(function(){___jdce_logger("/bower_components/todomvc-common/base.js", 4);}(document,'script'));
	}

	function redirect() {___jdce_logger("/bower_components/todomvc-common/base.js", 5);
		if (location.hostname === 'tastejs.github.io') {
			location.href = location.href.replace('tastejs.github.io/todomvc', 'todomvc.com');
		}
	}

	function findRoot(){___jdce_logger("/bower_components/todomvc-common/base.js", 6);}

	function getFile(file, callback) {___jdce_logger("/bower_components/todomvc-common/base.js", 7);
		if (!location.host) {
			return console.info('Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.');
		}

		var xhr = new XMLHttpRequest();

		xhr.open('GET', findRoot() + file, true);
		xhr.send();

		xhr.onload = function(){___jdce_logger("/bower_components/todomvc-common/base.js", 8);};
	}

	function Learn(){___jdce_logger("/bower_components/todomvc-common/base.js", 9);}

	Learn.prototype.append = function(){___jdce_logger("/bower_components/todomvc-common/base.js", 10);};

	redirect();
	getFile('learn.json', Learn);
})();
