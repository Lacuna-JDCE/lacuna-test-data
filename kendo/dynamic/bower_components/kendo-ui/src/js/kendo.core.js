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
(function($, evil, undefined) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 0);
    var kendo = window.kendo = window.kendo || { cultures: {} },
        extend = $.extend,
        each = $.each,
        isArray = $.isArray,
        proxy = $.proxy,
        noop = $.noop,
        math = Math,
        Template,
        JSON = window.JSON || {},
        support = {},
        percentRegExp = /%/,
        formatRegExp = /\{(\d+)(:[^\}]+)?\}/g,
        boxShadowRegExp = /(\d+?)px\s*(\d+?)px\s*(\d+?)px\s*(\d+?)?/i,
        numberRegExp = /^(\+|-?)\d+(\.?)\d*$/,
        FUNCTION = "function",
        STRING = "string",
        NUMBER = "number",
        OBJECT = "object",
        NULL = "null",
        BOOLEAN = "boolean",
        UNDEFINED = "undefined",
        getterCache = {},
        setterCache = {},
        slice = [].slice,
        globalize = window.Globalize;

    kendo.version = "2013.3.1119";

    function Class() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 1);}

    Class.extend = function(proto) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 2);
        var base = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 3);},
            member,
            that = this,
            subclass = proto && proto.init ? proto.init : function () {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 4);
                that.apply(this, arguments);
            },
            fn;

        base.prototype = that.prototype;
        fn = subclass.fn = subclass.prototype = new base();

        for (member in proto) {
            if (typeof proto[member] === OBJECT && !(proto[member] instanceof Array) && proto[member] !== null) {
                // Merge object members
                fn[member] = extend(true, {}, base.prototype[member], proto[member]);
            } else {
                fn[member] = proto[member];
            }
        }

        fn.constructor = subclass;
        subclass.extend = that.extend;

        return subclass;
    };

    Class.prototype._initOptions = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 5);};

    var isFunction = kendo.isFunction = function(fn) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 6);
        return typeof fn === "function";
    };

    var preventDefault = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 7);};

    var isDefaultPrevented = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 8);};

    var Observable = Class.extend({
        init: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 9);
            this._events = {};
        },

        bind: function(eventName, handlers, one) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 10);
            var that = this,
                idx,
                eventNames = typeof eventName === STRING ? [eventName] : eventName,
                length,
                original,
                handler,
                handlersIsFunction = typeof handlers === FUNCTION,
                events;

            if (handlers === undefined) {
                for (idx in eventName) {
                    that.bind(idx, eventName[idx]);
                }
                return that;
            }

            for (idx = 0, length = eventNames.length; idx < length; idx++) {
                eventName = eventNames[idx];

                handler = handlersIsFunction ? handlers : handlers[eventName];

                if (handler) {
                    if (one) {
                        original = handler;
                        handler = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 11);
                            that.unbind(eventName, handler);
                            original.apply(that, arguments);
                        };
                    }
                    events = that._events[eventName] = that._events[eventName] || [];
                    events.push(handler);
                }
            }

            return that;
        },

        one: function(eventNames, handlers) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 12);
            return this.bind(eventNames, handlers, true);
        },

        first: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 13);},

        trigger: function(eventName, e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 14);
            var that = this,
                events = that._events[eventName],
                idx,
                length;

            if (events) {
                e = e || {};

                e.sender = that;

                e._defaultPrevented = false;

                e.preventDefault = preventDefault;

                e.isDefaultPrevented = isDefaultPrevented;

                events = events.slice();

                for (idx = 0, length = events.length; idx < length; idx++) {
                    events[idx].call(that, e);
                }

                return e._defaultPrevented === true;
            }

            return false;
        },

        unbind: function(eventName, handler) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 15);
            var that = this,
                events = that._events[eventName],
                idx;

            if (eventName === undefined) {
                that._events = {};
            } else if (events) {
                if (handler) {
                    for (idx = events.length - 1; idx >= 0; idx--) {
                        if (events[idx] === handler) {
                            events.splice(idx, 1);
                        }
                    }
                } else {
                    that._events[eventName] = [];
                }
            }

            return that;
        }
    });


     function compilePart(part, stringPart) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 16);
         if (stringPart) {
             return "'" +
                 part.split("'").join("\\'")
                     .split('\\"').join('\\\\\\"')
                     .replace(/\n/g, "\\n")
                     .replace(/\r/g, "\\r")
                     .replace(/\t/g, "\\t") + "'";
         } else {
             var first = part.charAt(0),
                 rest = part.substring(1);

             if (first === "=") {
                 return "+(" + rest + ")+";
             } else if (first === ":") {
                 return "+e(" + rest + ")+";
             } else {
                 return ";" + part + ";o+=";
             }
         }
     }

    var argumentNameRegExp = /^\w+/,
        encodeRegExp = /\$\{([^}]*)\}/g,
        escapedCurlyRegExp = /\\\}/g,
        curlyRegExp = /__CURLY__/g,
        escapedSharpRegExp = /\\#/g,
        sharpRegExp = /__SHARP__/g,
        zeros = ["", "0", "00", "000", "0000"];

    Template = {
        paramName: "data", // name of the parameter of the generated template
        useWithBlock: true, // whether to wrap the template in a with() block
        render: function(template, data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 17);
            var idx,
                length,
                html = "";

            for (idx = 0, length = data.length; idx < length; idx++) {
                html += template(data[idx]);
            }

            return html;
        },
        compile: function(template, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 18);
            var settings = extend({}, this, options),
                paramName = settings.paramName,
                argumentName = paramName.match(argumentNameRegExp)[0],
                useWithBlock = settings.useWithBlock,
                functionBody = "var o,e=kendo.htmlEncode;",
                fn,
                parts,
                idx;

            if (isFunction(template)) {
                if (template.length === 2) {
                    //looks like jQuery.template
                    return function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 19);};
                }
                return template;
            }

            functionBody += useWithBlock ? "with(" + paramName + "){" : "";

            functionBody += "o=";

            parts = template
                .replace(escapedCurlyRegExp, "__CURLY__")
                .replace(encodeRegExp, "#=e($1)#")
                .replace(curlyRegExp, "}")
                .replace(escapedSharpRegExp, "__SHARP__")
                .split("#");

            for (idx = 0; idx < parts.length; idx ++) {
                functionBody += compilePart(parts[idx], idx % 2 === 0);
            }

            functionBody += useWithBlock ? ";}" : ";";

            functionBody += "return o;";

            functionBody = functionBody.replace(sharpRegExp, "#");

            try {
                fn = new Function(argumentName, functionBody);
                fn._slotCount = Math.floor(parts.length / 2);
                return fn;
            } catch(e) {
                throw new Error(kendo.format("Invalid template:'{0}' Generated code:'{1}'", template, functionBody));
            }
        }
    };

function pad(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 20);}

    //JSON stringify
(function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 21);
    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"" : '\\"',
            "\\": "\\\\"
        },
        rep,
        toString = {}.toString;

    if (typeof Date.prototype.toJSON !== FUNCTION) {

        Date.prototype.toJSON = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 22);};

        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 23);};
    }

    function quote(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 24);}

    function str(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 25);}

    if (typeof JSON.stringify !== FUNCTION) {
        JSON.stringify = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 26);};
    }
})();

// Date and Number formatting
(function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 27);
    var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|"[^"]*"|'[^']*'/g,
        standardFormatRegExp =  /^(n|c|p|e)(\d*)$/i,
        literalRegExp = /(\\.)|(['][^']*[']?)|(["][^"]*["]?)/g,
        commaRegExp = /\,/g,
        EMPTY = "",
        POINT = ".",
        COMMA = ",",
        SHARP = "#",
        ZERO = "0",
        PLACEHOLDER = "??",
        EN = "en-US",
        objectToString = {}.toString;

    //cultures
    kendo.cultures["en-US"] = {
        name: EN,
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %", "n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["($n)", "$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                AM: [ "AM", "am", "AM" ],
                PM: [ "PM", "pm", "PM" ],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    g: "M/d/yyyy h:mm tt",
                    G: "M/d/yyyy h:mm:ss tt",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0,
                twoDigitYearMax: 2029
            }
        }
    };


     function findCulture(culture) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 28);
        if (culture) {
            if (culture.numberFormat) {
                return culture;
            }

            if (typeof culture === STRING) {
                var cultures = kendo.cultures;
                return cultures[culture] || cultures[culture.split("-")[0]] || null;
            }

            return null;
        }

        return null;
    }

    function getCulture(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 29);}

    function expandNumberFormat(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 30);}

    kendo.culture = function(cultureName) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 31);
        var cultures = kendo.cultures, culture;

        if (cultureName !== undefined) {
            culture = findCulture(cultureName) || cultures[EN];
            culture.calendar = culture.calendars.standard;
            cultures.current = culture;

            if (globalize) {
                expandNumberFormat(culture.numberFormat);
            }

        } else {
            return cultures.current;
        }
    };

    kendo.findCulture = findCulture;
    kendo.getCulture = getCulture;

    //set current culture to en-US.
    kendo.culture(EN);

    function formatDate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 32);}

    //number formatting
    function formatNumber(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 33);}

    var round = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 34);};

    var toString = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 35);};

    if (globalize) {
        toString = proxy(globalize.format, globalize);
    }

    kendo.format = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 36);};

    kendo._extractFormat = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 37);};

    kendo._activeElement = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 38);};

    kendo._round = round;
    kendo.toString = toString;
})();


(function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 39);
    var nonBreakingSpaceRegExp = /\u00A0/g,
        exponentRegExp = /[eE][\-+]?[0-9]+/,
        shortTimeZoneRegExp = /[+|\-]\d{1,2}/,
        longTimeZoneRegExp = /[+|\-]\d{1,2}:\d{2}/,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        formatsSequence = ["G", "g", "d", "F", "D", "y", "m", "T", "t"],
        numberRegExp = {
            2: /^\d{1,2}/,
            4: /^\d{4}/
        },
        objectToString = {}.toString;

    function outOfRange(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 40);}

    function designatorPredicate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 41);}

    function mapDesignators(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 42);}

    //if date's day is different than the typed one - adjust
    function adjustDST(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 43);}

    function lowerArray(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 44);}

    function lowerLocalInfo(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 45);}

    function parseExact(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 46);}

    kendo.parseDate = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 47);};

    kendo.parseInt = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 48);};

    kendo.parseFloat = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 49);};

    if (globalize) {
        kendo.parseDate = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 50);};

        kendo.parseFloat = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 51);};
    }
})();

    function wrap(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 52);}

    function deepExtend(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 53);}

    function deepExtendOne(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 54);}

    function testRx(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 55);}

    function toHyphens(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 56);}

    function toCamelCase(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 57);}

    function getComputedStyles(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 58);}

    (function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 59);
        support.scrollbar = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 60);};

        support.isRtl = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 61);};

        var table = document.createElement("table");

        // Internet Explorer does not support setting the innerHTML of TBODY and TABLE elements
        try {
            table.innerHTML = "<tr><td></td></tr>";

            support.tbodyInnerHtml = true;
        } catch (e) {
            support.tbodyInnerHtml = false;
        }

        support.touch = "ontouchstart" in window;
        support.msPointers = navigator.msPointerEnabled;
        support.pointers = navigator.pointerEnabled;

        var transitions = support.transitions = false,
            transforms = support.transforms = false,
            elementProto = "HTMLElement" in window ? HTMLElement.prototype : [];

        support.hasHW3D = ("WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix()) || "MozPerspective" in document.documentElement.style || "msPerspective" in document.documentElement.style;

        each([ "Moz", "webkit", "O", "ms" ], function () {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 62);
            var prefix = this.toString(),
                hasTransitions = typeof table.style[prefix + "Transition"] === STRING;

            if (hasTransitions || typeof table.style[prefix + "Transform"] === STRING) {
                var lowPrefix = prefix.toLowerCase();

                transforms = {
                    css: (lowPrefix != "ms") ? "-" + lowPrefix + "-" : "",
                    prefix: prefix,
                    event: (lowPrefix === "o" || lowPrefix === "webkit") ? lowPrefix : ""
                };

                if (hasTransitions) {
                    transitions = transforms;
                    transitions.event = transitions.event ? transitions.event + "TransitionEnd" : "transitionend";
                }

                return false;
            }
        });

        support.transforms = transforms;
        support.transitions = transitions;

        support.devicePixelRatio = window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio;

        try {
            support.screenWidth = window.outerWidth || window.screen ? window.screen.availWidth : window.innerWidth;
            support.screenHeight = window.outerHeight || window.screen ? window.screen.availHeight : window.innerHeight;
        } catch(e) {
            //window.outerWidth throws error when in IE showModalDialog.
            support.screenWidth = window.screen.availWidth;
            support.screenHeight = window.screen.availHeight;
        }

        support.detectOS = function (ua) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 63);
            var os = false, minorVersion, match = [],
                notAndroidPhone = !/mobile safari/i.test(ua),
                agentRxs = {
                    fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
                    android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.(\d+(\.\d+)?)/,
                    iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
                    ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
                    meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
                    webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
                    blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,
                    playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,
                    wp: /(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,
                    windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/,
                    ffos: /(Mobile).*rv:(\d+)\.(\d+(\.\d+)?).*Firefox/
                },
                osRxs = {
                    ios: /^i(phone|pad|pod)$/i,
                    android: /^android|fire$/i,
                    blackberry: /^blackberry|playbook/i,
                    windows: /windows/,
                    wp: /wp/,
                    meego: /meego|ffos/
                },
                formFactorRxs = {
                    tablet: /playbook|ipad|fire/i
                },
                browserRxs = {
                    omini: /Opera\sMini/i,
                    omobile: /Opera\sMobi/i,
                    firefox: /Firefox|Fennec/i,
                    mobilesafari: /version\/.*safari/i,
                    chrome: /chrome/i,
                    webkit: /webkit/i,
                    ie: /MSIE|Windows\sPhone/i
                };

            for (var agent in agentRxs) {
                if (agentRxs.hasOwnProperty(agent)) {
                    match = ua.match(agentRxs[agent]);
                    if (match) {
                        if (agent == "windows" && "plugins" in navigator) { return false; } // Break if not Metro/Mobile Windows

                        os = {};
                        os.device = agent;
                        os.tablet = testRx(agent, formFactorRxs, false);
                        os.browser = testRx(ua, browserRxs, "default");
                        os.name = testRx(agent, osRxs);
                        os[os.name] = true;
                        os.majorVersion = match[2];
                        os.minorVersion = match[3].replace("_", ".");
                        minorVersion = os.minorVersion.replace(".", "").substr(0, 2);
                        os.flatVersion = os.majorVersion + minorVersion + (new Array(3 - (minorVersion.length < 3 ? minorVersion.length : 2)).join("0"));
                        os.appMode = window.navigator.standalone || (/file|local|wmapp/).test(window.location.protocol) || typeof window.PhoneGap !== UNDEFINED || typeof window.cordova !== UNDEFINED; // Use file protocol to detect appModes.

                        if (os.android && (support.devicePixelRatio < 1.5 && os.flatVersion < 400 || notAndroidPhone) && (support.screenWidth > 800 || support.screenHeight > 800)) {
                            os.tablet = agent;
                        }

                        break;
                    }
                }
            }
            return os;
        };

        var mobileOS = support.mobileOS = support.detectOS(navigator.userAgent);

        support.wpDevicePixelRatio = mobileOS.wp ? screen.width / 320 : 0;
        support.kineticScrollNeeded = mobileOS && (support.touch || support.msPointers || support.pointers);

        support.hasNativeScrolling = false;

        if ((mobileOS.ios && mobileOS.majorVersion > 4) || (mobileOS.android && mobileOS.majorVersion > 2) || mobileOS.wp) {
            support.hasNativeScrolling = mobileOS;
        }

        support.mouseAndTouchPresent = support.touch && !(support.mobileOS.ios || support.mobileOS.android);

        support.detectBrowser = function(ua) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 64);
            var browser = false, match = [],
                browserRxs = {
                    webkit: /(chrome)[ \/]([\w.]+)/i,
                    safari: /(webkit)[ \/]([\w.]+)/i,
                    opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i,
                    msie: /(msie\s|trident.*? rv:)([\w.]+)/i,
                    mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
                };

            for (var agent in browserRxs) {
                if (browserRxs.hasOwnProperty(agent)) {
                    match = ua.match(browserRxs[agent]);
                    if (match) {
                        browser = {};
                        browser[agent] = true;
                        browser[match[1].toLowerCase()] = true;
                        browser.version = parseInt(document.documentMode || match[2], 10);

                        break;
                    }
                }
            }

            return browser;
        };

        support.browser = support.detectBrowser(navigator.userAgent);

        support.zoomLevel = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 65);};

        support.cssBorderSpacing = typeof document.documentElement.style.borderSpacing != "undefined" && !(support.browser.msie && support.browser.version < 8);

        (function(browser) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 66);
            // add browser-specific CSS class
            var cssClass,
                majorVersion = parseInt(browser.version, 10);

            if (browser.msie) {
                cssClass = "ie";
            } else if (browser.mozilla) {
                cssClass = "ff";
            } else if (browser.safari) {
                cssClass = "safari";
            } else if (browser.webkit) {
                cssClass = "webkit";
            } else if (browser.opera) {
                cssClass = "opera";
            }

            if (cssClass) {
                $(document.documentElement).addClass("k-" + cssClass + " k-" + cssClass + majorVersion);
            }
        })(support.browser);

        support.eventCapture = document.documentElement.addEventListener;

        var input = document.createElement("input");

        support.placeholder = "placeholder" in input;

        support.input = (function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 67);
            var types = ["number", "date", "time", "month", "week", "datetime", "datetime-local"];
            var length = types.length;
            var value = "test";
            var result = {};
            var idx = 0;
            var type;

            for (;idx < length; idx++) {
                type = types[idx];
                input.setAttribute("type", type);
                input.value = value;

                result[type.replace("-", "")] = input.type !== "text" && input.value !== value;
            }

            return result;
        })();

        support.stableSort = (function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 68);
            var sorted = [0,1,2,3,4,5,6,7,8,9,10,11,12].sort(function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 69); return 0; } );
            return sorted[0] === 0 && sorted[1] === 1 && sorted[2] === 2 && sorted[3] === 3 && sorted[4] === 4 &&
                sorted[5] === 5 && sorted[6] === 6 && sorted[7] === 7 && sorted[8] === 8 &&
                sorted[9] === 9 && sorted[10] === 10 && sorted[11] === 11 && sorted[12] === 12;
        })();

        support.matchesSelector = elementProto.webkitMatchesSelector || elementProto.mozMatchesSelector ||
                                  elementProto.msMatchesSelector || elementProto.oMatchesSelector || elementProto.matchesSelector ||
          function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 70);};

        support.pushState = window.history && window.history.pushState;

        var documentMode = document.documentMode;

        support.hashChange = ("onhashchange" in window) && !(support.browser.msie && (!documentMode || documentMode <= 8)); // old IE detection
    })();


    function size(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 71);}

    function getOffset(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 72);}

    var directions = {
        left: { reverse: "right" },
        right: { reverse: "left" },
        down: { reverse: "up" },
        up: { reverse: "down" },
        top: { reverse: "bottom" },
        bottom: { reverse: "top" },
        "in": { reverse: "out" },
        out: { reverse: "in" }
    };

    function parseEffects(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 73);}

    function fx(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 74);}

    var effects = {};

    $.extend(effects, {
        Element: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 75);},

        promise: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 76);},

        transitionPromise: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 77);}
    });

    function prepareAnimationOptions(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 78);}

    function animate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 79);}

    function animateTo(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 80);}

    function toggleClass(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 81);}

    if (!("kendoAnimate" in $.fn)) {
        extend($.fn, {
            kendoStop: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 82);},

            kendoAnimate: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 83);},

            kendoAnimateTo: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 84);},

            kendoAddClass: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 85);},
            kendoRemoveClass: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 86);},
            kendoToggleClass: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 87);}
        });
    }

    var ampRegExp = /&/g,
        ltRegExp = /</g,
        gtRegExp = />/g;
    function htmlEncode(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 88);}

    var eventTarget = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 89);};

    if (support.touch) {

        eventTarget = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 90);};

        each(["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap"], function(m, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 91);
            $.fn[value] = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 92);};
        });
    }

    if (support.touch) {
        if (!support.mobileOS) {
            support.mousedown = "mousedown touchstart";
            support.mouseup = "mouseup touchend";
            support.mousemove = "mousemove touchmove";
            support.mousecancel = "mouseleave touchcancel";
            support.click = "click";
            support.resize = "resize";
        } else {
            support.mousedown = "touchstart";
            support.mouseup = "touchend";
            support.mousemove = "touchmove";
            support.mousecancel = "touchcancel";
            support.click = "touchend";
            support.resize = "orientationchange";
        }
    } else if (support.pointers) {
        support.mousemove = "pointermove";
        support.mousedown = "pointerdown";
        support.mouseup = "pointerup";
        support.mousecancel = "pointercancel";
        support.click = "pointerup";
        support.resize = "orientationchange resize";
    } else if (support.msPointers) {
        support.mousemove = "MSPointerMove";
        support.mousedown = "MSPointerDown";
        support.mouseup = "MSPointerUp";
        support.mousecancel = "MSPointerCancel";
        support.click = "MSPointerUp";
        support.resize = "orientationchange resize";
    } else {
        support.mousemove = "mousemove";
        support.mousedown = "mousedown";
        support.mouseup = "mouseup";
        support.mousecancel = "mouseleave";
        support.click = "click";
        support.resize = "resize";
    }

    var wrapExpression = function(members, paramName) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 93);
        var result = paramName || "d",
            index,
            idx,
            length,
            member,
            count = 1;

        for (idx = 0, length = members.length; idx < length; idx++) {
            member = members[idx];
            if (member !== "") {
                index = member.indexOf("[");

                if (index !== 0) {
                    if (index == -1) {
                        member = "." + member;
                    } else {
                        count++;
                        member = "." + member.substring(0, index) + " || {})" + member.substring(index);
                    }
                }

                count++;
                result += member + ((idx < length - 1) ? " || {})" : ")");
            }
        }
        return new Array(count).join("(") + result;
    },
    localUrlRe = /^([a-z]+:)?\/\//i;

    extend(kendo, {
        ui: kendo.ui || {},
        fx: kendo.fx || fx,
        effects: kendo.effects || effects,
        mobile: kendo.mobile || {},
        data: kendo.data || {},
        dataviz: kendo.dataviz || {ui: { roles: {}}},
        keys: {
            INSERT: 45,
            DELETE: 46,
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESC: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            END: 35,
            HOME: 36,
            SPACEBAR: 32,
            PAGEUP: 33,
            PAGEDOWN: 34,
            F2: 113,
            F10: 121,
            F12: 123
        },
        support: kendo.support || support,
        animate: kendo.animate || animate,
        ns: "",
        attr: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 94);},
        wrap: wrap,
        deepExtend: deepExtend,
        getComputedStyles: getComputedStyles,
        size: size,
        toCamelCase: toCamelCase,
        toHyphens: toHyphens,
        getOffset: kendo.getOffset || getOffset,
        parseEffects: kendo.parseEffects || parseEffects,
        toggleClass: kendo.toggleClass || toggleClass,
        directions: kendo.directions || directions,
        Observable: Observable,
        Class: Class,
        Template: Template,
        template: proxy(Template.compile, Template),
        render: proxy(Template.render, Template),
        stringify: proxy(JSON.stringify, JSON),
        eventTarget: eventTarget,
        htmlEncode: htmlEncode,
        isLocalUrl: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 95);},

        expr: function(expression, safe, paramName) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 96);
            expression = expression || "";

            if (typeof safe == STRING) {
                paramName = safe;
                safe = false;
            }

            paramName = paramName || "d";

            if (expression && expression.charAt(0) !== "[") {
                expression = "." + expression;
            }

            if (safe) {
                expression = wrapExpression(expression.split("."), paramName);
            } else {
                expression = paramName + expression;
            }

            return expression;
        },

        getter: function(expression, safe) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 97);
            return getterCache[expression] = getterCache[expression] || new Function("d", "return " + kendo.expr(expression, safe));
        },

        setter: function(expression) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 98);
            return setterCache[expression] = setterCache[expression] || new Function("d,value", kendo.expr(expression) + "=value");
        },

        accessor: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 99);},

        guid: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 100);
            var id = "", i, random;

            for (i = 0; i < 32; i++) {
                random = math.random() * 16 | 0;

                if (i == 8 || i == 12 || i == 16 || i == 20) {
                    id += "-";
                }
                id += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return id;
        },

        roleSelector: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 101);},

        triggeredByInput: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 102);},

        logToConsole: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 103);}
    });

    var Widget = Observable.extend( {
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 104);},

        events: [],

        options: {
            prefix: ""
        },

        _hasBindingTarget: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 105);},

        _tabindex: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 106);},

        setOptions: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 107);},

        resize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 108);},

        getSize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 109);},

        size: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 110);},

        setSize: $.noop,
        _resize: $.noop,

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 111);}
    });

    kendo.dimensions = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 112);};

    kendo.notify = noop;

    var templateRegExp = /template$/i,
        jsonRegExp = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/,
        jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}/,
        dashRegExp = /([A-Z])/g;

    function parseOption(element, option) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 113);
        var value;

        if (option.indexOf("data") === 0) {
            option = option.substring(4);
            option = option.charAt(0).toLowerCase() + option.substring(1);
        }

        option = option.replace(dashRegExp, "-$1");
        value = element.getAttribute("data-" + kendo.ns + option);

        if (value === null) {
            value = undefined;
        } else if (value === "null") {
            value = null;
        } else if (value === "true") {
            value = true;
        } else if (value === "false") {
            value = false;
        } else if (numberRegExp.test(value)) {
            value = parseFloat(value);
        } else if (jsonRegExp.test(value) && !jsonFormatRegExp.test(value)) {
            value = evil("(" + value + ")");
        }

        return value;
    }

    function parseOptions(element, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 114);
        var result = {},
            option,
            value;

        for (option in options) {
            value = parseOption(element, option);

            if (value !== undefined) {

                if (templateRegExp.test(option)) {
                    value = kendo.template($("#" + value).html());
                }

                result[option] = value;
            }
        }

        return result;
    }

    kendo.initWidget = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 115);};

    kendo.rolesFromNamespaces = function(namespaces) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 116);
        var roles = [],
            idx,
            length;

        if (!namespaces[0]) {
            namespaces = [kendo.ui, kendo.dataviz.ui];
        }

        for (idx = 0, length = namespaces.length; idx < length; idx ++) {
            roles[idx] = namespaces[idx].roles;
        }

        return extend.apply(null, [{}].concat(roles.reverse()));
    };

    kendo.init = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 117);};

    kendo.destroy = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 118);};

    kendo.resize = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 119);};

    kendo.parseOptions = parseOptions;

    extend(kendo.ui, {
        Widget: Widget,
        roles: {},
        progress: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 120);},
        plugin: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 121);}
    });

    var ContainerNullObject = { bind: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 122);} };

    var MobileWidget = Widget.extend({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 123);},

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 124);},

        options: {
            prefix: "Mobile"
        },

        events: [],

        view: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 125);},

        container: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 126);}
    });

    extend(kendo.mobile, {
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 127);},

        ui: {
            Widget: MobileWidget,
            roles: {},
            plugin: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 128);}
        }
    });

    kendo.touchScroller = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 129);};

    kendo.preventDefault = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 130);};

    kendo.widgetInstance = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 131);};

    kendo.onResize = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 132);};

    kendo.unbindResize = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 133);};

    kendo.attrValue = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 134);};

    kendo.days = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    function focusable(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 135);}

    function visible(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 136);}

    $.extend($.expr[ ":" ], {
        kendoFocusable: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 137);}
    });

    var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseenter", "mouseleave", "mouseover", "mouseout", "mouseup", "click"];
    var EXCLUDE_BUST_CLICK_SELECTOR = "label, input, [data-rel=external]";

    var MouseEventNormalizer = {
        setupMouseMute: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 138);
            var idx = 0,
                length = MOUSE_EVENTS.length,
                element = document.documentElement;

            if (MouseEventNormalizer.mouseTrap || !support.eventCapture) {
                return;
            }

            MouseEventNormalizer.mouseTrap = true;

            MouseEventNormalizer.bustClick = false;
            MouseEventNormalizer.captureMouse = false;

            var handler = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 139);};

            for (; idx < length; idx++) {
                element.addEventListener(MOUSE_EVENTS[idx], handler, true);
            }
        },

        muteMouse: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 140);},

        unMuteMouse: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 141);}
    };

    var eventMap = {
        down: "touchstart mousedown",
        move: "mousemove touchmove",
        up: "mouseup touchend touchcancel",
        cancel: "mouseleave touchcancel"
    };

    if (support.touch && (support.mobileOS.ios || support.mobileOS.android)) {
        eventMap = {
            down: "touchstart",
            move: "touchmove",
            up: "touchend touchcancel",
            cancel: "touchcancel"
        };
    } else if (support.pointers) {
        eventMap = {
            down: "pointerdown",
            move: "pointermove",
            up: "pointerup",
            cancel: "pointercancel pointerleave"
        };
    } else if (support.msPointers) {
        eventMap = {
            down: "MSPointerDown",
            move: "MSPointerMove",
            up: "MSPointerUp",
            cancel: "MSPointerCancel MSPointerLeave"
        };
    }

    if (support.msPointers && !("onmspointerenter" in window)) { // IE10
        // Create MSPointerEnter/MSPointerLeave events using mouseover/out and event-time checks
        $.each({
            MSPointerEnter: "MSPointerOver",
            MSPointerLeave: "MSPointerOut"
        }, function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 142);});
    }


    var getEventMap = function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 143); return (eventMap[e] || e); },
        eventRegEx = /([^ ]+)/g;

    kendo.applyEventMap = function(events, ns) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 144);
        events = events.replace(eventRegEx, getEventMap);

        if (ns) {
            events = events.replace(eventRegEx, "$1." + ns);
        }

        return events;
    };

    var on = $.fn.on;

    function kendoJQuery(selector, context) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 145);
        return new kendoJQuery.fn.init(selector, context);
    }

    extend(true, kendoJQuery, $);

    kendoJQuery.fn = kendoJQuery.prototype = new $();

    kendoJQuery.fn.constructor = kendoJQuery;

    kendoJQuery.fn.init = function(selector, context) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 146);
        if (context && context instanceof $ && !(context instanceof kendoJQuery)) {
            context = kendoJQuery(context);
        }

        return $.fn.init.call(this, selector, context, rootjQuery);
    };

    kendoJQuery.fn.init.prototype = kendoJQuery.fn;

    var rootjQuery = kendoJQuery(document);

    extend(kendoJQuery.fn, {
        handler: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 147);},

        autoApplyNS: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 148);},

        on: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 149);
            var that = this,
                ns = that.data("kendoNS");

            // support for event map signature
            if (arguments.length === 1) {
                return on.call(that, arguments[0]);
            }

            var context = that,
                args = slice.call(arguments);

            if (typeof args[args.length -1] === UNDEFINED) {
                args.pop();
            }

            var callback =  args[args.length - 1],
                events = kendo.applyEventMap(args[0], ns);

            // setup mouse trap
            if (support.mouseAndTouchPresent && events.search(/mouse|click/) > -1 && this[0] !== document.documentElement) {
                MouseEventNormalizer.setupMouseMute();

                var selector = args.length === 2 ? null : args[1],
                    bustClick = events.indexOf("click") > -1 && events.indexOf("touchend") > -1;

                on.call(this,
                    {
                        touchstart: MouseEventNormalizer.muteMouse,
                        touchend: MouseEventNormalizer.unMuteMouse
                    },
                    selector,
                    {
                        bustClick: bustClick
                    });
            }

            if (typeof callback === STRING) {
                context = that.data("handler");
                callback = context[callback];

                args[args.length - 1] = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 150);};
            }

            args[0] = events;

            on.apply(that, args);

            return that;
        },

        kendoDestroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 151);}
    });

    kendo.jQuery = kendoJQuery;
    kendo.eventMap = eventMap;

    kendo.timezone = (function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 152);
        var months =  { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

        function ruleToDate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 153);}

        function findRule(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 154);}

        function findZone(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 155);}

        function zoneAndRule(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 156);}

        function offset(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 157);}

        function abbr(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 158);}

        function convert(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 159);}

        function apply(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 160);}

        function remove(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 161);}

        function toLocalDate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 162);}

        return {
           zones: {},
           rules: {},
           offset: offset,
           convert: convert,
           apply: apply,
           remove: remove,
           abbr: abbr,
           toLocalDate: toLocalDate
        };
    })();

    kendo.date = (function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 163);
        var MS_PER_MINUTE = 60000,
            MS_PER_DAY = 86400000;

        function adjustDST(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 164);}

        function setDayOfWeek(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 165);}

        function dayOfWeek(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 166);}

        function firstDayOfMonth(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 167);}

        function lastDayOfMonth(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 168);}

        function getDate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 169);}

        function toUtcTime(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 170);}

        function getMilliseconds(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 171);}

        function isInTimeRange(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 172);}

        function isInDateRange(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 173);}

        function addDays(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 174);}

        function setTime(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 175);}

        function today(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 176);}

        function isToday(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 177);}

        function toInvariantTime(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 178);}

        return {
            adjustDST: adjustDST,
            dayOfWeek: dayOfWeek,
            setDayOfWeek: setDayOfWeek,
            getDate: getDate,
            isInDateRange: isInDateRange,
            isInTimeRange: isInTimeRange,
            isToday: isToday,
            nextDay: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 179);},
            previousDay: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 180);},
            toUtcTime: toUtcTime,
            MS_PER_DAY: MS_PER_DAY,
            MS_PER_MINUTE: MS_PER_MINUTE,
            setTime: setTime,
            addDays: addDays,
            today: today,
            toInvariantTime: toInvariantTime,
            firstDayOfMonth: firstDayOfMonth,
            lastDayOfMonth: lastDayOfMonth,
            getMilliseconds: getMilliseconds
            //TODO methods: combine date portion and time portion from arguments - date1, date 2
        };
    })();


    kendo.stripWhitespace = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 181);};

    var animationFrame  = window.requestAnimationFrame       ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame    ||
                          window.oRequestAnimationFrame      ||
                          window.msRequestAnimationFrame     ||
                          function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 182);};

    kendo.animationFrame = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 183);};

    var animationQueue = [];

    kendo.queueAnimation = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 184);};

    kendo.runNextAnimation = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 185);};

    kendo.parseQueryStringParams = function(url) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 186);
        var queryString = url.split('?')[1] || "",
            params = {},
            paramParts = queryString.split(/&|=/),
            length = paramParts.length,
            idx = 0;

        for (; idx < length; idx += 2) {
            if(paramParts[idx] !== "") {
                params[decodeURIComponent(paramParts[idx])] = decodeURIComponent(paramParts[idx + 1]);
            }
        }

        return params;
    };

})(jQuery, eval);

/*global kendo_module:true */
if (typeof kendo_module === "undefined") {
    kendo_module = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.core.js", 187);};
}

kendo_module({
    id: "core",
    name: "Core",
    category: "framework",
    description: "The core of the Kendo framework."
});
