(function() {___jdce_logger("/js/libs/lavaca.js", 0);
//just a shim for cordova, because the actual dependency will differ between
//Android and iOS
define('cordova',[],function(){___jdce_logger("/js/libs/lavaca.js", 1);});

define('lavaca/util/extend',[],function(){___jdce_logger("/js/libs/lavaca.js", 2);});

define('lavaca/util/Promise',['require','./extend'],function(){___jdce_logger("/js/libs/lavaca.js", 3);});

define('lavaca/env/Device',['require','$','cordova','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 4);});

define('lavaca/util/Disposable',['require','./extend'],function(){___jdce_logger("/js/libs/lavaca.js", 5);});
define('mout/object/hasOwn',[],function(){___jdce_logger("/js/libs/lavaca.js", 6);});

define('mout/object/forIn',[],function(){___jdce_logger("/js/libs/lavaca.js", 7);});

define('mout/object/forOwn',['./hasOwn', './forIn'], function(){___jdce_logger("/js/libs/lavaca.js", 8);});

define('mout/lang/isPlainObject',[],function(){___jdce_logger("/js/libs/lavaca.js", 9);});

define('mout/object/deepMixIn',['./forOwn', '../lang/isPlainObject'], function(){___jdce_logger("/js/libs/lavaca.js", 10);});

define('lavaca/events/EventDispatcher',['require','lavaca/util/Disposable','mout/object/deepMixIn'],function(){___jdce_logger("/js/libs/lavaca.js", 11);});

define('lavaca/env/ChildBrowser',['require','lavaca/env/Device','lavaca/events/EventDispatcher','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 12);});

define('lavaca/env/Detection',['require','$'],function(){___jdce_logger("/js/libs/lavaca.js", 13);});
define('lavaca/env/Device',['require','$','cordova','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 14);});

define('lavaca/events/EventDispatcher',['require','lavaca/util/Disposable','mout/object/deepMixIn'],function(){___jdce_logger("/js/libs/lavaca.js", 15);});

define('lavaca/fx/Transform',['require','$'],function(){___jdce_logger("/js/libs/lavaca.js", 16);});

define('lavaca/fx/Animation',['require','$','./Transform'],function(){___jdce_logger("/js/libs/lavaca.js", 17);});

define('lavaca/fx/Transition',['require','$'],function(){___jdce_logger("/js/libs/lavaca.js", 18);});

define('lavaca/util/uuid',[],function(){___jdce_logger("/js/libs/lavaca.js", 19);});

define('lavaca/net/History',['require','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 20);});

define('lavaca/util/delay',[],function(){___jdce_logger("/js/libs/lavaca.js", 21);});

define('mout/lang/kindOf',[],function(){___jdce_logger("/js/libs/lavaca.js", 22);});

define('mout/object/mixIn',['./forOwn'], function(){___jdce_logger("/js/libs/lavaca.js", 23);});

define('mout/lang/clone',['./kindOf', './isPlainObject', '../object/mixIn'], function(){___jdce_logger("/js/libs/lavaca.js", 24);});

define('mout/lang/deepClone',['./clone', '../object/forOwn', './kindOf', './isPlainObject'], function(){___jdce_logger("/js/libs/lavaca.js", 25);});


define('mout/lang/isKind',['./kindOf'], function(){___jdce_logger("/js/libs/lavaca.js", 26);});

define('mout/lang/isObject',['./isKind'], function(){___jdce_logger("/js/libs/lavaca.js", 27);});

define('mout/object/merge',['./hasOwn', '../lang/deepClone', '../lang/isObject'], function(){___jdce_logger("/js/libs/lavaca.js", 28);});

define('lavaca/mvc/Route',['require','lavaca/util/Disposable','lavaca/util/delay','mout/lang/deepClone','mout/object/merge'],function(){___jdce_logger("/js/libs/lavaca.js", 29);});

define('lavaca/mvc/Router',['require','./Route','lavaca/net/History','lavaca/util/Disposable','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 30);});

define('lavaca/util/resolve',[],function(){___jdce_logger("/js/libs/lavaca.js", 31);});

define('lavaca/net/Connectivity',['require','$','lavaca/util/Promise','lavaca/util/resolve'],function(){___jdce_logger("/js/libs/lavaca.js", 32);});

define('lavaca/util/ArrayUtils',[],function(){___jdce_logger("/js/libs/lavaca.js", 33);});

define('lavaca/util/Cache',['require','lavaca/util/Disposable','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 34);});

define('lavaca/util/Map',['require','$','./Cache','./Disposable','lavaca/net/Connectivity'],function(){___jdce_logger("/js/libs/lavaca.js", 35);});

define('lavaca/util/Config',['require','./Cache','./Map'],function(){___jdce_logger("/js/libs/lavaca.js", 36);});

define('lavaca/mvc/Model',['require','lavaca/events/EventDispatcher','lavaca/net/Connectivity','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Promise','mout/lang/deepClone','mout/object/merge','lavaca/util/Config'],function(){___jdce_logger("/js/libs/lavaca.js", 37);});

define('lavaca/ui/Template',['require','lavaca/util/Cache','lavaca/util/Map'],function(){___jdce_logger("/js/libs/lavaca.js", 38);});

define('lavaca/util/log',[],function(){___jdce_logger("/js/libs/lavaca.js", 39);});

define('lavaca/mvc/View',['require','$','lavaca/events/EventDispatcher','lavaca/mvc/Model','lavaca/ui/Template','lavaca/util/Cache','lavaca/util/Promise','lavaca/util/log','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 40);});

define('lavaca/mvc/PageView',['require','$','lavaca/mvc/Model','lavaca/mvc/View','lavaca/ui/Template','lavaca/util/Promise','lavaca/util/delay'],function(){___jdce_logger("/js/libs/lavaca.js", 41);});

define('lavaca/mvc/ViewManager',['require','$','lavaca/mvc/PageView','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Disposable','lavaca/util/Promise','lavaca/util/delay','mout/object/merge','lavaca/net/History'],function(){___jdce_logger("/js/libs/lavaca.js", 42);});

define('lavaca/env/ChildBrowser',['require','lavaca/env/Device','lavaca/events/EventDispatcher','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 43);});

define('lavaca/util/Translation',['require','./Cache','./Map'],function(){___jdce_logger("/js/libs/lavaca.js", 44);});

// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

//>>description: Normalizes touch/mouse events.
//>>label: Virtual Mouse (vmouse) Bindings
//>>group: Core

define('jquery-mobile/jquery.mobile.vmouse', [ "jquery" ], function(){___jdce_logger("/js/libs/lavaca.js", 45);});

//>>description: The mobile namespace on the jQuery object
//>>label: Namespace
//>>group: Core
define('jquery-mobile/jquery.mobile.ns',[ "jquery" ], function(){___jdce_logger("/js/libs/lavaca.js", 46);});
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

define('jquery-mobile/jquery.mobile.support.touch', [ "jquery", "./jquery.mobile.ns" ], function(){___jdce_logger("/js/libs/lavaca.js", 47);});

//>>description: Touch events including: touchstart, touchmove, touchend, tap, taphold, swipe, swipeleft, swiperight, scrollstart, scrollstop
//>>label: Touch
//>>group: Events

define('jquery-mobile/events/touch', [ "jquery", "../jquery.mobile.vmouse", "../jquery.mobile.support.touch" ], function(){___jdce_logger("/js/libs/lavaca.js", 48);});

//>>description: Feature test for orientation
//>>label: Orientation support test
//>>group: Core

define('jquery-mobile/jquery.mobile.support.orientation', [ "jquery" ], function(){___jdce_logger("/js/libs/lavaca.js", 49);});

//>>description: Fires a resize event with a slight delay to prevent excessive callback invocation
//>>label: Throttled Resize
//>>group: Events

define('jquery-mobile/events/throttledresize', [ "jquery" ], function(){___jdce_logger("/js/libs/lavaca.js", 50);});
//>>description: Provides a wrapper around the inconsistent browser implementations of orientationchange
//>>label: Orientation Change
//>>group: Events

define('jquery-mobile/events/orientationchange', [ "jquery", "../jquery.mobile.support.orientation", "./throttledresize" ], function(){___jdce_logger("/js/libs/lavaca.js", 51);});

define('lavaca/mvc/Application',['require','$','lavaca/net/History','lavaca/env/Device','lavaca/events/EventDispatcher','lavaca/mvc/Router','lavaca/mvc/ViewManager','lavaca/net/Connectivity','lavaca/ui/Template','lavaca/util/Config','lavaca/util/Promise','lavaca/env/ChildBrowser','lavaca/util/Translation','jquery-mobile/events/touch','jquery-mobile/events/orientationchange'],function(){___jdce_logger("/js/libs/lavaca.js", 52);});

define('lavaca/mvc/Collection',['require','lavaca/mvc/Model','lavaca/net/Connectivity','lavaca/util/ArrayUtils','lavaca/util/Promise','mout/lang/deepClone','mout/object/merge'],function(){___jdce_logger("/js/libs/lavaca.js", 53);});

define('lavaca/util/StringUtils',['require'],function(){___jdce_logger("/js/libs/lavaca.js", 54);});
define('lavaca/mvc/Controller',['require','lavaca/net/Connectivity','lavaca/net/History','lavaca/util/Disposable','lavaca/util/Promise','lavaca/util/StringUtils','lavaca/util/Translation'],function(){___jdce_logger("/js/libs/lavaca.js", 55);});

define('lavaca/mvc/Model',['require','lavaca/events/EventDispatcher','lavaca/net/Connectivity','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Promise','mout/lang/deepClone','mout/object/merge','lavaca/util/Config'],function(){___jdce_logger("/js/libs/lavaca.js", 56);});

define('lavaca/mvc/PageView',['require','$','lavaca/mvc/Model','lavaca/mvc/View','lavaca/ui/Template','lavaca/util/Promise','lavaca/util/delay'],function(){___jdce_logger("/js/libs/lavaca.js", 57);});

define('lavaca/mvc/Route',['require','lavaca/util/Disposable','lavaca/util/delay','mout/lang/deepClone','mout/object/merge'],function(){___jdce_logger("/js/libs/lavaca.js", 58);});

define('lavaca/mvc/Router',['require','./Route','lavaca/net/History','lavaca/util/Disposable','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 59);});

define('lavaca/mvc/View',['require','$','lavaca/events/EventDispatcher','lavaca/mvc/Model','lavaca/ui/Template','lavaca/util/Cache','lavaca/util/Promise','lavaca/util/log','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 60);});

define('lavaca/mvc/ViewManager',['require','$','lavaca/mvc/PageView','lavaca/util/ArrayUtils','lavaca/util/Cache','lavaca/util/Disposable','lavaca/util/Promise','lavaca/util/delay','mout/object/merge','lavaca/net/History'],function(){___jdce_logger("/js/libs/lavaca.js", 61);});

define('lavaca/net/Connectivity',['require','$','lavaca/util/Promise','lavaca/util/resolve'],function(){___jdce_logger("/js/libs/lavaca.js", 62);});

define('lavaca/net/History',['require','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 63);});

define('lavaca/storage/Store',['require','lavaca/util/Disposable'],function(){___jdce_logger("/js/libs/lavaca.js", 64);});

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/
define('docCookies',[],function(){___jdce_logger("/js/libs/lavaca.js", 65);});
define('lavaca/storage/LocalStore',['require','./Store','docCookies','lavaca/util/ArrayUtils'],function(){___jdce_logger("/js/libs/lavaca.js", 66);});

define('lavaca/ui/DustTemplate',['require','dust','lavaca/ui/Template','lavaca/util/Config','lavaca/util/Promise','lavaca/util/StringUtils','lavaca/util/Translation','dust-helpers'],function(){___jdce_logger("/js/libs/lavaca.js", 67);});

define('lavaca/ui/Widget',['require','$','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 68);});

define('lavaca/ui/Form',['require','$','lavaca/ui/Widget','lavaca/util/Promise'],function(){___jdce_logger("/js/libs/lavaca.js", 69);});

define('lavaca/ui/Widget',['require','$','lavaca/events/EventDispatcher','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 70);});

define('lavaca/ui/LoadingIndicator',['require','$','./Widget'],function(){___jdce_logger("/js/libs/lavaca.js", 71);});


define('lavaca/ui/Template',['require','lavaca/util/Cache','lavaca/util/Map'],function(){___jdce_logger("/js/libs/lavaca.js", 72);});

define('lavaca/util/ArrayUtils',[],function(){___jdce_logger("/js/libs/lavaca.js", 73);});

define('lavaca/util/Cache',['require','lavaca/util/Disposable','lavaca/util/uuid'],function(){___jdce_logger("/js/libs/lavaca.js", 74);});

define('lavaca/util/extend',[],function(){___jdce_logger("/js/libs/lavaca.js", 75);});

define('lavaca/util/Disposable',['require','./extend'],function(){___jdce_logger("/js/libs/lavaca.js", 76);});
define('lavaca/util/Map',['require','$','./Cache','./Disposable','lavaca/net/Connectivity'],function(){___jdce_logger("/js/libs/lavaca.js", 77);});

define('lavaca/util/Config',['require','./Cache','./Map'],function(){___jdce_logger("/js/libs/lavaca.js", 78);});

define('lavaca/util/Translation',['require','./Cache','./Map'],function(){___jdce_logger("/js/libs/lavaca.js", 79);});

define('lavaca/util/DateUtils',['require','./Translation'],function(){___jdce_logger("/js/libs/lavaca.js", 80);});

define('lavaca/util/Promise',['require','./extend'],function(){___jdce_logger("/js/libs/lavaca.js", 81);});

define('lavaca/util/StringUtils',['require'],function(){___jdce_logger("/js/libs/lavaca.js", 82);});
define('lavaca/util/delay',[],function(){___jdce_logger("/js/libs/lavaca.js", 83);});

define('lavaca/util/log',[],function(){___jdce_logger("/js/libs/lavaca.js", 84);});

define('lavaca/util/resolve',[],function(){___jdce_logger("/js/libs/lavaca.js", 85);});

define('lavaca/util/uuid',[],function(){___jdce_logger("/js/libs/lavaca.js", 86);});

})();