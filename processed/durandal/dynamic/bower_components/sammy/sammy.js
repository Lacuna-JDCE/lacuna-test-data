// name: sammy
// version: 0.7.4

// Sammy.js / http://sammyjs.org

(function($, window) {___jdce_logger("/bower_components/sammy/sammy.js", 0);
  (function(factory){___jdce_logger("/bower_components/sammy/sammy.js", 1);
    // Support module loading scenarios
    if (typeof define === 'function' && define.amd){
      // AMD Anonymous Module
      define(['jquery'], factory);
    } else {
      // No module loader (plain <script> tag) - put directly in global namespace
      $.sammy = window.Sammy = factory($);
    }
  })(function($){___jdce_logger("/bower_components/sammy/sammy.js", 2);

  var Sammy,
      PATH_REPLACER = "([^\/]+)",
      PATH_NAME_MATCHER = /:([\w\d]+)/g,
      QUERY_STRING_MATCHER = /\?([^#]*)?$/,
      // mainly for making `arguments` an Array
      _makeArray = function(){___jdce_logger("/bower_components/sammy/sammy.js", 3);},
      // borrowed from jQuery
      _isFunction = function( obj ) {___jdce_logger("/bower_components/sammy/sammy.js", 4); return Object.prototype.toString.call(obj) === "[object Function]"; },
      _isArray = function(){___jdce_logger("/bower_components/sammy/sammy.js", 5);},
      _isRegExp = function(){___jdce_logger("/bower_components/sammy/sammy.js", 6);},
      _decode = function(){___jdce_logger("/bower_components/sammy/sammy.js", 7);},
      _encode = encodeURIComponent,
      _escapeHTML = function(){___jdce_logger("/bower_components/sammy/sammy.js", 8);},
      _routeWrapper = function(verb) {___jdce_logger("/bower_components/sammy/sammy.js", 9);
        return function(){___jdce_logger("/bower_components/sammy/sammy.js", 10);};
      },
      _template_cache = {},
      _has_history = !!(window.history && history.pushState),
      loggers = [];


  // `Sammy` (also aliased as $.sammy) is not only the namespace for a
  // number of prototypes, its also a top level method that allows for easy
  // creation/management of `Sammy.Application` instances. There are a
  // number of different forms for `Sammy()` but each returns an instance
  // of `Sammy.Application`. When a new instance is created using
  // `Sammy` it is added to an Object called `Sammy.apps`. This
  // provides for an easy way to get at existing Sammy applications. Only one
  // instance is allowed per `element_selector` so when calling
  // `Sammy('selector')` multiple times, the first time will create
  // the application and the following times will extend the application
  // already added to that selector.
  //
  // ### Example
  //
  //      // returns the app at #main or a new app
  //      Sammy('#main')
  //
  //      // equivalent to "new Sammy.Application", except appends to apps
  //      Sammy();
  //      Sammy(function() { ... });
  //
  //      // extends the app at '#main' with function.
  //      Sammy('#main', function() { ... });
  //
  Sammy = function(){___jdce_logger("/bower_components/sammy/sammy.js", 11);};

  Sammy.VERSION = '0.7.4';

  // Add to the global logger pool. Takes a function that accepts an
  // unknown number of arguments and should print them or send them somewhere
  // The first argument is always a timestamp.
  Sammy.addLogger = function(logger) {___jdce_logger("/bower_components/sammy/sammy.js", 12);
    loggers.push(logger);
  };

  // Sends a log message to each logger listed in the global
  // loggers pool. Can take any number of arguments.
  // Also prefixes the arguments with a timestamp.
  Sammy.log = function(){___jdce_logger("/bower_components/sammy/sammy.js", 13);};

  if (typeof window.console != 'undefined') {
    if (_isFunction(window.console.log.apply)) {
      Sammy.addLogger(function(){___jdce_logger("/bower_components/sammy/sammy.js", 14);});
    } else {
      Sammy.addLogger(function(){___jdce_logger("/bower_components/sammy/sammy.js", 15);});
    }
  } else if (typeof console != 'undefined') {
    Sammy.addLogger(function(){___jdce_logger("/bower_components/sammy/sammy.js", 16);});
  }

  $.extend(Sammy, {
    makeArray: _makeArray,
    isFunction: _isFunction,
    isArray: _isArray
  });

  // Sammy.Object is the base for all other Sammy classes. It provides some useful
  // functionality, including cloning, iterating, etc.
  Sammy.Object = function(){___jdce_logger("/bower_components/sammy/sammy.js", 17);};

  $.extend(Sammy.Object.prototype, {

    // Escape HTML in string, use in templates to prevent script injection.
    // Also aliased as `h()`
    escapeHTML: _escapeHTML,
    h: _escapeHTML,

    // Returns a copy of the object with Functions removed.
    toHash: function(){___jdce_logger("/bower_components/sammy/sammy.js", 18);},

    // Renders a simple HTML version of this Objects attributes.
    // Does not render functions.
    // For example. Given this Sammy.Object:
    //
    //     var s = new Sammy.Object({first_name: 'Sammy', last_name: 'Davis Jr.'});
    //     s.toHTML()
    //     //=> '<strong>first_name</strong> Sammy<br /><strong>last_name</strong> Davis Jr.<br />'
    //
    toHTML: function(){___jdce_logger("/bower_components/sammy/sammy.js", 19);},

    // Returns an array of keys for this object. If `attributes_only`
    // is true will not return keys that map to a `function()`
    keys: function(){___jdce_logger("/bower_components/sammy/sammy.js", 20);},

    // Checks if the object has a value at `key` and that the value is not empty
    has: function(){___jdce_logger("/bower_components/sammy/sammy.js", 21);},

    // convenience method to join as many arguments as you want
    // by the first argument - useful for making paths
    join: function(){___jdce_logger("/bower_components/sammy/sammy.js", 22);},

    // Shortcut to Sammy.log
    log: function(){___jdce_logger("/bower_components/sammy/sammy.js", 23);},

    // Returns a string representation of this object.
    // if `include_functions` is true, it will also toString() the
    // methods of this object. By default only prints the attributes.
    toString: function(){___jdce_logger("/bower_components/sammy/sammy.js", 24);}
  });


  // Return whether the event targets this window.
  Sammy.targetIsThisWindow = function(){___jdce_logger("/bower_components/sammy/sammy.js", 25);};


  // The DefaultLocationProxy is the default location proxy for all Sammy applications.
  // A location proxy is a prototype that conforms to a simple interface. The purpose
  // of a location proxy is to notify the Sammy.Application its bound to when the location
  // or 'external state' changes.
  //
  // The `DefaultLocationProxy` watches for changes to the path of the current window and
  // is also able to set the path based on changes in the application. It does this by
  // using different methods depending on what is available in the current browser. In
  // the latest and greatest browsers it used the HTML5 History API and the `pushState`
  // `popState` events/methods. This allows you to use Sammy to serve a site behind normal
  // URI paths as opposed to the older default of hash (#) based routing. Because the server
  // can interpret the changed path on a refresh or re-entry, though, it requires additional
  // support on the server side. If you'd like to force disable HTML5 history support, please
  // use the `disable_push_state` setting on `Sammy.Application`. If pushState support
  // is enabled, `DefaultLocationProxy` also binds to all links on the page. If a link is clicked
  // that matches the current set of routes, the URL is changed using pushState instead of
  // fully setting the location and the app is notified of the change.
  //
  // If the browser does not have support for HTML5 History, `DefaultLocationProxy` automatically
  // falls back to the older hash based routing. The newest browsers (IE, Safari > 4, FF >= 3.6)
  // support a 'onhashchange' DOM event, thats fired whenever the location.hash changes.
  // In this situation the DefaultLocationProxy just binds to this event and delegates it to
  // the application. In the case of older browsers a poller is set up to track changes to the
  // hash.
  Sammy.DefaultLocationProxy = function(){___jdce_logger("/bower_components/sammy/sammy.js", 26);};

  Sammy.DefaultLocationProxy.fullPath = function(){___jdce_logger("/bower_components/sammy/sammy.js", 27);};
$.extend(Sammy.DefaultLocationProxy.prototype , {
    // bind the proxy events to the current app.
    bind: function(){___jdce_logger("/bower_components/sammy/sammy.js", 28);},

    // unbind the proxy events from the current app
    unbind: function(){___jdce_logger("/bower_components/sammy/sammy.js", 29);},

    // get the current location from the hash.
    getLocation: function(){___jdce_logger("/bower_components/sammy/sammy.js", 30);},

    // set the current location to `new_location`
    setLocation: function(){___jdce_logger("/bower_components/sammy/sammy.js", 31);},

    _startPolling: function(){___jdce_logger("/bower_components/sammy/sammy.js", 32);}
  });


  // Sammy.Application is the Base prototype for defining 'applications'.
  // An 'application' is a collection of 'routes' and bound events that is
  // attached to an element when `run()` is called.
  // The only argument an 'app_function' is evaluated within the context of the application.
  Sammy.Application = function(){___jdce_logger("/bower_components/sammy/sammy.js", 33);};

  Sammy.Application.prototype = $.extend({}, Sammy.Object.prototype, {

    // the four route verbs
    ROUTE_VERBS: ['get','post','put','delete'],

    // An array of the default events triggered by the
    // application during its lifecycle
    APP_EVENTS: ['run', 'unload', 'lookup-route', 'run-route', 'route-found', 'event-context-before', 'event-context-after', 'changed', 'error', 'check-form-submission', 'redirect', 'location-changed'],

    _last_route: null,
    _location_proxy: null,
    _running: false,

    // Defines what element the application is bound to. Provide a selector
    // (parseable by `jQuery()`) and this will be used by `$element()`
    element_selector: 'body',

    // When set to true, logs all of the default events using `log()`
    debug: false,

    // When set to true, and the error() handler is not overridden, will actually
    // raise JS errors in routes (500) and when routes can't be found (404)
    raise_errors: false,

    // The time in milliseconds that the URL is queried for changes
    run_interval_every: 50,

    // if using the `DefaultLocationProxy` setting this to true will force the app to use
    // traditional hash based routing as opposed to the new HTML5 PushState support
    disable_push_state: false,

    // The default template engine to use when using `partial()` in an
    // `EventContext`. `template_engine` can either be a string that
    // corresponds to the name of a method/helper on EventContext or it can be a function
    // that takes two arguments, the content of the unrendered partial and an optional
    // JS object that contains interpolation data. Template engine is only called/referred
    // to if the extension of the partial is null or unknown. See `partial()`
    // for more information
    template_engine: null,

    // //=> Sammy.Application: body
    toString: function(){___jdce_logger("/bower_components/sammy/sammy.js", 34);},

    // returns a jQuery object of the Applications bound element.
    $element: function(){___jdce_logger("/bower_components/sammy/sammy.js", 35);},

    // `use()` is the entry point for including Sammy plugins.
    // The first argument to use should be a function() that is evaluated
    // in the context of the current application, just like the `app_function`
    // argument to the `Sammy.Application` constructor.
    //
    // Any additional arguments are passed to the app function sequentially.
    //
    // For much more detail about plugins, check out:
    // [http://sammyjs.org/docs/plugins](http://sammyjs.org/docs/plugins)
    //
    // ### Example
    //
    //      var MyPlugin = function(app, prepend) {
    //
    //        this.helpers({
    //          myhelper: function(text) {
    //            alert(prepend + " " + text);
    //          }
    //        });
    //
    //      };
    //
    //      var app = $.sammy(function() {
    //
    //        this.use(MyPlugin, 'This is my plugin');
    //
    //        this.get('#/', function() {
    //          this.myhelper('and dont you forget it!');
    //          //=> Alerts: This is my plugin and dont you forget it!
    //        });
    //
    //      });
    //
    // If plugin is passed as a string it assumes your are trying to load
    // Sammy."Plugin". This is the preferred way of loading core Sammy plugins
    // as it allows for better error-messaging.
    //
    // ### Example
    //
    //      $.sammy(function() {
    //        this.use('Mustache'); //=> Sammy.Mustache
    //        this.use('Storage'); //=> Sammy.Storage
    //      });
    //
    use: function(){___jdce_logger("/bower_components/sammy/sammy.js", 36);},

    // Sets the location proxy for the current app. By default this is set to
    // a new `Sammy.DefaultLocationProxy` on initialization. However, you can set
    // the location_proxy inside you're app function to give your app a custom
    // location mechanism. See `Sammy.DefaultLocationProxy` and `Sammy.DataLocationProxy`
    // for examples.
    //
    // `setLocationProxy()` takes an initialized location proxy.
    //
    // ### Example
    //
    //        // to bind to data instead of the default hash;
    //        var app = $.sammy(function() {
    //          this.setLocationProxy(new Sammy.DataLocationProxy(this));
    //        });
    //
    setLocationProxy: function(){___jdce_logger("/bower_components/sammy/sammy.js", 37);},

    // provide log() override for inside an app that includes the relevant application element_selector
    log: function(){___jdce_logger("/bower_components/sammy/sammy.js", 38);},


    // `route()` is the main method for defining routes within an application.
    // For great detail on routes, check out:
    // [http://sammyjs.org/docs/routes](http://sammyjs.org/docs/routes)
    //
    // This method also has aliases for each of the different verbs (eg. `get()`, `post()`, etc.)
    //
    // ### Arguments
    //
    // * `verb` A String in the set of ROUTE_VERBS or 'any'. 'any' will add routes for each
    //    of the ROUTE_VERBS. If only two arguments are passed,
    //    the first argument is the path, the second is the callback and the verb
    //    is assumed to be 'any'.
    // * `path` A Regexp or a String representing the path to match to invoke this verb.
    // * `callback` A Function that is called/evaluated when the route is run see: `runRoute()`.
    //    It is also possible to pass a string as the callback, which is looked up as the name
    //    of a method on the application.
    //
    route: function(){___jdce_logger("/bower_components/sammy/sammy.js", 39);},

    // Alias for route('get', ...)
    get: _routeWrapper('get'),

    // Alias for route('post', ...)
    post: _routeWrapper('post'),

    // Alias for route('put', ...)
    put: _routeWrapper('put'),

    // Alias for route('delete', ...)
    del: _routeWrapper('delete'),

    // Alias for route('any', ...)
    any: _routeWrapper('any'),

    // `mapRoutes` takes an array of arrays, each array being passed to route()
    // as arguments, this allows for mass definition of routes. Another benefit is
    // this makes it possible/easier to load routes via remote JSON.
    //
    // ### Example
    //
    //      var app = $.sammy(function() {
    //
    //        this.mapRoutes([
    //            ['get', '#/', function() { this.log('index'); }],
    //            // strings in callbacks are looked up as methods on the app
    //            ['post', '#/create', 'addUser'],
    //            // No verb assumes 'any' as the verb
    //            [/dowhatever/, function() { this.log(this.verb, this.path)}];
    //          ]);
    //      });
    //
    mapRoutes: function(){___jdce_logger("/bower_components/sammy/sammy.js", 40);},

    // A unique event namespace defined per application.
    // All events bound with `bind()` are automatically bound within this space.
    eventNamespace: function(){___jdce_logger("/bower_components/sammy/sammy.js", 41);},

    // Works just like `jQuery.fn.bind()` with a couple notable differences.
    //
    // * It binds all events to the application element
    // * All events are bound within the `eventNamespace()`
    // * Events are not actually bound until the application is started with `run()`
    // * callbacks are evaluated within the context of a Sammy.EventContext
    //
    bind: function(){___jdce_logger("/bower_components/sammy/sammy.js", 42);},

    // Triggers custom events defined with `bind()`
    //
    // ### Arguments
    //
    // * `name` The name of the event. Automatically prefixed with the `eventNamespace()`
    // * `data` An optional Object that can be passed to the bound callback.
    // * `context` An optional context/Object in which to execute the bound callback.
    //   If no context is supplied a the context is a new `Sammy.EventContext`
    //
    trigger: function(){___jdce_logger("/bower_components/sammy/sammy.js", 43);},

    // Reruns the current route
    refresh: function(){___jdce_logger("/bower_components/sammy/sammy.js", 44);},

    // Takes a single callback that is pushed on to a stack.
    // Before any route is run, the callbacks are evaluated in order within
    // the current `Sammy.EventContext`
    //
    // If any of the callbacks explicitly return false, execution of any
    // further callbacks and the route itself is halted.
    //
    // You can also provide a set of options that will define when to run this
    // before based on the route it proceeds.
    //
    // ### Example
    //
    //      var app = $.sammy(function() {
    //
    //        // will run at #/route but not at #/
    //        this.before('#/route', function() {
    //          //...
    //        });
    //
    //        // will run at #/ but not at #/route
    //        this.before({except: {path: '#/route'}}, function() {
    //          this.log('not before #/route');
    //        });
    //
    //        this.get('#/', function() {});
    //
    //        this.get('#/route', function() {});
    //
    //      });
    //
    // See `contextMatchesOptions()` for a full list of supported options
    //
    before: function(){___jdce_logger("/bower_components/sammy/sammy.js", 45);},

    // A shortcut for binding a callback to be run after a route is executed.
    // After callbacks have no guarunteed order.
    after: function(){___jdce_logger("/bower_components/sammy/sammy.js", 46);},


    // Adds an around filter to the application. around filters are functions
    // that take a single argument `callback` which is the entire route
    // execution path wrapped up in a closure. This means you can decide whether
    // or not to proceed with execution by not invoking `callback` or,
    // more usefully wrapping callback inside the result of an asynchronous execution.
    //
    // ### Example
    //
    // The most common use case for around() is calling a _possibly_ async function
    // and executing the route within the functions callback:
    //
    //      var app = $.sammy(function() {
    //
    //        var current_user = false;
    //
    //        function checkLoggedIn(callback) {
    //          // /session returns a JSON representation of the logged in user
    //          // or an empty object
    //          if (!current_user) {
    //            $.getJSON('/session', function(json) {
    //              if (json.login) {
    //                // show the user as logged in
    //                current_user = json;
    //                // execute the route path
    //                callback();
    //              } else {
    //                // show the user as not logged in
    //                current_user = false;
    //                // the context of aroundFilters is an EventContext
    //                this.redirect('#/login');
    //              }
    //            });
    //          } else {
    //            // execute the route path
    //            callback();
    //          }
    //        };
    //
    //        this.around(checkLoggedIn);
    //
    //      });
    //
    around: function(){___jdce_logger("/bower_components/sammy/sammy.js", 47);},

    // Adds a onComplete function to the application. onComplete functions are executed
    // at the end of a chain of route callbacks, if they call next(). Unlike after,
    // which is called as soon as the route is complete, onComplete is like a final next()
    // for all routes, and is thus run asynchronously
    //
    // ### Example
    //
    // app.get('/chain',function(context,next){
    //     console.log('chain1');
    //    next();
    // },function(context,next){
    //     console.log('chain2');
    //    next();
    // });
    // app.get('/link',function(context,next){
    //     console.log('link1');
    //    next();
    // },function(context,next){
    //     console.log('link2');
    //    next();
    // });
    // app.onComplete(function(){
    //     console.log("Running finally")
    // });
    //
    // If you go to '/chain', you will get the following messages:
    //   chain1
    //   chain2
    //   Running onComplete
    //
    //
    // If you go to /link, you will get the following messages:
    //   link1
    //   link2
    //   Running onComplete
    //
    // It really comes to play when doing asynchronous:
    // app.get('/chain',function(context,next){
    //    $.get('/my/url',function(){
    //       console.log('chain1');
    //      next();
    //    })
    // },function(context,next){
    //     console.log('chain2');
    //    next();
    // });
    //
    onComplete: function(){___jdce_logger("/bower_components/sammy/sammy.js", 48);},

    // Returns `true` if the current application is running.
    isRunning: function(){___jdce_logger("/bower_components/sammy/sammy.js", 49);},

    // Helpers extends the EventContext prototype specific to this app.
    // This allows you to define app specific helper functions that can be used
    // whenever you're inside of an event context (templates, routes, bind).
    //
    // ### Example
    //
    //     var app = $.sammy(function() {
    //
    //       helpers({
    //         upcase: function(text) {
    //          return text.toString().toUpperCase();
    //         }
    //       });
    //
    //       get('#/', function() { with(this) {
    //         // inside of this context I can use the helpers
    //         $('#main').html(upcase($('#main').text());
    //       }});
    //
    //     });
    //
    //
    // ### Arguments
    //
    // * `extensions` An object collection of functions to extend the context.
    //
    helpers: function(){___jdce_logger("/bower_components/sammy/sammy.js", 50);},

    // Helper extends the event context just like `helpers()` but does it
    // a single method at a time. This is especially useful for dynamically named
    // helpers
    //
    // ### Example
    //
    //     // Trivial example that adds 3 helper methods to the context dynamically
    //     var app = $.sammy(function(app) {
    //
    //       $.each([1,2,3], function(i, num) {
    //         app.helper('helper' + num, function() {
    //           this.log("I'm helper number " + num);
    //         });
    //       });
    //
    //       this.get('#/', function() {
    //         this.helper2(); //=> I'm helper number 2
    //       });
    //     });
    //
    // ### Arguments
    //
    // * `name` The name of the method
    // * `method` The function to be added to the prototype at `name`
    //
    helper: function(){___jdce_logger("/bower_components/sammy/sammy.js", 51);},

    // Actually starts the application's lifecycle. `run()` should be invoked
    // within a document.ready block to ensure the DOM exists before binding events, etc.
    //
    // ### Example
    //
    //     var app = $.sammy(function() { ... }); // your application
    //     $(function() { // document.ready
    //        app.run();
    //     });
    //
    // ### Arguments
    //
    // * `start_url` Optionally, a String can be passed which the App will redirect to
    //   after the events/routes have been bound.
    run: function(){___jdce_logger("/bower_components/sammy/sammy.js", 52);},

    // The opposite of `run()`, un-binds all event listeners and intervals
    // `run()` Automatically binds a `onunload` event to run this when
    // the document is closed.
    unload: function(){___jdce_logger("/bower_components/sammy/sammy.js", 53);},

    // Not only runs `unbind` but also destroys the app reference.
    destroy: function(){___jdce_logger("/bower_components/sammy/sammy.js", 54);},

    // Will bind a single callback function to every event that is already
    // being listened to in the app. This includes all the `APP_EVENTS`
    // as well as any custom events defined with `bind()`.
    //
    // Used internally for debug logging.
    bindToAllEvents: function(){___jdce_logger("/bower_components/sammy/sammy.js", 55);},

    // Returns a copy of the given path with any query string after the hash
    // removed.
    routablePath: function(){___jdce_logger("/bower_components/sammy/sammy.js", 56);},

    // Given a verb and a String path, will return either a route object or false
    // if a matching route can be found within the current defined set.
    lookupRoute: function(){___jdce_logger("/bower_components/sammy/sammy.js", 57);},

    // First, invokes `lookupRoute()` and if a route is found, parses the
    // possible URL params and then invokes the route's callback within a new
    // `Sammy.EventContext`. If the route can not be found, it calls
    // `notFound()`. If `raise_errors` is set to `true` and
    // the `error()` has not been overridden, it will throw an actual JS
    // error.
    //
    // You probably will never have to call this directly.
    //
    // ### Arguments
    //
    // * `verb` A String for the verb.
    // * `path` A String path to lookup.
    // * `params` An Object of Params pulled from the URI or passed directly.
    //
    // ### Returns
    //
    // Either returns the value returned by the route callback or raises a 404 Not Found error.
    //
    runRoute: function(){___jdce_logger("/bower_components/sammy/sammy.js", 58);},

    // Matches an object of options against an `EventContext` like object that
    // contains `path` and `verb` attributes. Internally Sammy uses this
    // for matching `before()` filters against specific options. You can set the
    // object to _only_ match certain paths or verbs, or match all paths or verbs _except_
    // those that match the options.
    //
    // ### Example
    //
    //     var app = $.sammy(),
    //         context = {verb: 'get', path: '#/mypath'};
    //
    //     // match against a path string
    //     app.contextMatchesOptions(context, '#/mypath'); //=> true
    //     app.contextMatchesOptions(context, '#/otherpath'); //=> false
    //     // equivalent to
    //     app.contextMatchesOptions(context, {only: {path:'#/mypath'}}); //=> true
    //     app.contextMatchesOptions(context, {only: {path:'#/otherpath'}}); //=> false
    //     // match against a path regexp
    //     app.contextMatchesOptions(context, /path/); //=> true
    //     app.contextMatchesOptions(context, /^path/); //=> false
    //     // match only a verb
    //     app.contextMatchesOptions(context, {only: {verb:'get'}}); //=> true
    //     app.contextMatchesOptions(context, {only: {verb:'post'}}); //=> false
    //     // match all except a verb
    //     app.contextMatchesOptions(context, {except: {verb:'post'}}); //=> true
    //     app.contextMatchesOptions(context, {except: {verb:'get'}}); //=> false
    //     // match all except a path
    //     app.contextMatchesOptions(context, {except: {path:'#/otherpath'}}); //=> true
    //     app.contextMatchesOptions(context, {except: {path:'#/mypath'}}); //=> false
    //     // match multiple paths
    //     app.contextMatchesOptions(context, {path: ['#/mypath', '#/otherpath']}); //=> true
    //     app.contextMatchesOptions(context, {path: ['#/otherpath', '#/thirdpath']}); //=> false
    //     // equivalent to
    //     app.contextMatchesOptions(context, {only: {path: ['#/mypath', '#/otherpath']}}); //=> true
    //     app.contextMatchesOptions(context, {only: {path: ['#/otherpath', '#/thirdpath']}}); //=> false
    //     // match all except multiple paths
    //     app.contextMatchesOptions(context, {except: {path: ['#/mypath', '#/otherpath']}}); //=> false
    //     app.contextMatchesOptions(context, {except: {path: ['#/otherpath', '#/thirdpath']}}); //=> true
    //
    contextMatchesOptions: function(){___jdce_logger("/bower_components/sammy/sammy.js", 59);},


    // Delegates to the `location_proxy` to get the current location.
    // See `Sammy.DefaultLocationProxy` for more info on location proxies.
    getLocation: function(){___jdce_logger("/bower_components/sammy/sammy.js", 60);},

    // Delegates to the `location_proxy` to set the current location.
    // See `Sammy.DefaultLocationProxy` for more info on location proxies.
    //
    // ### Arguments
    //
    // * `new_location` A new location string (e.g. '#/')
    //
    setLocation: function(){___jdce_logger("/bower_components/sammy/sammy.js", 61);},

    // Swaps the content of `$element()` with `content`
    // You can override this method to provide an alternate swap behavior
    // for `EventContext.partial()`.
    //
    // ### Example
    //
    //      var app = $.sammy(function() {
    //
    //        // implements a 'fade out'/'fade in'
    //        this.swap = function(content, callback) {
    //          var context = this;
    //          context.$element().fadeOut('slow', function() {
    //            context.$element().html(content);
    //            context.$element().fadeIn('slow', function() {
    //              if (callback) {
    //                callback.apply();
    //              }
    //            });
    //          });
    //        };
    //
    //      });
    //
    swap: function(){___jdce_logger("/bower_components/sammy/sammy.js", 62);},

    // a simple global cache for templates. Uses the same semantics as
    // `Sammy.Cache` and `Sammy.Storage` so can easily be replaced with
    // a persistent storage that lasts beyond the current request.
    templateCache: function(){___jdce_logger("/bower_components/sammy/sammy.js", 63);},

    // clear the templateCache
    clearTemplateCache: function(){___jdce_logger("/bower_components/sammy/sammy.js", 64);},

    // This throws a '404 Not Found' error by invoking `error()`.
    // Override this method or `error()` to provide custom
    // 404 behavior (i.e redirecting to / or showing a warning)
    notFound: function(){___jdce_logger("/bower_components/sammy/sammy.js", 65);},

    // The base error handler takes a string `message` and an `Error`
    // object. If `raise_errors` is set to `true` on the app level,
    // this will re-throw the error to the browser. Otherwise it will send the error
    // to `log()`. Override this method to provide custom error handling
    // e.g logging to a server side component or displaying some feedback to the
    // user.
    error: function(){___jdce_logger("/bower_components/sammy/sammy.js", 66);},

    _checkLocation: function(){___jdce_logger("/bower_components/sammy/sammy.js", 67);},

    _getFormVerb: function(){___jdce_logger("/bower_components/sammy/sammy.js", 68);},

    _checkFormSubmission: function(){___jdce_logger("/bower_components/sammy/sammy.js", 69);},

    _serializeFormParams: function(){___jdce_logger("/bower_components/sammy/sammy.js", 70);},

    _encodeFormPair: function(){___jdce_logger("/bower_components/sammy/sammy.js", 71);},

    _parseFormParams: function(){___jdce_logger("/bower_components/sammy/sammy.js", 72);},

    _parseQueryString: function(){___jdce_logger("/bower_components/sammy/sammy.js", 73);},

    _parseParamPair: function(){___jdce_logger("/bower_components/sammy/sammy.js", 74);},

    _listen: function(){___jdce_logger("/bower_components/sammy/sammy.js", 75);},

    _unlisten: function(){___jdce_logger("/bower_components/sammy/sammy.js", 76);}

  });

  // `Sammy.RenderContext` is an object that makes sequential template loading,
  // rendering and interpolation seamless even when dealing with asynchronous
  // operations.
  //
  // `RenderContext` objects are not usually created directly, rather they are
  // instantiated from an `Sammy.EventContext` by using `render()`, `load()` or
  // `partial()` which all return `RenderContext` objects.
  //
  // `RenderContext` methods always returns a modified `RenderContext`
  // for chaining (like jQuery itself).
  //
  // The core magic is in the `then()` method which puts the callback passed as
  // an argument into a queue to be executed once the previous callback is complete.
  // All the methods of `RenderContext` are wrapped in `then()` which allows you
  // to queue up methods by chaining, but maintaining a guaranteed execution order
  // even with remote calls to fetch templates.
  //
  Sammy.RenderContext = function(){___jdce_logger("/bower_components/sammy/sammy.js", 77);};

  Sammy.RenderContext.prototype = $.extend({}, Sammy.Object.prototype, {

    // The "core" of the `RenderContext` object, adds the `callback` to the
    // queue. If the context is `waiting` (meaning an async operation is happening)
    // then the callback will be executed in order, once the other operations are
    // complete. If there is no currently executing operation, the `callback`
    // is executed immediately.
    //
    // The value returned from the callback is stored in `content` for the
    // subsequent operation. If you return `false`, the queue will pause, and
    // the next callback in the queue will not be executed until `next()` is
    // called. This allows for the guaranteed order of execution while working
    // with async operations.
    //
    // If then() is passed a string instead of a function, the string is looked
    // up as a helper method on the event context.
    //
    // ### Example
    //
    //      this.get('#/', function() {
    //        // initialize the RenderContext
    //        // Even though `load()` executes async, the next `then()`
    //        // wont execute until the load finishes
    //        this.load('myfile.txt')
    //            .then(function(content) {
    //              // the first argument to then is the content of the
    //              // prev operation
    //              $('#main').html(content);
    //            });
    //      });
    //
    then: function(){___jdce_logger("/bower_components/sammy/sammy.js", 78);},

    // Pause the `RenderContext` queue. Combined with `next()` allows for async
    // operations.
    //
    // ### Example
    //
    //        this.get('#/', function() {
    //          this.load('mytext.json')
    //              .then(function(content) {
    //                var context = this,
    //                    data    = JSON.parse(content);
    //                // pause execution
    //                context.wait();
    //                // post to a url
    //                $.post(data.url, {}, function(response) {
    //                  context.next(JSON.parse(response));
    //                });
    //              })
    //              .then(function(data) {
    //                // data is json from the previous post
    //                $('#message').text(data.status);
    //              });
    //        });
    wait: function(){___jdce_logger("/bower_components/sammy/sammy.js", 79);},

    // Resume the queue, setting `content` to be used in the next operation.
    // See `wait()` for an example.
    next: function(){___jdce_logger("/bower_components/sammy/sammy.js", 80);},

    // Load a template into the context.
    // The `location` can either be a string specifying the remote path to the
    // file, a jQuery object, or a DOM element.
    //
    // No interpolation happens by default, the content is stored in
    // `content`.
    //
    // In the case of a path, unless the option `{cache: false}` is passed the
    // data is stored in the app's `templateCache()`.
    //
    // If a jQuery or DOM object is passed the `innerHTML` of the node is pulled in.
    // This is useful for nesting templates as part of the initial page load wrapped
    // in invisible elements or `<script>` tags. With template paths, the template
    // engine is looked up by the extension. For DOM/jQuery embedded templates,
    // this isnt possible, so there are a couple of options:
    //
    //  * pass an `{engine:}` option.
    //  * define the engine in the `data-engine` attribute of the passed node.
    //  * just store the raw template data and use `interpolate()` manually
    //
    // If a `callback` is passed it is executed after the template load.
    load: function(){___jdce_logger("/bower_components/sammy/sammy.js", 81);},

    // Load partials
    //
    // ### Example
    //
    //      this.loadPartials({mypartial: '/path/to/partial'});
    //
    loadPartials: function(){___jdce_logger("/bower_components/sammy/sammy.js", 82);},

    // `load()` a template and then `interpolate()` it with data.
    //
    // can be called with multiple different signatures:
    //
    //      this.render(callback);
    //      this.render('/location');
    //      this.render('/location', {some: data});
    //      this.render('/location', callback);
    //      this.render('/location', {some: data}, callback);
    //      this.render('/location', {some: data}, {my: partials});
    //      this.render('/location', callback, {my: partials});
    //      this.render('/location', {some: data}, callback, {my: partials});
    //
    // ### Example
    //
    //      this.get('#/', function() {
    //        this.render('mytemplate.template', {name: 'test'});
    //      });
    //
    render: function(){___jdce_logger("/bower_components/sammy/sammy.js", 83);},

    // `render()` the `location` with `data` and then `swap()` the
    // app's `$element` with the rendered content.
    partial: function(){___jdce_logger("/bower_components/sammy/sammy.js", 84);},

    // defers the call of function to occur in order of the render queue.
    // The function can accept any number of arguments as long as the last
    // argument is a callback function. This is useful for putting arbitrary
    // asynchronous functions into the queue. The content passed to the
    // callback is passed as `content` to the next item in the queue.
    //
    // ### Example
    //
    //     this.send($.getJSON, '/app.json')
    //         .then(function(json) {
    //           $('#message).text(json['message']);
    //          });
    //
    //
    send: function(){___jdce_logger("/bower_components/sammy/sammy.js", 85);},

    // iterates over an array, applying the callback for each item item. the
    // callback takes the same style of arguments as `jQuery.each()` (index, item).
    // The return value of each callback is collected as a single string and stored
    // as `content` to be used in the next iteration of the `RenderContext`.
    collect: function(){___jdce_logger("/bower_components/sammy/sammy.js", 86);},

    // loads a template, and then interpolates it for each item in the `data`
    // array. If a callback is passed, it will call the callback with each
    // item in the array _after_ interpolation
    renderEach: function(){___jdce_logger("/bower_components/sammy/sammy.js", 87);},

    // uses the previous loaded `content` and the `data` object to interpolate
    // a template. `engine` defines the templating/interpolation method/engine
    // that should be used. If `engine` is not passed, the `next_engine` is
    // used. If `retain` is `true`, the final interpolated data is appended to
    // the `previous_content` instead of just replacing it.
    interpolate: function(){___jdce_logger("/bower_components/sammy/sammy.js", 88);},

    // Swap the return contents ensuring order. See `Application#swap`
    swap: function(){___jdce_logger("/bower_components/sammy/sammy.js", 89);},

    // Same usage as `jQuery.fn.appendTo()` but uses `then()` to ensure order
    appendTo: function(){___jdce_logger("/bower_components/sammy/sammy.js", 90);},

    // Same usage as `jQuery.fn.prependTo()` but uses `then()` to ensure order
    prependTo: function(){___jdce_logger("/bower_components/sammy/sammy.js", 91);},

    // Replaces the `$(selector)` using `html()` with the previously loaded
    // `content`
    replace: function(){___jdce_logger("/bower_components/sammy/sammy.js", 92);},

    // trigger the event in the order of the event context. Same semantics
    // as `Sammy.EventContext#trigger()`. If data is omitted, `content`
    // is sent as `{content: content}`
    trigger: function(){___jdce_logger("/bower_components/sammy/sammy.js", 93);}

  });

  // `Sammy.EventContext` objects are created every time a route is run or a
  // bound event is triggered. The callbacks for these events are evaluated within a `Sammy.EventContext`
  // This within these callbacks the special methods of `EventContext` are available.
  //
  // ### Example
  //
  //       $.sammy(function() {
  //         // The context here is this Sammy.Application
  //         this.get('#/:name', function() {
  //           // The context here is a new Sammy.EventContext
  //           if (this.params['name'] == 'sammy') {
  //             this.partial('name.html.erb', {name: 'Sammy'});
  //           } else {
  //             this.redirect('#/somewhere-else')
  //           }
  //         });
  //       });
  //
  // Initialize a new EventContext
  //
  // ### Arguments
  //
  // * `app` The `Sammy.Application` this event is called within.
  // * `verb` The verb invoked to run this context/route.
  // * `path` The string path invoked to run this context/route.
  // * `params` An Object of optional params to pass to the context. Is converted
  //   to a `Sammy.Object`.
  // * `target` a DOM element that the event that holds this context originates
  //   from. For post, put and del routes, this is the form element that triggered
  //   the route.
  //
  Sammy.EventContext = function(){___jdce_logger("/bower_components/sammy/sammy.js", 94);};

  Sammy.EventContext.prototype = $.extend({}, Sammy.Object.prototype, {

    // A shortcut to the app's `$element()`
    $element: function(){___jdce_logger("/bower_components/sammy/sammy.js", 95);},

    // Look up a templating engine within the current app and context.
    // `engine` can be one of the following:
    //
    // * a function: should conform to `function(content, data) { return interpolated; }`
    // * a template path: 'template.ejs', looks up the extension to match to
    //   the `ejs()` helper
    // * a string referring to the helper: "mustache" => `mustache()`
    //
    // If no engine is found, use the app's default `template_engine`
    //
    engineFor: function(){___jdce_logger("/bower_components/sammy/sammy.js", 96);},

    // using the template `engine` found with `engineFor()`, interpolate the
    // `data` into `content`
    interpolate: function(){___jdce_logger("/bower_components/sammy/sammy.js", 97);},

    // Create and return a `Sammy.RenderContext` calling `render()` on it.
    // Loads the template and interpolate the data, however does not actual
    // place it in the DOM.
    //
    // ### Example
    //
    //      // mytemplate.mustache <div class="name">{{name}}</div>
    //      render('mytemplate.mustache', {name: 'quirkey'});
    //      // sets the `content` to <div class="name">quirkey</div>
    //      render('mytemplate.mustache', {name: 'quirkey'})
    //        .appendTo('ul');
    //      // appends the rendered content to $('ul')
    //
    render: function(){___jdce_logger("/bower_components/sammy/sammy.js", 98);},

    // Create and return a `Sammy.RenderContext` calling `renderEach()` on it.
    // Loads the template and interpolates the data for each item,
    // however does not actual place it in the DOM.
    //
    // ### Example
    //
    //      // mytemplate.mustache <div class="name">{{name}}</div>
    //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}])
    //      // sets the `content` to <div class="name">quirkey</div><div class="name">endor</div>
    //      renderEach('mytemplate.mustache', [{name: 'quirkey'}, {name: 'endor'}]).appendTo('ul');
    //      // appends the rendered content to $('ul')
    //
    renderEach: function(){___jdce_logger("/bower_components/sammy/sammy.js", 99);},

    // create a new `Sammy.RenderContext` calling `load()` with `location` and
    // `options`. Called without interpolation or placement, this allows for
    // preloading/caching the templates.
    load: function(){___jdce_logger("/bower_components/sammy/sammy.js", 100);},

    // create a new `Sammy.RenderContext` calling `loadPartials()` with `partials`.
    loadPartials: function(){___jdce_logger("/bower_components/sammy/sammy.js", 101);},

    // `render()` the `location` with `data` and then `swap()` the
    // app's `$element` with the rendered content.
    partial: function(){___jdce_logger("/bower_components/sammy/sammy.js", 102);},

    // create a new `Sammy.RenderContext` calling `send()` with an arbitrary
    // function
    send: function(){___jdce_logger("/bower_components/sammy/sammy.js", 103);},

    // Changes the location of the current window. If `to` begins with
    // '#' it only changes the document's hash. If passed more than 1 argument
    // redirect will join them together with forward slashes.
    //
    // ### Example
    //
    //      redirect('#/other/route');
    //      // equivalent to
    //      redirect('#', 'other', 'route');
    //
    redirect: function(){___jdce_logger("/bower_components/sammy/sammy.js", 104);},

    // Triggers events on `app` within the current context.
    trigger: function(){___jdce_logger("/bower_components/sammy/sammy.js", 105);},

    // A shortcut to app's `eventNamespace()`
    eventNamespace: function(){___jdce_logger("/bower_components/sammy/sammy.js", 106);},

    // A shortcut to app's `swap()`
    swap: function(){___jdce_logger("/bower_components/sammy/sammy.js", 107);},

    // Raises a possible `notFound()` error for the current path.
    notFound: function(){___jdce_logger("/bower_components/sammy/sammy.js", 108);},

    // Default JSON parsing uses jQuery's `parseJSON()`. Include `Sammy.JSON`
    // plugin for the more conformant "crockford special".
    json: function(){___jdce_logger("/bower_components/sammy/sammy.js", 109);},

    // //=> Sammy.EventContext: get #/ {}
    toString: function(){___jdce_logger("/bower_components/sammy/sammy.js", 110);}

  });

  return Sammy;
});
})(jQuery, window);
