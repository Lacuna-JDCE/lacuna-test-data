/*global NodeList */
(function (window) {___jdce_logger("/js/helpers.js", 0);
	'use strict';

	// Get element(s) by CSS selector:
	window.qs = function (selector, scope) {___jdce_logger("/js/helpers.js", 1);
		return (scope || document).querySelector(selector);
	};
	window.qsa = function(){___jdce_logger("/js/helpers.js", 2);};

	// addEventListener wrapper:
	window.$on = function (target, type, callback, useCapture) {___jdce_logger("/js/helpers.js", 3);
		target.addEventListener(type, callback, !!useCapture);
	};

	// Attach a handler to event for all elements that match the selector,
	// now or in the future, based on a root element
	window.$delegate = function (target, selector, type, handler) {___jdce_logger("/js/helpers.js", 4);
		function dispatchEvent(){___jdce_logger("/js/helpers.js", 5);}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	// Find the element's parent with the given tag name:
	// $parent(qs('a'), 'div');
	window.$parent = function(){___jdce_logger("/js/helpers.js", 6);};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
