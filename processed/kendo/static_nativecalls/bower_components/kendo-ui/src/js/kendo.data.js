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
    id: "data",
    name: "Data source",
    category: "framework",
    description: "Powerful component for using local and remote data.Fully supports CRUD, Sorting, Paging, Filtering, Grouping, and Aggregates.",
    depends: [ "core" ],
    features: [ {
        id: "data-odata",
        name: "OData",
        description: "Support for accessing Open Data Protocol (OData) services.",
        depends: [ "data.odata" ]
    }, {
        id: "data-XML",
        name: "XML",
        description: "Support for binding to XML.",
        depends: [ "data.xml" ]
    } ]
});

(function($, undefined) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 0);
    var extend = $.extend,
        proxy = $.proxy,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        isArray = $.isArray,
        grep = $.grep,
        ajax = $.ajax,
        map,
        each = $.each,
        noop = $.noop,
        kendo = window.kendo,
        isFunction = kendo.isFunction,
        Observable = kendo.Observable,
        Class = kendo.Class,
        STRING = "string",
        FUNCTION = "function",
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        SYNC = "sync",
        GET = "get",
        ERROR = "error",
        REQUESTSTART = "requestStart",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function(o) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 1); return o; },
        getter = kendo.getter,
        stringify = kendo.stringify,
        math = Math,
        push = [].push,
        join = [].join,
        pop = [].pop,
        splice = [].splice,
        shift = [].shift,
        slice = [].slice,
        unshift = [].unshift,
        toString = {}.toString,
        stableSort = kendo.support.stableSort,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        newLineRegExp = /(\r+|\n+)/g,
        quoteRegExp = /(?=['\\])/g;

    var ObservableArray = Observable.extend({
        init: function(array, type) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 2);
            var that = this;

            that.type = type || ObservableObject;

            Observable.fn.init.call(that);

            that.length = array.length;

            that.wrapAll(array, that);
        },

        toJSON: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 3);
            var idx, length = this.length, value, json = new Array(length);

            for (idx = 0; idx < length; idx++){
                value = this[idx];

                if (value instanceof ObservableObject) {
                    value = value.toJSON();
                }

                json[idx] = value;
            }

            return json;
        },

        parent: noop,

        wrapAll: function(source, target) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 4);
            var that = this,
                idx,
                length,
                parent = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 5);
                    return that;
                };

            target = target || [];

            for (idx = 0, length = source.length; idx < length; idx++) {
                target[idx] = that.wrap(source[idx], parent);
            }

            return target;
        },

        wrap: function(object, parent) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 6);
            var that = this,
                observable;

            if (object !== null && toString.call(object) === "[object Object]") {
                observable = object instanceof that.type || object instanceof Model;

                if (!observable) {
                    object = object instanceof ObservableObject ? object.toJSON() : object;
                    object = new that.type(object);
                }

                object.parent = parent;

                object.bind(CHANGE, function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 7);
                    that.trigger(CHANGE, {
                        field: e.field,
                        node: e.node,
                        index: e.index,
                        items: e.items || [this],
                        action: e.node  ? (e.action || "itemchange") : "itemchange"
                    });
                });
            }

            return object;
        },

        push: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 8);
            var index = this.length,
                items = this.wrapAll(arguments),
                result;

            result = push.apply(this, items);

            this.trigger(CHANGE, {
                action: "add",
                index: index,
                items: items
            });

            return result;
        },

        slice: slice,

        join: join,

        pop: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 9);
            var length = this.length, result = pop.apply(this);

            if (length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: length - 1,
                    items:[result]
                });
            }

            return result;
        },

        splice: function(index, howMany, item) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 10);
            var items = this.wrapAll(slice.call(arguments, 2)),
                result, i, len;

            result = splice.apply(this, [index, howMany].concat(items));

            if (result.length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: index,
                    items: result
                });

                for (i = 0, len = result.length; i < len; i++) {
                    if (result[i].children) {
                        result[i].unbind(CHANGE);
                    }
                }
            }

            if (item) {
                this.trigger(CHANGE, {
                    action: "add",
                    index: index,
                    items: items
                });
            }
            return result;
        },

        shift: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 11);
            var length = this.length, result = shift.apply(this);

            if (length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: 0,
                    items:[result]
                });
            }

            return result;
        },

        unshift: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 12);
            var items = this.wrapAll(arguments),
                result;

            result = unshift.apply(this, items);

            this.trigger(CHANGE, {
                action: "add",
                index: 0,
                items: items
            });

            return result;
        },

        indexOf: function(item) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 13);
            var that = this,
                idx,
                length;

            for (idx = 0, length = that.length; idx < length; idx++) {
                if (that[idx] === item) {
                    return idx;
                }
            }
            return -1;
        },

        forEach: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 14);},

        map: function(callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 15);
            var idx = 0,
                result = [],
                length = this.length;

            for (; idx < length; idx++) {
                result[idx] = callback(this[idx], idx, this);
            }

            return result;
        },

        filter: function(callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 16);
            var idx = 0,
                result = [],
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    result[result.length] = item;
                }
            }

            return result;
        },

        find: function(callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 17);
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    return item;
                }
            }
        },

        every: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 18);},

        some: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 19);},

        // non-standard collection methods
        remove: function(item) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 20);
            this.splice(this.indexOf(item), 1);
        },

        empty: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 21);
            this.splice(0, this.length);
        }
    });

    function eventHandler(context, type, field, prefix) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 22);
        return function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 23);
            var event = {}, key;

            for (key in e) {
                event[key] = e[key];
            }

            if (prefix) {
                event.field = field + "." + e.field;
            } else {
                event.field = field;
            }

            if (type == CHANGE && context._notifyChange) {
                context._notifyChange(event);
            }

            context.trigger(type, event);
        };
    }

    var ObservableObject = Observable.extend({
        init: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 24);
            var that = this,
                member,
                field,
                parent = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 25);
                    return that;
                };

            Observable.fn.init.call(this);

            for (field in value) {
                member = value[field];

                if (field.charAt(0) != "_") {
                    member = that.wrap(member, field, parent);
                }

                that[field] = member;
            }

            that.uid = kendo.guid();
        },

        shouldSerialize: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 26);
            return this.hasOwnProperty(field) && field !== "_events" && typeof this[field] !== FUNCTION && field !== "uid";
        },

        forEach: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 27);},

        toJSON: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 28);
            var result = {}, value, field;

            for (field in this) {
                if (this.shouldSerialize(field)) {
                    value = this[field];

                    if (value instanceof ObservableObject || value instanceof ObservableArray) {
                        value = value.toJSON();
                    }

                    result[field] = value;
                }
            }

            return result;
        },

        get: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 29);
            var that = this, result;

            that.trigger(GET, { field: field });

            if (field === "this") {
                result = that;
            } else {
                result = kendo.getter(field, true)(that);
            }

            return result;
        },

        _set: function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 30);
            var that = this;
            var composite = field.indexOf(".") >= 0;

            if (composite) {
                var paths = field.split("."),
                    path = "";

                while (paths.length > 1) {
                    path += paths.shift();
                    var obj = kendo.getter(path, true)(that);
                    if (obj instanceof ObservableObject) {
                        obj.set(paths.join("."), value);
                        return composite;
                    }
                    path += ".";
                }
            }

            kendo.setter(field)(that, value);

            return composite;
        },

        set: function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 31);
            var that = this,
                current = kendo.getter(field, true)(that);

            if (current !== value) {

                if (!that.trigger("set", { field: field, value: value })) {
                    if (!that._set(field, that.wrap(value, field, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 32); return that; })) || field.indexOf("(") >= 0 || field.indexOf("[") >= 0) {
                        that.trigger(CHANGE, { field: field });
                    }
                }
            }
        },

        parent: noop,

        wrap: function(object, field, parent) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 33);
            var that = this,
                type = toString.call(object);

            if (object != null && (type === "[object Object]" || type === "[object Array]")) {
                var isObservableArray = object instanceof ObservableArray;
                var isDataSource = object instanceof DataSource;

                if (type === "[object Object]" && !isDataSource && !isObservableArray) {
                    if (!(object instanceof ObservableObject)) {
                        object = new ObservableObject(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(GET, eventHandler(that, GET, field, true));
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, true));
                    }
                } else if (type === "[object Array]" || isObservableArray || isDataSource) {
                    if (!isObservableArray && !isDataSource) {
                        object = new ObservableArray(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, false));
                    }
                }

                object.parent = parent;
            }

            return object;
        }
    });

    function equal(x, y) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 34);
        if (x === y) {
            return true;
        }

        var xtype = $.type(x), ytype = $.type(y), field;

        if (xtype !== ytype) {
            return false;
        }

        if (xtype === "date") {
            return x.getTime() === y.getTime();
        }

        if (xtype !== "object" && xtype !== "array") {
            return false;
        }

        for (field in x) {
            if (!equal(x[field], y[field])) {
                return false;
            }
        }

        return true;
    }

    var parsers = {
        "number": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 35);},

        "date": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 36);},

        "boolean": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 37);},

        "string": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 38);},

        "default": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 39);}
    };

    var defaultValues = {
        "string": "",
        "number": 0,
        "date": new Date(),
        "boolean": false,
        "default": ""
    };

    function getFieldByName(obj, name) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 40);
        var field,
            fieldName;

        for (fieldName in obj) {
            field = obj[fieldName];
            if (isPlainObject(field) && field.field && field.field === name) {
                return field;
            } else if (field === name) {
                return field;
            }
        }
        return null;
    }

    var Model = ObservableObject.extend({
        init: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 41);
            var that = this;

            if (!data || $.isEmptyObject(data)) {
                data = $.extend({}, that.defaults, data);
            }

            ObservableObject.fn.init.call(that, data);

            that.dirty = false;

            if (that.idField) {
                that.id = that.get(that.idField);

                if (that.id === undefined) {
                    that.id = that._defaultId;
                }
            }
        },

        shouldSerialize: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 42);
            return ObservableObject.fn.shouldSerialize.call(this, field) && field !== "uid" && !(this.idField !== "id" && field === "id") && field !== "dirty" && field !== "_accessors";
        },

        _parse: function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 43);
            var that = this,
                fieldName = field,
                fields = (that.fields || {}),
                parse;

            field = fields[field];
            if (!field) {
                field = getFieldByName(fields, fieldName);
            }
            if (field) {
                parse = field.parse;
                if (!parse && field.type) {
                    parse = parsers[field.type.toLowerCase()];
                }
            }

            return parse ? parse(value) : value;
        },

        _notifyChange: function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 44);
            var action = e.action;

            if (action == "add" || action == "remove") {
                this.dirty = true;
            }
        },

        editable: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 45);
            field = (this.fields || {})[field];
            return field ? field.editable !== false : true;
        },

        set: function(field, value, initiator) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 46);
            var that = this;

            if (that.editable(field)) {
                value = that._parse(field, value);

                if (!equal(value, that.get(field))) {
                    that.dirty = true;
                    ObservableObject.fn.set.call(that, field, value, initiator);
                }
            }
        },

        accept: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 47);
            var that = this,
                parent = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 48); return that; },
                field;

            for (field in data) {
                var value = data[field];

                if (field.charAt(0) != "_") {
                    value = that.wrap(data[field], field, parent);
                }

                that._set(field, value);
            }

            if (that.idField) {
                that.id = that.get(that.idField);
            }

            that.dirty = false;
        },

        isNew: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 49);
            return this.id === this._defaultId;
        }
    });

    Model.define = function(base, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 50);
        if (options === undefined) {
            options = base;
            base = Model;
        }

        var model,
            proto = extend({ defaults: {} }, options),
            name,
            field,
            type,
            value,
            idx,
            length,
            fields = {},
            originalName,
            id = proto.id;

        if (id) {
            proto.idField = id;
        }

        if (proto.id) {
            delete proto.id;
        }

        if (id) {
            proto.defaults[id] = proto._defaultId = "";
        }

        if (toString.call(proto.fields) === "[object Array]") {
            for (idx = 0, length = proto.fields.length; idx < length; idx++) {
                field = proto.fields[idx];
                if (typeof field === STRING) {
                    fields[field] = {};
                } else if (field.field) {
                    fields[field.field] = field;
                }
            }
            proto.fields = fields;
        }

        for (name in proto.fields) {
            field = proto.fields[name];
            type = field.type || "default";
            value = null;
            originalName = name;

            name = typeof (field.field) === STRING ? field.field : name;

            if (!field.nullable) {
                value = proto.defaults[originalName !== name ? originalName : name] = field.defaultValue !== undefined ? field.defaultValue : defaultValues[type.toLowerCase()];
            }

            if (options.id === name) {
                proto._defaultId = value;
            }

            proto.defaults[originalName !== name ? originalName : name] = value;

            field.parse = field.parse || parsers[type];
        }

        model = base.extend(proto);
        model.define = function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 51);
            return Model.define(model, options);
        };

        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }

        return model;
    };

    var Comparer = {
        selector: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 52);
            return isFunction(field) ? field : getter(field);
        },

        compare: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 53);
            var selector = this.selector(field);
            return function (a, b) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 54);
                a = selector(a);
                b = selector(b);

                if (a == null && b == null) {
                    return 0;
                }

                if (a == null) {
                    return -1;
                }

                if (b == null) {
                    return 1;
                }

                if (a.localeCompare) {
                    return a.localeCompare(b);
                }

                return a > b ? 1 : (a < b ? -1 : 0);
            };
        },

        create: function(sort) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 55);
            var compare = sort.compare || this.compare(sort.field);

            if (sort.dir == "desc") {
                return function(a, b) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 56);
                    return compare(b, a, true);
                };
            }

            return compare;
        },

        combine: function(comparers) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 57);
            return function(a, b) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 58);
                var result = comparers[0](a, b),
                    idx,
                    length;

                for (idx = 1, length = comparers.length; idx < length; idx ++) {
                    result = result || comparers[idx](a, b);
                }

                return result;
            };
        }
    };

    var StableComparer = extend({}, Comparer, {
        asc: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 59);},

        desc: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 60);},
        create: function(sort) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 61);
           return this[sort.dir](sort.field);
        }
    });

    map = function (array, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 62);
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = callback(array[idx], idx, array);
        }

        return result;
    };

    var operators = (function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 63);

        function quote(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 64);
            return value.replace(quoteRegExp, "\\").replace(newLineRegExp, "");
        }

        function operator(op, a, b, ignore) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 65);
            var date;

            if (b != null) {
                if (typeof b === STRING) {
                    b = quote(b);
                    date = dateRegExp.exec(b);
                    if (date) {
                        b = new Date(+date[1]);
                    } else if (ignore) {
                        b = "'" + b.toLowerCase() + "'";
                        a = "(" + a + " || '').toLowerCase()";
                    } else {
                        b = "'" + b + "'";
                    }
                }

                if (b.getTime) {
                    //b looks like a Date
                    a = "(" + a + "?" + a + ".getTime():" + a + ")";
                    b = b.getTime();
                }
            }

            return a + " " + op + " " + b;
        }

        return {
            eq: function(a, b, ignore) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 66);
                return operator("==", a, b, ignore);
            },
            neq: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 67);},
            gt: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 68);},
            gte: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 69);},
            lt: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 70);},
            lte: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 71);},
            startswith: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 72);},
            endswith: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 73);},
            contains: function(a, b, ignore) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 74);
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "') >= 0";
            },
            doesnotcontain: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 75);}
        };
    })();

    function Query(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 76);
        this.data = data || [];
    }

    Query.filterExpr = function(expression) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 77);
        var expressions = [],
            logic = { and: " && ", or: " || " },
            idx,
            length,
            filter,
            expr,
            fieldFunctions = [],
            operatorFunctions = [],
            field,
            operator,
            filters = expression.filters;

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            operator = filter.operator;

            if (filter.filters) {
                expr = Query.filterExpr(filter);
                //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
                filter = expr.expression
                .replace(/__o\[(\d+)\]/g, function(match, index) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 78);
                    index = +index;
                    return "__o[" + (operatorFunctions.length + index) + "]";
                })
                .replace(/__f\[(\d+)\]/g, function(match, index) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 79);
                    index = +index;
                    return "__f[" + (fieldFunctions.length + index) + "]";
                });

                operatorFunctions.push.apply(operatorFunctions, expr.operators);
                fieldFunctions.push.apply(fieldFunctions, expr.fields);
            } else {
                if (typeof field === FUNCTION) {
                    expr = "__f[" + fieldFunctions.length +"](d)";
                    fieldFunctions.push(field);
                } else {
                    expr = kendo.expr(field);
                }

                if (typeof operator === FUNCTION) {
                    filter = "__o[" + operatorFunctions.length + "](" + expr + ", " + filter.value + ")";
                    operatorFunctions.push(operator);
                } else {
                    filter = operators[(operator || "eq").toLowerCase()](expr, filter.value, filter.ignoreCase !== undefined? filter.ignoreCase : true);
                }
            }

            expressions.push(filter);
        }

        return  { expression: "(" + expressions.join(logic[expression.logic]) + ")", fields: fieldFunctions, operators: operatorFunctions };
    };

    function normalizeSort(field, dir) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 80);
        if (field) {
            var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
            descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

            return grep(descriptors, function(d) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 81); return !!d.dir; });
        }
    }

    var operatorMap = {
        "==": "eq",
        equals: "eq",
        isequalto: "eq",
        equalto: "eq",
        equal: "eq",
        "!=": "neq",
        ne: "neq",
        notequals: "neq",
        isnotequalto: "neq",
        notequalto: "neq",
        notequal: "neq",
        "<": "lt",
        islessthan: "lt",
        lessthan: "lt",
        less: "lt",
        "<=": "lte",
        le: "lte",
        islessthanorequalto: "lte",
        lessthanequal: "lte",
        ">": "gt",
        isgreaterthan: "gt",
        greaterthan: "gt",
        greater: "gt",
        ">=": "gte",
        isgreaterthanorequalto: "gte",
        greaterthanequal: "gte",
        ge: "gte",
        notsubstringof: "doesnotcontain"
    };

    function normalizeOperator(expression) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 82);
        var idx,
        length,
        filter,
        operator,
        filters = expression.filters;

        if (filters) {
            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                operator = filter.operator;

                if (operator && typeof operator === STRING) {
                    filter.operator = operatorMap[operator.toLowerCase()] || operator;
                }

                normalizeOperator(filter);
            }
        }
    }

    function normalizeFilter(expression) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 83);
        if (expression && !isEmptyObject(expression)) {
            if (isArray(expression) || !expression.filters) {
                expression = {
                    logic: "and",
                    filters: isArray(expression) ? expression : [expression]
                };
            }

            normalizeOperator(expression);

            return expression;
        }
    }

    Query.normalizeFilter = normalizeFilter;

    function normalizeAggregate(expressions) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 84);
        return isArray(expressions) ? expressions : [expressions];
    }

    function normalizeGroup(field, dir) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 85);
        var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
        descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(d) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 86); return { field: d.field, dir: d.dir || "asc", aggregates: d.aggregates }; });
    }

    Query.prototype = {
        toArray: function () {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 87);
            return this.data;
        },
        range: function(index, count) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 88);
            return new Query(this.data.slice(index, index + count));
        },
        skip: function (count) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 89);
            return new Query(this.data.slice(count));
        },
        take: function (count) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 90);
            return new Query(this.data.slice(0, count));
        },
        select: function (selector) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 91);
            return new Query(map(this.data, selector));
        },
        order: function(selector, dir) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 92);
            var sort = { dir: dir };

            if (selector) {
                if (selector.compare) {
                    sort.compare = selector.compare;
                } else {
                    sort.field = selector;
                }
            }

            return new Query(this.data.slice(0).sort(Comparer.create(sort)));
        },
        orderBy: function(selector) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 93);
            return this.order(selector, "asc");
        },
        orderByDescending: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 94);},
        sort: function(field, dir, comparer) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 95);
            var idx,
            length,
            descriptors = normalizeSort(field, dir),
            comparers = [];

            comparer = comparer || Comparer;

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: comparer.combine(comparers) });
            }

            return this;
        },

        filter: function(expressions) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 96);
            var idx,
            current,
            length,
            compiled,
            predicate,
            data = this.data,
            fields,
            operators,
            result = [],
            filter;

            expressions = normalizeFilter(expressions);

            if (!expressions || expressions.filters.length === 0) {
                return this;
            }

            compiled = Query.filterExpr(expressions);
            fields = compiled.fields;
            operators = compiled.operators;

            predicate = filter = new Function("d, __f, __o", "return " + compiled.expression);

            if (fields.length || operators.length) {
                filter = function(d) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 97);
                    return predicate(d, fields, operators);
                };
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                current = data[idx];

                if (filter(current)) {
                    result.push(current);
                }
            }
            return new Query(result);
        },

        group: function(descriptors, allData) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 98);
            descriptors =  normalizeGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
            result = new Query(that.data),
            descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function(group) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 99);
                    var data = new Query(allData).filter([ { field: group.field, operator: "eq", value: group.value, ignoreCase: false } ]);
                    return {
                        field: group.field,
                        value: group.value,
                        items: descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), data.toArray()).toArray() : group.items,
                        hasSubgroups: descriptors.length > 1,
                        aggregates: data.aggregate(descriptor.aggregates)
                    };
                });
            }
            return result;
        },

        groupBy: function(descriptor) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 100);
            if (isEmptyObject(descriptor) || !this.data.length) {
                return new Query([]);
            }

            var field = descriptor.field,
                sorted = this._sortForGrouping(field, descriptor.dir || "asc"),
                accessor = kendo.accessor(field),
                item,
                groupValue = accessor.get(sorted[0], field),
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                },
                currentValue,
                idx,
                len,
                result = [group];

            for(idx = 0, len = sorted.length; idx < len; idx++) {
                item = sorted[idx];
                currentValue = accessor.get(item, field);
                if(!groupValueComparer(groupValue, currentValue)) {
                    groupValue = currentValue;
                    group = {
                        field: field,
                        value: groupValue,
                        items: []
                    };
                    result.push(group);
                }
                group.items.push(item);
            }
            return new Query(result);
        },

        _sortForGrouping: function(field, dir) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 101);
            var idx, length,
                data = this.data;

            if (!stableSort) {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    data[idx].__position = idx;
                }

                data = new Query(data).sort(field, dir, StableComparer).toArray();

                for (idx = 0, length = data.length; idx < length; idx++) {
                    delete data[idx].__position;
                }
                return data;
            }
            return this.sort(field, dir).toArray();
        },

        aggregate: function (aggregates) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 102);
            var idx,
            len,
            result = {};

            if (aggregates && aggregates.length) {
                for(idx = 0, len = this.data.length; idx < len; idx++) {
                    calculateAggregate(result, aggregates, this.data[idx], idx, len);
                }
            }
            return result;
        }
    };

    function groupValueComparer(a, b) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 103);
        if (a && a.getTime && b && b.getTime) {
            return a.getTime() === b.getTime();
        }
        return a === b;
    }

    function calculateAggregate(accumulator, aggregates, item, index, length) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 104);
        aggregates = aggregates || [];
        var idx,
        aggr,
        functionName,
        len = aggregates.length;

        for (idx = 0; idx < len; idx++) {
            aggr = aggregates[idx];
            functionName = aggr.aggregate;
            var field = aggr.field;
            accumulator[field] = accumulator[field] || {};
            accumulator[field][functionName] = functions[functionName.toLowerCase()](accumulator[field][functionName], item, kendo.accessor(field), index, length);
        }
    }

    var functions = {
        sum: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 105);},
        count: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 106);},
        average: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 107);},
        max: function(accumulator, item, accessor) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 108);
            var value = accessor.get(item);

            accumulator = accumulator || 0;

            if(accumulator < value) {
                accumulator = value;
            }
            return accumulator;
        },
        min: function(accumulator, item, accessor) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 109);
            var value = accessor.get(item);

            if (!isNumber(accumulator)) {
                accumulator = value;
            }

            if(accumulator > value && isNumber(value)) {
                accumulator = value;
            }
            return accumulator;
        }
    };

    function isNumber(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 110);
        return typeof val === "number" && !isNaN(val);
    }

    function toJSON(array) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 111);
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = array[idx].toJSON();
        }

        return result;
    }

    Query.process = function(data, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 112);
        options = options || {};

        var query = new Query(data),
            group = options.group,
            sort = normalizeGroup(group || []).concat(normalizeSort(options.sort || [])),
            total,
            filter = options.filter,
            skip = options.skip,
            take = options.take;

        if (filter) {
            query = query.filter(filter);
            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);

            if (group) {
                data = query.toArray();
            }
        }

        if (skip !== undefined && take !== undefined) {
            query = query.range(skip, take);
        }

        if (group) {
            query = query.group(group, data);
        }

        return {
            total: total,
            data: query.toArray()
        };
    };

    function calculateAggregates(data, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 113);
        options = options || {};

        var query = new Query(data),
            aggregates = options.aggregate,
            filter = options.filter;

        if(filter) {
            query = query.filter(filter);
        }

        return query.aggregate(aggregates);
    }

    var LocalTransport = Class.extend({
        init: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 114);
            this.data = options.data;
        },

        read: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 115);
            options.success(this.data);
        },
        update: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 116);},
        create: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 117);
            options.success(options.data);
        },
        destroy: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 118);
            options.success(options.data);
        }
    });

    var RemoteTransport = Class.extend( {
        init: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 119);
            var that = this, parameterMap;

            options = that.options = extend({}, that.options, options);

            each(crud, function(index, type) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 120);
                if (typeof options[type] === STRING) {
                    options[type] = {
                        url: options[type]
                    };
                }
            });

            that.cache = options.cache? Cache.create(options.cache) : {
                find: noop,
                add: noop
            };

            parameterMap = options.parameterMap;

            that.parameterMap = isFunction(parameterMap) ? parameterMap : function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 121);
                var result = {};

                each(options, function(option, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 122);
                    if (option in parameterMap) {
                        option = parameterMap[option];
                        if (isPlainObject(option)) {
                            value = option.value(value);
                            option = option.key;
                        }
                    }

                    result[option] = value;
                });

                return result;
            };
        },

        options: {
            parameterMap: identity
        },

        create: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 123);
            return ajax(this.setup(options, CREATE));
        },

        read: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 124);
            var that = this,
                success,
                error,
                result,
                cache = that.cache;

            options = that.setup(options, READ);

            success = options.success || noop;
            error = options.error || noop;

            result = cache.find(options.data);

            if(result !== undefined) {
                success(result);
            } else {
                options.success = function(result) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 125);
                    cache.add(options.data, result);

                    success(result);
                };

                $.ajax(options);
            }
        },

        update: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 126);},

        destroy: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 127);
            return ajax(this.setup(options, DESTROY));
        },

        setup: function(options, type) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 128);
            options = options || {};

            var that = this,
                parameters,
                operation = that.options[type],
                data = isFunction(operation.data) ? operation.data(options.data) : operation.data;

            options = extend(true, {}, operation, options);
            parameters = extend(true, {}, data, options.data);

            options.data = that.parameterMap(parameters, type);

            if (isFunction(options.url)) {
                options.url = options.url(parameters);
            }

            return options;
        }
    });

    var Cache = Class.extend({
        init: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 129);
            this._store = {};
        },
        add: function(key, data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 130);
            if(key !== undefined) {
                this._store[stringify(key)] = data;
            }
        },
        find: function(key) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 131);
            return this._store[stringify(key)];
        },
        clear: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 132);},
        remove: function(key) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 133);
            delete this._store[stringify(key)];
        }
    });

    Cache.create = function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 134);
        var store = {
            "inmemory": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 135);}
        };

        if (isPlainObject(options) && isFunction(options.find)) {
            return options;
        }

        if (options === true) {
            return new Cache();
        }

        return store[options]();
    };

    function serializeRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 136);
        var record,
            getter,
            originalName,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            for (getter in getters) {
                originalName = fieldNames[getter];

                if (originalName && originalName !== getter) {
                    record[originalName] = getters[getter](record);
                    delete record[getter];
                }
            }
        }
    }

    function convertRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 137);
        var record,
            getter,
            originalName,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            for (getter in getters) {
                record[getter] = modelInstance._parse(getter, getters[getter](record));

                originalName = fieldNames[getter];
                if (originalName && originalName !== getter) {
                    delete record[originalName];
                }
            }
        }
    }

    function convertGroup(data, getters, modelInstance, originalFieldNames, fieldNames) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 138);
        var record,
            idx,
            fieldName,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];

            fieldName = originalFieldNames[record.field];
            if (fieldName && fieldName != record.field) {
                record.field = fieldName;
            }

            record.value = modelInstance._parse(record.field, record.value);

            if (record.hasSubgroups) {
                convertGroup(record.items, getters, modelInstance, originalFieldNames, fieldNames);
            } else {
                convertRecords(record.items, getters, modelInstance, originalFieldNames, fieldNames);
            }
        }
    }

    function wrapDataAccess(originalFunction, model, converter, getters, originalFieldNames, fieldNames) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 139);
        return function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 140);
            data = originalFunction(data);

            if (data && !isEmptyObject(getters)) {
                if (toString.call(data) !== "[object Array]" && !(data instanceof ObservableArray)) {
                    data = [data];
                }

                converter(data, getters, new model(), originalFieldNames, fieldNames);
            }

            return data || [];
        };
    }

    var DataReader = Class.extend({
        init: function(schema) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 141);
            var that = this, member, get, model, base;

            schema = schema || {};

            for (member in schema) {
                get = schema[member];

                that[member] = typeof get === STRING ? getter(get) : get;
            }

            base = schema.modelBase || Model;

            if (isPlainObject(that.model)) {
                that.model = model = base.define(that.model);
            }

            if (that.model) {
                var dataFunction = proxy(that.data, that),
                    groupsFunction = proxy(that.groups, that),
                    serializeFunction = proxy(that.serialize, that),
                    originalFieldNames = {},
                    getters = {},
                    serializeGetters = {},
                    fieldNames = {},
                    shouldSerialize = false,
                    fieldName;

                model = that.model;

                if (model.fields) {
                    each(model.fields, function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 142);
                        var fromName;

                        fieldName = field;

                        if (isPlainObject(value) && value.field) {
                            fieldName = value.field;
                        } else if (typeof value === STRING) {
                            fieldName = value;
                        }

                        if (isPlainObject(value) && value.from) {
                            fromName = value.from;
                        }

                        shouldSerialize = shouldSerialize || (fromName && fromName !== field) || fieldName !== field;

                        getters[field] = getter(fromName || fieldName);
                        serializeGetters[field] = getter(field);
                        originalFieldNames[fromName || fieldName] = field;
                        fieldNames[field] = fromName || fieldName;
                    });

                    if (!schema.serialize && shouldSerialize) {
                        that.serialize = wrapDataAccess(serializeFunction, model, serializeRecords, serializeGetters, originalFieldNames, fieldNames);
                    }
                }

                that.data = wrapDataAccess(dataFunction, model, convertRecords, getters, originalFieldNames, fieldNames);
                that.groups = wrapDataAccess(groupsFunction, model, convertGroup, getters, originalFieldNames, fieldNames);
            }
        },
        errors: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 143);
            return data ? data.errors : null;
        },
        parse: identity,
        data: identity,
        total: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 144);
            return data.length;
        },
        groups: identity,
        aggregates: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 145);
            return {};
        },
        serialize: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 146);
            return data;
        }
    });

    function mergeGroups(target, dest, start, count) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 147);
        var group,
            idx = 0,
            items;

        while (dest.length && count) {
            group = dest[idx];
            items = group.items;

            if (target && target.field === group.field && target.value === group.value) {
                if (target.hasSubgroups && target.items.length) {
                    mergeGroups(target.items[target.items.length - 1], group.items, start, count);
                } else {
                    items = items.slice(start, count);
                    count -= items.length;
                    target.items = target.items.concat(items);
                }
                dest.splice(idx--, 1);
            } else {
                items = items.slice(start, count);
                count -= items.length;
                group.items = items;
                if (!group.items.length) {
                    dest.splice(idx--, 1);
                    count -= start;
                }
            }

            start = 0;
            if (++idx >= dest.length) {
                break;
            }
        }

        if (idx < dest.length) {
            dest.splice(idx, dest.length - idx);
        }
    }

    function flattenGroups(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 148);
        var idx, length, result = [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                result = result.concat(flattenGroups(data[idx].items));
            } else {
                result = result.concat(data[idx].items.slice());
            }
        }
        return result;
    }

    function wrapGroupItems(data, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 149);
        var idx, length, group, items;
        if (model) {
            for (idx = 0, length = data.length; idx < length; idx++) {
                group = data[idx];
                items = group.items;

                if (group.hasSubgroups) {
                    wrapGroupItems(items, model);
                } else if (items.length && !(items[0] instanceof model)) {
                    items.type = model;
                    items.wrapAll(items, items);
                }
            }
        }
    }

    function eachGroupItems(data, func) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 150);
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                if (eachGroupItems(data[idx].items, func)) {
                    return true;
                }
            } else if (func(data[idx].items, data[idx])) {
                return true;
            }
        }
    }

    function removeModel(data, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 151);
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].uid == model.uid) {
                model = data[idx];
                data.splice(idx, 1);
                return model;
            }
        }
    }

    function wrapInEmptyGroup(groups, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 152);
        var parent,
            group,
            idx,
            length;

        for (idx = groups.length-1, length = 0; idx >= length; idx--) {
            group = groups[idx];
            parent = {
                value: model.get(group.field),
                field: group.field,
                items: parent ? [parent] : [model],
                hasSubgroups: !!parent,
                aggregates: {}
            };
        }

        return parent;
    }

    function indexOfPristineModel(data, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 153);
        if (model) {
            return indexOf(data, function(item) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 154);
                return item[model.idField] === model.id;
            });
        }
        return -1;
    }

    function indexOfModel(data, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 155);
        if (model) {
            return indexOf(data, function(item) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 156);
                return item.uid == model.uid;
            });
        }
        return -1;
    }

    function indexOf(data, comparer) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 157);
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (comparer(data[idx])) {
                return idx;
            }
        }

        return -1;
    }

    function fieldNameFromModel(fields, name) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 158);
        if (fields && !isEmptyObject(fields)) {
            var descriptor = fields[name];
            var fieldName;
            if (isPlainObject(descriptor)) {
                fieldName = descriptor.from || descriptor.field || name;
            } else {
                fieldName = fields[name] || name;
            }

            if (isFunction(fieldName)) {
                return name;
            }

            return fieldName;
        }
        return name;
    }

    function convertFilterDescriptorsField(descriptor, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 159);
        var idx,
            length,
            target = {};

        for (var field in descriptor) {
            if (field !== "filters") {
                target[field] = descriptor[field];
            }
        }

        if (descriptor.filters) {
            target.filters = [];
            for (idx = 0, length = descriptor.filters.length; idx < length; idx++) {
                target.filters[idx] = convertFilterDescriptorsField(descriptor.filters[idx], model);
            }
        } else {
            target.field = fieldNameFromModel(model.fields, target.field);
        }
        return target;
    }

    function convertDescriptorsField(descriptors, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 160);
        var idx,
            length,
            result = [],
            target,
            descriptor;

        for (idx = 0, length = descriptors.length; idx < length; idx ++) {
            target = {};

            descriptor = descriptors[idx];

            for (var field in descriptor) {
                target[field] = descriptor[field];
            }

            target.field = fieldNameFromModel(model.fields, target.field);

            if (target.aggregates && isArray(target.aggregates)) {
                target.aggregates = convertDescriptorsField(target.aggregates, model);
            }
            result.push(target);
        }
        return result;
    }

    var DataSource = Observable.extend({
        init: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 161);
            var that = this, model, data;

            if (options) {
                data = options.data;
            }

            options = that.options = extend({}, that.options, options);

            that._map = {};
            that._prefetch = {};
            that._data = [];
            that._pristineData = [];
            that._ranges = [];
            that._view = [];
            that._pristine = [];
            that._destroyed = [];
            that._pageSize = options.pageSize;
            that._page = options.page  || (options.pageSize ? 1 : undefined);
            that._sort = normalizeSort(options.sort);
            that._filter = normalizeFilter(options.filter);
            that._group = normalizeGroup(options.group);
            that._aggregate = options.aggregate;
            that._total = options.total;

            Observable.fn.init.call(that);

            that.transport = Transport.create(options, data);

            that.reader = new kendo.data.readers[options.schema.type || "json" ](options.schema);

            model = that.reader.model || {};

            that._data = that._observe(that._data);

            that.bind([ERROR, CHANGE, REQUESTSTART, SYNC, REQUESTEND, PROGRESS], options);
        },

        options: {
            data: [],
            schema: {
               modelBase: Model
            },
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            serverGrouping: false,
            serverAggregates: false,
            batch: false
        },

        _isServerGrouped: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 162);
            var group = this.group() || [];

            return this.options.serverGrouping && group.length;
        },

        _flatData: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 163);
            if (this._isServerGrouped()) {
                return flattenGroups(data);
            }
            return data;
        },

        parent: noop,

        get: function(id) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 164);
            var idx, length, data = this._flatData(this._data);

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].id == id) {
                    return data[idx];
                }
            }
        },

        getByUid: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 165);},

        indexOf: function(model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 166);
            return indexOfModel(this._data, model);
        },

        at: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 167);},

        data: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 168);
            var that = this;
            if (value !== undefined) {
                that._data = this._observe(value);

                that._ranges = [];
                that._addRange(that._data);

                that._total = that._data.length;

                that._process(that._data);
            } else {
                return that._data;
            }
        },

        view: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 169);
            return this._view;
        },

        add: function(model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 170);
            return this.insert(this._data.length, model);
        },

        _createNewModel: function(model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 171);
            if (this.reader.model) {
                return  new this.reader.model(model);
            }

            return new ObservableObject(model);
        },

        insert: function(index, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 172);
            if (!model) {
                model = index;
                index = 0;
            }

            if (!(model instanceof Model)) {
                model = this._createNewModel(model);
            }

            if (this._isServerGrouped()) {
                this._data.splice(index, 0, wrapInEmptyGroup(this.group(), model));
            } else {
                this._data.splice(index, 0, model);
            }

            return model;
        },

        remove: function(model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 173);
            var result,
                that = this,
                hasGroups = that._isServerGrouped();

            this._eachItem(that._data, function(items) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 174);
                result = removeModel(items, model);
                if (result && hasGroups) {
                    if (!result.isNew || !result.isNew()) {
                        that._destroyed.push(result);
                    }
                    return true;
                }
            });
            return model;
        },

        sync: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 175);
            var that = this,
                idx,
                length,
                created = [],
                updated = [],
                destroyed = that._destroyed,
                data = that._flatData(that._data);

            if (!that.reader.model) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].isNew()) {
                    created.push(data[idx]);
                } else if (data[idx].dirty) {
                    updated.push(data[idx]);
                }
            }

            var promises = that._send("create", created);

            promises.push.apply(promises ,that._send("update", updated));
            promises.push.apply(promises ,that._send("destroy", destroyed));

            $.when.apply(null, promises)
                .then(function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 176);});
        },

        cancelChanges: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 177);},

        hasChanges: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 178);},

        _accept: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 179);},

        _updatePristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 180);},

        _executeOnPristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 181);},

        _removePristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 182);},

        _readData: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 183);
            var read = !this._isServerGrouped() ? this.reader.data : this.reader.groups;
            return read(data);
        },

        _eachPristineItem: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 184);},

       _eachItem: function(data, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 185);
            if (data && data.length) {
                if (this._isServerGrouped()) {
                    eachGroupItems(data, callback);
                } else {
                    callback(data);
                }
            }
        },

        _pristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 186);},

        _cancelModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 187);},

        _promise: function(data, models, type) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 188);
            var that = this,
            transport = that.transport;

            return $.Deferred(function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 189);}).promise();
        },

        _send: function(method, data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 190);
            var that = this,
                idx,
                length,
                promises = [],
                converted = that.reader.serialize(toJSON(data));

            if (that.options.batch) {
                if (data.length) {
                    promises.push(that._promise( { data: { models: converted } }, data , method));
                }
            } else {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    promises.push(that._promise( { data: converted[idx] }, [ data[idx] ], method));
                }
            }

            return promises;
        },

        read: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 191);
            var that = this, params = that._params(data);

            that._queueRequest(params, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 192);
                if (!that.trigger(REQUESTSTART, { type: "read" })) {
                    that.trigger(PROGRESS);

                    that._ranges = [];
                    that.transport.read({
                        data: params,
                        success: proxy(that.success, that),
                        error: proxy(that.error, that)
                    });
                } else {
                    that._dequeueRequest();
                }
            });
        },

        success: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 193);
            var that = this,
                options = that.options;

            that.trigger(REQUESTEND, { response: data, type: "read" });

            data = that.reader.parse(data);

            if (that._handleCustomErrors(data)) {
                that._dequeueRequest();
                return;
            }

            that._pristine = isPlainObject(data) ? $.extend(true, {}, data) : data.slice ? data.slice(0) : data;

            that._total = that.reader.total(data);

            if (that._aggregate && options.serverAggregates) {
                that._aggregateResult = that.reader.aggregates(data);
            }

            data = that._readData(data);

            that._pristineData = data.slice(0);

            that._data = that._observe(data);

            that._addRange(that._data);

            that._process(that._data);
            that._dequeueRequest();
        },

        _addRange: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 194);
            var that = this,
                start = that._skip || 0,
                end = start + that._flatData(data).length;

            that._ranges.push({ start: start, end: end, data: data });
            that._ranges.sort( function(x, y) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 195); return x.start - y.start; } );
        },

        error: function(xhr, status, errorThrown) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 196);
            this._dequeueRequest();
            this.trigger(REQUESTEND, { });
            this.trigger(ERROR, { xhr: xhr, status: status, errorThrown: errorThrown });
        },

        _params: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 197);
            var that = this,
                options =  extend({
                    take: that.take(),
                    skip: that.skip(),
                    page: that.page(),
                    pageSize: that.pageSize(),
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                }, data);

            if (!that.options.serverPaging) {
                delete options.take;
                delete options.skip;
                delete options.page;
                delete options.pageSize;
            }

            if (!that.options.serverGrouping) {
                delete options.group;
            } else if (that.reader.model && options.group) {
                options.group = convertDescriptorsField(options.group, that.reader.model);
            }

            if (!that.options.serverFiltering) {
                delete options.filter;
            } else if (that.reader.model && options.filter) {
               options.filter = convertFilterDescriptorsField(options.filter, that.reader.model);
            }

            if (!that.options.serverSorting) {
                delete options.sort;
            } else if (that.reader.model && options.sort) {
                options.sort = convertDescriptorsField(options.sort, that.reader.model);
            }

            if (!that.options.serverAggregates) {
                delete options.aggregate;
            } else if (that.reader.model && options.aggregate) {
                options.aggregate = convertDescriptorsField(options.aggregate, that.reader.model);
            }

            return options;
        },

        _queueRequest: function(options, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 198);
            var that = this;
            if (!that._requestInProgress) {
                that._requestInProgress = true;
                that._pending = undefined;
                callback();
            } else {
                that._pending = { callback: proxy(callback, that), options: options };
            }
        },

        _dequeueRequest: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 199);
            var that = this;
            that._requestInProgress = false;
            if (that._pending) {
                that._queueRequest(that._pending.options, that._pending.callback);
            }
        },

        _handleCustomErrors: function(response) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 200);
            if (this.reader.errors) {
                var errors = this.reader.errors(response);
                if (errors) {
                    this.trigger(ERROR, { xhr: null, status: "customerror", errorThrown: "custom error", errors: errors });
                    return true;
                }
            }
            return false;
        },
        _observe: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 201);
            var that = this,
                model = that.reader.model,
                wrap = false;

            if (model && data.length) {
                wrap = !(data[0] instanceof model);
            }

            if (data instanceof ObservableArray) {
                if (wrap) {
                    data.type = that.reader.model;
                    data.wrapAll(data, data);
                }
            } else {
                data = new ObservableArray(data, that.reader.model);
                data.parent = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 202); return that.parent(); };
            }

            if (that._isServerGrouped()) {
                wrapGroupItems(data, model);
            }

            if (that._changeHandler && that._data && that._data instanceof ObservableArray) {
                that._data.unbind(CHANGE, that._changeHandler);
            } else {
                that._changeHandler = proxy(that._change, that);
            }

            return data.bind(CHANGE, that._changeHandler);
        },

        _change: function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 203);
            var that = this, idx, length, action = e ? e.action : "";

            if (action === "remove") {
                for (idx = 0, length = e.items.length; idx < length; idx++) {
                    if (!e.items[idx].isNew || !e.items[idx].isNew()) {
                        that._destroyed.push(e.items[idx]);
                    }
                }
            }

            if (that.options.autoSync && (action === "add" || action === "remove" || action === "itemchange")) {
                that.sync();
            } else {
                var total = parseInt(that._total || that.reader.total(that._pristine), 10);
                if (action === "add") {
                    total += e.items.length;
                } else if (action === "remove") {
                    total -= e.items.length;
                } else if (action !== "itemchange" && action !== "sync" && !that.options.serverPaging) {
                    total = that.reader.total(that._pristine);
                }

                that._total = total;

                that._process(that._data, e);
            }
        },

        _process: function (data, e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 204);
            var that = this,
                options = {},
                result;

            if (that.options.serverPaging !== true) {
                options.skip = that._skip;
                options.take = that._take || that._pageSize;

                if(options.skip === undefined && that._page !== undefined && that._pageSize !== undefined) {
                    options.skip = (that._page - 1) * that._pageSize;
                }
            }

            if (that.options.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.options.serverFiltering !== true) {
                options.filter = that._filter;
            }

            if (that.options.serverGrouping !== true) {
                options.group = that._group;
            }

            if (that.options.serverAggregates !== true) {
                options.aggregate = that._aggregate;
                that._aggregateResult = calculateAggregates(data, options);
            }

            result = Query.process(data, options);

            that._view = result.data;

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            e = e || {};

            e.items = e.items || that._view;

            that.trigger(CHANGE, e);
        },

        _mergeState: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 205);
            var that = this;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregate = options.aggregate;
                that._skip = options.skip;
                that._take = options.take;

                if(that._skip === undefined) {
                    that._skip = that.skip();
                    options.skip = that.skip();
                }

                if(that._take === undefined && that._pageSize !== undefined) {
                    that._take = that._pageSize;
                    options.take = that._take;
                }

                if (options.sort) {
                    that._sort = options.sort = normalizeSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = normalizeFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = normalizeGroup(options.group);
                }
                if (options.aggregate) {
                    that._aggregate = options.aggregate = normalizeAggregate(options.aggregate);
                }
            }
            return options;
        },

        query: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 206);
            var that = this,
                result,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering || that.options.serverGrouping || that.options.serverAggregates;

            if (remote || ((that._data === undefined || that._data.length === 0) && !that._destroyed.length)) {
                that.read(that._mergeState(options));
            } else {
                if (!that.trigger(REQUESTSTART, { type: "read" })) {
                    that.trigger(PROGRESS);

                    result = Query.process(that._data, that._mergeState(options));

                    if (!that.options.serverFiltering) {
                        if (result.total !== undefined) {
                            that._total = result.total;
                        } else {
                            that._total = that._data.length;
                        }
                    }

                    that._view = result.data;
                    that._aggregateResult = calculateAggregates(that._data, options);
                    that.trigger(REQUESTEND, { });
                    that.trigger(CHANGE, { items: result.data });
                }
            }
        },

        fetch: function(callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 207);
            var that = this;

            return $.Deferred(function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 208);}).promise();
        },

        _query: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 209);
            var that = this;

            that.query(extend({}, {
                page: that.page(),
                pageSize: that.pageSize(),
                sort: that.sort(),
                filter: that.filter(),
                group: that.group(),
                aggregate: that.aggregate()
            }, options));
        },

        next: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 210);},

        prev: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 211);},

        page: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 212);
            var that = this,
            skip;

            if(val !== undefined) {
                val = math.max(math.min(math.max(val, 1), that.totalPages()), 1);
                that._query({ page: val });
                return;
            }
            skip = that.skip();

            return skip !== undefined ? math.round((skip || 0) / (that.take() || 1)) + 1 : undefined;
        },

        pageSize: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 213);
            var that = this;

            if(val !== undefined) {
                that._query({ pageSize: val, page: 1 });
                return;
            }

            return that.take();
        },

        sort: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 214);
            var that = this;

            if(val !== undefined) {
                that._query({ sort: val });
                return;
            }

            return that._sort;
        },

        filter: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 215);
            var that = this;

            if (val === undefined) {
                return that._filter;
            }

            that._query({ filter: val, page: 1 });
        },

        group: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 216);
            var that = this;

            if(val !== undefined) {
                that._query({ group: val });
                return;
            }

            return that._group;
        },

        total: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 217);
            return parseInt(this._total || 0, 10);
        },

        aggregate: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 218);
            var that = this;

            if(val !== undefined) {
                that._query({ aggregate: val });
                return;
            }

            return that._aggregate;
        },

        aggregates: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 219);
            return this._aggregateResult;
        },

        totalPages: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 220);
            var that = this,
            pageSize = that.pageSize() || that.total();

            return math.ceil((that.total() || 0) / pageSize);
        },

        inRange: function(skip, take) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 221);
            var that = this,
            end = math.min(skip + take, that.total());

            if (!that.options.serverPaging && that.data.length > 0) {
                return true;
            }

            return that._findRange(skip, end).length > 0;
        },

        lastRange: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 222);
            var ranges = this._ranges;
            return ranges[ranges.length - 1] || { start: 0, end: 0, data: [] };
        },

        firstItemUid: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 223);
            var ranges = this._ranges;
            return ranges.length && ranges[0].data.length && ranges[0].data[0].uid;
        },

        range: function(skip, take) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 224);
            skip = math.min(skip || 0, this.total());
            var that = this,
            pageSkip = math.max(math.floor(skip / take), 0) * take,
            size = math.min(pageSkip + take, that.total()),
            data;

            data = that._findRange(skip, math.min(skip + take, that.total()));

            if (data.length) {
                that._skip = skip > that.skip() ? math.min(size, (that.totalPages() - 1) * that.take()) : pageSkip;

                that._take = take;

                var paging = that.options.serverPaging;
                var sorting = that.options.serverSorting;
                var filtering = that.options.serverFiltering;
                try {
                    that.options.serverPaging = true;
                    if (!that._isServerGrouped() && !(that.group() && that.group().length)) {
                        that.options.serverSorting = true;
                    }
                    that.options.serverFiltering = true;
                    if (paging) {
                        that._data = data = that._observe(data);
                    }
                    that._process(data);
                } finally {
                    that.options.serverPaging = paging;
                    that.options.serverSorting = sorting;
                    that.options.serverFiltering = filtering;
                }

                return;
            }

            if (take !== undefined) {
                if (!that._rangeExists(pageSkip, size)) {
                    that.prefetch(pageSkip, take, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 225);
                        if (skip > pageSkip && size < that.total() && !that._rangeExists(size, math.min(size + take, that.total()))) {
                            that.prefetch(size, take, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 226);
                                that.range(skip, take);
                            });
                        } else {
                            that.range(skip, take);
                        }
                    });
                } else if (pageSkip < skip) {
                    that.prefetch(size, take, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 227);
                        that.range(skip, take);
                    });
                }
            }
        },

        _findRange: function(start, end) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 228);
            var that = this,
                ranges = that._ranges,
                range,
                data = [],
                skipIdx,
                takeIdx,
                startIndex,
                endIndex,
                rangeData,
                rangeEnd,
                processed,
                options = that.options,
                remote = options.serverSorting || options.serverPaging || options.serverFiltering || options.serverGrouping || options.serverAggregates,
                flatData,
                count,
                length;

            for (skipIdx = 0, length = ranges.length; skipIdx < length; skipIdx++) {
                range = ranges[skipIdx];
                if (start >= range.start && start <= range.end) {
                    count = 0;

                    for (takeIdx = skipIdx; takeIdx < length; takeIdx++) {
                        range = ranges[takeIdx];
                        flatData = that._flatData(range.data);

                        if (flatData.length && start + count >= range.start) {
                            rangeData = range.data;
                            rangeEnd = range.end;

                            if (!remote) {
                                var sort = normalizeGroup(that.group() || []).concat(normalizeSort(that.sort() || []));
                                processed = Query.process(range.data, { sort: sort, filter: that.filter() });
                                flatData = rangeData = processed.data;

                                if (processed.total !== undefined) {
                                    rangeEnd = processed.total;
                                }
                            }

                            startIndex = 0;
                            if (start + count > range.start) {
                                startIndex = (start + count) - range.start;
                            }
                            endIndex = flatData.length;
                            if (rangeEnd > end) {
                                endIndex = endIndex - (rangeEnd - end);
                            }
                            count += endIndex - startIndex;
                            data = that._mergeGroups(data, rangeData, startIndex, endIndex);

                            if (end <= range.end && count == end - start) {
                                return data;
                            }
                        }
                    }
                    break;
                }
            }
            return [];
        },

        _mergeGroups: function(data, range, startIndex, endIndex) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 229);
            if (this._isServerGrouped()) {
                var temp = range.toJSON(),
                    prevGroup;

                if (data.length) {
                    prevGroup = data[data.length - 1];
                }

                mergeGroups(prevGroup, temp, startIndex, endIndex);

                return data.concat(temp);
            }
            return data.concat(range.slice(startIndex, endIndex));
        },

        skip: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 230);
            var that = this;

            if (that._skip === undefined) {
                return (that._page !== undefined ? (that._page  - 1) * (that.take() || 1) : undefined);
            }
            return that._skip;
        },

        take: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 231);
            return this._take || this._pageSize;
        },

        _prefetchSuccessHandler: function (skip, size, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 232);
            var that = this;
            return function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 233);
                var found = false,
                    range = { start: skip, end: size, data: [] },
                    idx,
                    length;

                that._dequeueRequest();

                for (idx = 0, length = that._ranges.length; idx < length; idx++) {
                    if (that._ranges[idx].start === skip) {
                        found = true;
                        range = that._ranges[idx];
                        break;
                    }
                }
                if (!found) {
                    that._ranges.push(range);
                }


                that.trigger(REQUESTEND, { response: data, type: "read" });

                data = that.reader.parse(data);
                range.data = that._observe(that._readData(data));
                range.end = range.start + that._flatData(range.data).length;
                that._ranges.sort( function(x, y) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 234); return x.start - y.start; } );
                that._total = that.reader.total(data);
                if (callback) {
                    callback();
                }
            };
        },

        prefetch: function(skip, take, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 235);
            var that = this,
                size = math.min(skip + take, that.total()),
                options = {
                    take: take,
                    skip: skip,
                    page: skip / take + 1,
                    pageSize: take,
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                };

            if (!that._rangeExists(skip, size)) {
                clearTimeout(that._timeout);

                that._timeout = setTimeout(function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 236);
                    that._queueRequest(options, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 237);
                        if (!that.trigger(REQUESTSTART, { type: "read" })) {
                            that.transport.read({
                                data: that._params(options),
                                success: that._prefetchSuccessHandler(skip, size, callback)
                            });
                        } else {
                            that._dequeueRequest();
                        }
                    });
                }, 100);
            } else if (callback) {
                callback();
            }
        },

        _rangeExists: function(start, end) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 238);
            var that = this,
            ranges = that._ranges,
            idx,
            length;

            for (idx = 0, length = ranges.length; idx < length; idx++) {
                if (ranges[idx].start <= start && ranges[idx].end >= end) {
                    return true;
                }
            }
            return false;
        }
    });

    var Transport = {};

    Transport.create = function(options, data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 239);
        var transport,
            transportOptions = options.transport;

        if (transportOptions) {
            transportOptions.read = typeof transportOptions.read === STRING ? { url: transportOptions.read } : transportOptions.read;

            if (options.type) {
                if (kendo.data.transports[options.type] && !isPlainObject(kendo.data.transports[options.type])) {
                    transport = new kendo.data.transports[options.type](extend(transportOptions, { data: data }));
                } else {
                    transportOptions = extend(true, {}, kendo.data.transports[options.type], transportOptions);
                }

                options.schema = extend(true, {}, kendo.data.schemas[options.type], options.schema);
            }

            if (!transport) {
                transport = isFunction(transportOptions.read) ? transportOptions : new RemoteTransport(transportOptions);
            }
        } else {
            transport = new LocalTransport({ data: options.data });
        }
        return transport;
    };

    DataSource.create = function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 240);
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
        data = dataSource.data,
        fields = dataSource.fields,
        table = dataSource.table,
        select = dataSource.select,
        idx,
        length,
        model = {},
        field;

        if (!data && fields && !dataSource.transport) {
            if (table) {
                data = inferTable(table, fields);
            } else if (select) {
                data = inferSelect(select, fields);
            }
        }

        if (kendo.data.Model && fields && (!dataSource.schema || !dataSource.schema.model)) {
            for (idx = 0, length = fields.length; idx < length; idx++) {
                field = fields[idx];
                if (field.type) {
                    model[field.field] = field;
                }
            }

            if (!isEmptyObject(model)) {
                dataSource.schema = extend(true, dataSource.schema, { model:  { fields: model } });
            }
        }

        dataSource.data = data;

        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    };

    function inferSelect(select, fields) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 241);
        var options = $(select)[0].children,
            idx,
            length,
            data = [],
            record,
            firstField = fields[0],
            secondField = fields[1],
            value,
            option;

        for (idx = 0, length = options.length; idx < length; idx++) {
            record = {};
            option = options[idx];

            if (option.disabled) {
                continue;
            }

            record[firstField.field] = option.text;

            value = option.attributes.value;

            if (value && value.specified) {
                value = option.value;
            } else {
                value = option.text;
            }

            record[secondField.field] = value;

            data.push(record);
        }

        return data;
    }

    function inferTable(table, fields) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 242);
        var tbody = $(table)[0].tBodies[0],
        rows = tbody ? tbody.rows : [],
        idx,
        length,
        fieldIndex,
        fieldCount = fields.length,
        data = [],
        cells,
        record,
        cell,
        empty;

        for (idx = 0, length = rows.length; idx < length; idx++) {
            record = {};
            empty = true;
            cells = rows[idx].cells;

            for (fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
                cell = cells[fieldIndex];
                if(cell.nodeName.toLowerCase() !== "th") {
                    empty = false;
                    record[fields[fieldIndex].field] = cell.innerHTML;
                }
            }
            if(!empty) {
                data.push(record);
            }
        }

        return data;
    }

    var Node = Model.define({
        init: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 243);
            var that = this,
                hasChildren = that.hasChildren || value && value.hasChildren,
                childrenField = "items",
                childrenOptions = {};

            kendo.data.Model.fn.init.call(that, value);

            if (typeof that.children === STRING) {
                childrenField = that.children;
            }

            childrenOptions = {
                schema: {
                    data: childrenField,
                    model: {
                        hasChildren: hasChildren,
                        id: that.idField
                    }
                }
            };

            if (typeof that.children !== STRING) {
                extend(childrenOptions, that.children);
            }

            childrenOptions.data = value;

            if (!hasChildren) {
                hasChildren = childrenOptions.schema.data;
            }

            if (typeof hasChildren === STRING) {
                hasChildren = kendo.getter(hasChildren);
            }

            if (isFunction(hasChildren)) {
                that.hasChildren = !!hasChildren.call(that, that);
            }

            that._childrenOptions = childrenOptions;

            if (that.hasChildren) {
                that._initChildren();
            }

            that._loaded = !!(value && (value[childrenField] || value._loaded));
        },

        _initChildren: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 244);
            var that = this;
            var children, transport, parameterMap;

            if (!(that.children instanceof HierarchicalDataSource)) {
                children = that.children = new HierarchicalDataSource(that._childrenOptions);

                transport = children.transport;
                parameterMap = transport.parameterMap;

                transport.parameterMap = function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 245);
                    data[that.idField || "id"] = that.id;

                    if (parameterMap) {
                        data = parameterMap(data);
                    }

                    return data;
                };

                children.parent = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 246);
                    return that;
                };

                children.bind(CHANGE, function(e){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 247);
                    e.node = e.node || that;
                    that.trigger(CHANGE, e);
                });

                children.bind(ERROR, function(e){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 248);
                    var collection = that.parent();

                    if (collection) {
                        e.node = e.node || that;
                        collection.trigger(ERROR, e);
                    }
                });

                that._updateChildrenField();
            }
        },

        append: function(model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 249);
            this._initChildren();
            this.loaded(true);
            this.children.add(model);
        },

        hasChildren: false,

        level: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 250);},

        _updateChildrenField: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 251);
            var fieldName = this._childrenOptions.schema.data;

            this[fieldName || "items"] = this.children.data();
        },

        load: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 252);
            var that = this,
                options = {};

            if (that.hasChildren) {
                that._initChildren();

                options[that.idField || "id"] = that.id;

                if (!that._loaded) {
                    that.children._data = undefined;
                }

                that.children.one(CHANGE, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 253);
                            that._loaded = true;

                            that._updateChildrenField();
                        })
                        ._query(options);
            } else {
                that.loaded(true);
            }
        },

        parentNode: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 254);
            var array = this.parent();

            return array.parent();
        },

        loaded: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 255);
            if (value !== undefined) {
                this._loaded = value;
            } else {
                return this._loaded;
            }
        },

        shouldSerialize: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 256);
            return Model.fn.shouldSerialize.call(this, field) &&
                    field !== "children" &&
                    field !== "_loaded" &&
                    field !== "hasChildren" &&
                    field !== "_childrenOptions";
        }
    });

    function dataMethod(name) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 257);
        return function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 258);
            var data = this._data,
                result = DataSource.fn[name].apply(this, slice.call(arguments));

            if (this._data != data) {
                this._attachBubbleHandlers();
            }

            return result;
        };
    }

    var HierarchicalDataSource = DataSource.extend({
        init: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 259);
            var node = Node.define({
                children: options
            });

            DataSource.fn.init.call(this, extend(true, {}, { schema: { modelBase: node, model: node } }, options));

            this._attachBubbleHandlers();
        },

        _attachBubbleHandlers: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 260);
            var that = this;

            that._data.bind(ERROR, function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 261);
                that.trigger(ERROR, e);
            });
        },

        remove: function(node){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 262);
            var parentNode = node.parentNode(),
                dataSource = this,
                result;

            if (parentNode && parentNode._initChildren) {
                dataSource = parentNode.children;
            }

            result = DataSource.fn.remove.call(dataSource, node);

            if (parentNode && !dataSource.data().length) {
                parentNode.hasChildren = false;
            }

            return result;
        },

        success: dataMethod("success"),

        data: dataMethod("data"),

        insert: function(index, model) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 263);
            var parentNode = this.parent();

            if (parentNode && parentNode._initChildren) {
                parentNode.hasChildren = true;
                parentNode._initChildren();
            }

            return DataSource.fn.insert.call(this, index, model);
        },

        _find: function(method, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 264);
            var idx, length, node, data, children;

            node = DataSource.fn[method].call(this, value);

            if (node) {
                return node;
            }

            data = this._flatData(this.data());

            if (!data) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                children = data[idx].children;

                if (!(children instanceof HierarchicalDataSource)) {
                    continue;
                }

                node = children[method](value);

                if (node) {
                    return node;
                }
            }
        },

        get: function(id) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 265);
            return this._find("get", id);
        },

        getByUid: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 266);}
    });

    function inferList(list, fields) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 267);
        var items = $(list).children(),
            idx,
            length,
            data = [],
            record,
            textField = fields[0].field,
            urlField = fields[1] && fields[1].field,
            spriteCssClassField = fields[2] && fields[2].field,
            imageUrlField = fields[3] && fields[3].field,
            item,
            id,
            textChild,
            className,
            children;

        function elements(collection, tagName) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 268);
            return collection.filter(tagName).add(collection.find(tagName));
        }

        for (idx = 0, length = items.length; idx < length; idx++) {
            record = { _loaded: true };
            item = items.eq(idx);

            textChild = item[0].firstChild;
            children = item.children();
            list = children.filter("ul");
            children = children.filter(":not(ul)");

            id = item.attr("data-id");

            if (id) {
                record.id = id;
            }

            if (textChild) {
                record[textField] = textChild.nodeType == 3 ? textChild.nodeValue : children.text();
            }

            if (urlField) {
                record[urlField] = elements(children, "a").attr("href");
            }

            if (imageUrlField) {
                record[imageUrlField] = elements(children, "img").attr("src");
            }

            if (spriteCssClassField) {
                className = elements(children, ".k-sprite").prop("className");
                record[spriteCssClassField] = className && $.trim(className.replace("k-sprite", ""));
            }

            if (list.length) {
                record.items = inferList(list.eq(0), fields);
            }

            if (item.attr("data-hasChildren") == "true") {
                record.hasChildren = true;
            }

            data.push(record);
        }

        return data;
    }

    HierarchicalDataSource.create = function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 269);
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            list = dataSource.list;

        if (data && data._dataSource) {
            return data._dataSource;
        }

        if (!data && fields && !dataSource.transport) {
            if (list) {
                data = inferList(list, fields);
            }
        }

        dataSource.data = data;

        return dataSource instanceof HierarchicalDataSource ? dataSource : new HierarchicalDataSource(dataSource);
    };

    var Buffer = kendo.Observable.extend({
        init: function(dataSource, viewSize, disablePrefetch) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 270);
            kendo.Observable.fn.init.call(this);

            this._prefetching = false;
            this.dataSource = dataSource;
            this.prefetch = !disablePrefetch;

            var buffer = this;

            dataSource.bind("change", function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 271);
                buffer._change();
            });

            this._syncWithDataSource();

            this.setViewSize(viewSize);
        },

        setViewSize: function(viewSize) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 272);
            this.viewSize = viewSize;
            this._recalculate();
        },

        at: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 273);},

        indexOf: function(item) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 274);
            return this.dataSource.data().indexOf(item) + this.dataOffset;
        },

        total: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 275);
            return parseInt(this.dataSource.total(), 10);
        },

        next: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 276);},

        range: function(offset) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 277);
            if (this.offset === offset) {
                return;
            }

            var buffer = this,
                pageSize = this.pageSize,
                pageSkip = math.max(math.floor(offset / pageSize), 0) * pageSize + pageSize,
                dataSource = this.dataSource;

            this.offset = offset;
            this._recalculate();
            if (dataSource.inRange(offset, pageSize)) {
                this._goToRange(offset);
            } else if (this.prefetch) {
                dataSource.prefetch(pageSkip, pageSize, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 278);
                    buffer._goToRange(offset, true);
                });
            }
        },

        syncDataSource: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 279);},

        destroy: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 280);
            this.unbind();
        },

        _prefetch: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 281);},

        _goToRange: function(offset, expanding) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 282);
            if (this.offset !== offset) {
                return;
            }

            this.dataOffset = offset;
            this._expanding = expanding;
            this.dataSource.range(offset, this.pageSize);
        },

        _change: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 283);
            var dataSource = this.dataSource,
                firstItemUid = dataSource.firstItemUid();

            this.length = this.useRanges ? dataSource.lastRange().end : dataSource.view().length;

            if (this._firstItemUid !== firstItemUid || !this.useRanges) {
                this._syncWithDataSource();
                this._recalculate();
                this.trigger("reset", { offset: this.offset });
            }

            this.trigger("resize");

            if (this._expanding) {
                this.trigger("expand");
            }

            delete this._expanding;
        },

        _syncWithDataSource: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 284);
            var dataSource = this.dataSource;

            this._firstItemUid = dataSource.firstItemUid();
            this.dataOffset = this.offset = dataSource.skip() || 0;
            this.pageSize = dataSource.pageSize();
            this.useRanges = dataSource.options.serverPaging;
        },

        _recalculate: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 285);
            var pageSize = this.pageSize,
                offset = this.offset,
                viewSize = this.viewSize,
                skip = Math.ceil(offset / pageSize) * pageSize;

            this.skip = skip;
            this.midPageThreshold = skip + pageSize - 1;
            this.nextPageThreshold = skip + viewSize - 1;
            this.prefetchThreshold = skip + Math.floor(pageSize / 3 * 2);
            this.pullBackThreshold = this.offset - 1;

            this.nextMidRange = skip + pageSize - viewSize;
            this.nextFullRange = skip;
            this.previousMidRange = offset - viewSize;
            this.previousFullRange = skip - pageSize;
        }
    });

    var BatchBuffer = kendo.Observable.extend({
        init: function(dataSource, batchSize) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 286);
            var batchBuffer = this;

            kendo.Observable.fn.init.call(batchBuffer);

            this.dataSource = dataSource;
            this.batchSize = batchSize;
            this._total = 0;

            this.buffer = new Buffer(dataSource, batchSize * 3);

            this.buffer.bind({
                "endreached": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 287);},
                "prefetching": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 288);},
                "prefetched": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 289);},
                "reset": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 290);},
                "resize": function () {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 291);
                    batchBuffer._total = Math.ceil(this.length / batchBuffer.batchSize);
                    batchBuffer.trigger("resize", { total: batchBuffer.total(), offset: this.offset });
                }
            });
        },

        syncDataSource: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 292);},

        at: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 293);},

        total: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 294);
            return this._total;
        },

        destroy: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 295);
            this.buffer.destroy();
            this.unbind();
        }
    });

    extend(true, kendo.data, {
        readers: {
            json: DataReader
        },
        Query: Query,
        DataSource: DataSource,
        HierarchicalDataSource: HierarchicalDataSource,
        Node: Node,
        ObservableObject: ObservableObject,
        ObservableArray: ObservableArray,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        Cache: Cache,
        DataReader: DataReader,
        Model: Model,
        Buffer: Buffer,
        BatchBuffer: BatchBuffer
    });
})(window.kendo.jQuery);
