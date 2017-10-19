/*
* Kendo UI Web v2013.3.1119 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "router",
    name: "Router",
    category: "framework",
    description: "The Router class is responsible for tracking the application state and navigating between the application states.",
    depends: [ "core" ],
    hidden: false
});

(function($, undefined) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 0);
    var kendo = window.kendo,
        CHANGE = "change",
        BACK = "back",
        support = kendo.support,
        location = window.location,
        history = window.history,
        CHECK_URL_INTERVAL = 50,
        hashStrip = /^#*/,
        document = window.document;

    function absoluteURL(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 1);}

    function stripRoot(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 2);}

    var PushStateAdapter = kendo.Class.extend({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 3);},

        navigate: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 4);},

        current: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 5);},

        change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 6);},

        stop: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 7);}
    });

    var HashAdapter = kendo.Class.extend({
        navigate: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 8);},

        change: function(callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 9);
            if (support.hashChange) {
                $(window).bind("hashchange.kendo", callback);
            } else {
                this._interval = setInterval(callback, CHECK_URL_INTERVAL);
            }
        },

        stop: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 10);},

        current: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 11);
            return location.hash.replace(hashStrip, '');
        }
    });

    var History = kendo.Observable.extend({
        start: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 12);
            options = options || {};

            this.bind([CHANGE, BACK], options);

            if (this._started) {
                return;
            }

            this._started = true;

            var pathname = location.pathname,
                hash = location.hash,
                pushState = support.pushState && options.pushState,
                root = options.root || "/",
                atRoot = root === pathname;

            this.adapter = pushState ? new PushStateAdapter(root) : new HashAdapter();

            if (options.pushState && !support.pushState && !atRoot) {
                location.replace(root + '#' + stripRoot(root, pathname));
                return true; // browser will reload at this point.
            }

            if (pushState) {
                var fixedUrl;
                if (root === pathname + "/") {
                    fixedUrl = root;
                }

                if (atRoot && hash) {
                    fixedUrl = absoluteURL(hash.replace(hashStrip, ''), root);
                }

                if (fixedUrl) {
                    history.replaceState({}, document.title, fixedUrl);
                }
            }

            this.root = root;
            this.current = this.adapter.current();
            this.locations = [this.current];
            this.adapter.change($.proxy(this, "_checkUrl"));
        },

        stop: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 13);},

        change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 14);},

        navigate: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 15);},

        _checkUrl: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 16);}
    });

    kendo.absoluteURL = absoluteURL;
    kendo.history = new History();
})(window.kendo.jQuery);

(function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 17);
    var kendo = window.kendo,
        history = kendo.history,
        Observable = kendo.Observable,
        INIT = "init",
        ROUTE_MISSING = "routeMissing",
        CHANGE = "change",
        BACK = "back",
        optionalParam = /\((.*?)\)/g,
        namedParam = /(\(\?)?:\w+/g,
        splatParam = /\*\w+/g,
        escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

    function namedParamReplace(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 18);}

    function routeToRegExp(route) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 19);
        return new RegExp('^' + route
            .replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, namedParamReplace)
            .replace(splatParam, '(.*?)') + '$');
    }

    function stripUrl(url) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 20);
        return url.replace(/(\?.*)|(#.*)/g, "");
    }

    var Route = kendo.Class.extend({
        init: function(route, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 21);
            if (!(route instanceof RegExp)) {
                route = routeToRegExp(route);
            }

            this.route = route;
            this._callback = callback;
        },

        callback: function(url) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 22);
            var params,
                idx = 0,
                length,
                queryStringParams = kendo.parseQueryStringParams(url);

            url = stripUrl(url);
            params = this.route.exec(url).slice(1);
            length = params.length;

            for (; idx < length; idx ++) {
                if (typeof params[idx] !== 'undefined') {
                    params[idx] = decodeURIComponent(params[idx]);
                }
            }

            params.push(queryStringParams);

            this._callback.apply(null, params);
        },

        worksWith: function(url) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 23);
            if (this.route.test(url)) {
                this.callback(url);
                return true;
            } else {
                return false;
            }
        }
    });

    var Router = Observable.extend({
        init: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 24);
            Observable.fn.init.call(this);
            this.routes = [];
            this.pushState = options ? options.pushState : false;
            if (options && options.root) {
                this.root = options.root;
            }
            this.bind([INIT, ROUTE_MISSING, CHANGE], options);
        },

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 25);},

        start: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 26);
            var that = this,
                backProxy = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 27);},
                urlChangedProxy = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 28);};

            history.start({
                change: urlChangedProxy,
                back: backProxy,
                pushState: that.pushState,
                root: that.root
            });

            var initEventObject = { url: history.current || "/" };

            if (!that.trigger(INIT, initEventObject)) {
                that._urlChanged(initEventObject);
            }

            this._urlChangedProxy = urlChangedProxy;
            this._backProxy = backProxy;
        },

        route: function(route, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 29);
            this.routes.push(new Route(route, callback));
        },

        navigate: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 30);},

        _back: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 31);},

        _urlChanged: function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.router.js", 32);
            var url = e.url;

            if (!url) {
                url = "/";
            }

            if (this.trigger(CHANGE, { url: e.url, params: kendo.parseQueryStringParams(e.url) })) {
                e.preventDefault();
                return;
            }

            var idx = 0,
                routes = this.routes,
                route,
                length = routes.length;

            for (; idx < length; idx ++) {
                 route = routes[idx];

                 if (route.worksWith(url)) {
                    return;
                 }
            }

            if (this.trigger(ROUTE_MISSING, { url: url, params: kendo.parseQueryStringParams(url) })) {
                e.preventDefault();
            }
        }
    });

    kendo.Router = Router;
})();
