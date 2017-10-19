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

        toJSON: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 3);},

        parent: noop,

        wrapAll: function(source, target) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 4);
            var that = this,
                idx,
                length,
                parent = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 5);};

            target = target || [];

            for (idx = 0, length = source.length; idx < length; idx++) {
                target[idx] = that.wrap(source[idx], parent);
            }

            return target;
        },

        wrap: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 6);},

        push: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 7);},

        slice: slice,

        join: join,

        pop: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 8);},

        splice: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 9);},

        shift: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 10);},

        unshift: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 11);},

        indexOf: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 12);},

        forEach: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 13);},

        map: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 14);},

        filter: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 15);},

        find: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 16);},

        every: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 17);},

        some: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 18);},

        // non-standard collection methods
        remove: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 19);},

        empty: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 20);}
    });

    function eventHandler(context, type, field, prefix) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 21);
        return function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 22);
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
        init: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 23);
            var that = this,
                member,
                field,
                parent = function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 24);
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

        shouldSerialize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 25);},

        forEach: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 26);},

        toJSON: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 27);},

        get: function(field) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 28);
            var that = this, result;

            that.trigger(GET, { field: field });

            if (field === "this") {
                result = that;
            } else {
                result = kendo.getter(field, true)(that);
            }

            return result;
        },

        _set: function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 29);
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

        set: function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 30);
            var that = this,
                current = kendo.getter(field, true)(that);

            if (current !== value) {

                if (!that.trigger("set", { field: field, value: value })) {
                    if (!that._set(field, that.wrap(value, field, function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 31);})) || field.indexOf("(") >= 0 || field.indexOf("[") >= 0) {
                        that.trigger(CHANGE, { field: field });
                    }
                }
            }
        },

        parent: noop,

        wrap: function(object, field, parent) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 32);
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

    function equal(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 33);}

    var parsers = {
        "number": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 34);},

        "date": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 35);},

        "boolean": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 36);},

        "string": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 37);},

        "default": function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 38);}
    };

    var defaultValues = {
        "string": "",
        "number": 0,
        "date": new Date(),
        "boolean": false,
        "default": ""
    };

    function getFieldByName(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 39);}

    var Model = ObservableObject.extend({
        init: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 40);
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

        shouldSerialize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 41);},

        _parse: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 42);},

        _notifyChange: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 43);},

        editable: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 44);},

        set: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 45);},

        accept: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 46);},

        isNew: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 47);}
    });

    Model.define = function(base, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 48);
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
        model.define = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 49);};

        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }

        return model;
    };

    var Comparer = {
        selector: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 50);},

        compare: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 51);},

        create: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 52);},

        combine: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 53);}
    };

    var StableComparer = extend({}, Comparer, {
        asc: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 54);},

        desc: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 55);},
        create: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 56);}
    });

    map = function (array, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 57);
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = callback(array[idx], idx, array);
        }

        return result;
    };

    var operators = (function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 58);

        function quote(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 59);}

        function operator(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 60);}

        return {
            eq: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 61);},
            neq: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 62);},
            gt: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 63);},
            gte: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 64);},
            lt: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 65);},
            lte: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 66);},
            startswith: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 67);},
            endswith: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 68);},
            contains: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 69);},
            doesnotcontain: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 70);}
        };
    })();

    function Query(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 71);
        this.data = data || [];
    }

    Query.filterExpr = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 72);};

    function normalizeSort(field, dir) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 73);
        if (field) {
            var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
            descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

            return grep(descriptors, function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 74);});
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

    function normalizeOperator(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 75);}

    function normalizeFilter(expression) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 76);
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

    function normalizeAggregate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 77);}

    function normalizeGroup(field, dir) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 78);
        var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
        descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 79);});
    }

    Query.prototype = {
        toArray: function () {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 80);
            return this.data;
        },
        range: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 81);},
        skip: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 82);},
        take: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 83);},
        select: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 84);},
        order: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 85);},
        orderBy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 86);},
        orderByDescending: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 87);},
        sort: function(field, dir, comparer) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 88);
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

        filter: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 89);},

        group: function(descriptors, allData) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 90);
            descriptors =  normalizeGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
            result = new Query(that.data),
            descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 91);});
            }
            return result;
        },

        groupBy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 92);},

        _sortForGrouping: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 93);},

        aggregate: function (aggregates) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 94);
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

    function groupValueComparer(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 95);}

    function calculateAggregate(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 96);}

    var functions = {
        sum: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 97);},
        count: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 98);},
        average: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 99);},
        max: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 100);},
        min: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 101);}
    };

    function isNumber(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 102);}

    function toJSON(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 103);}

    Query.process = function(data, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 104);
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

    function calculateAggregates(data, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 105);
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
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 106);},

        read: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 107);},
        update: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 108);},
        create: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 109);},
        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 110);}
    });

    var RemoteTransport = Class.extend( {
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 111);},

        options: {
            parameterMap: identity
        },

        create: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 112);},

        read: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 113);},

        update: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 114);},

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 115);},

        setup: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 116);}
    });

    var Cache = Class.extend({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 117);},
        add: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 118);},
        find: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 119);},
        clear: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 120);},
        remove: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 121);}
    });

    Cache.create = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 122);};

    function serializeRecords(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 123);}

    function convertRecords(data, getters, modelInstance, originalFieldNames, fieldNames) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 124);
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

    function convertGroup(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 125);}

    function wrapDataAccess(originalFunction, model, converter, getters, originalFieldNames, fieldNames) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 126);
        return function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 127);
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
        init: function(schema) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 128);
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
                    each(model.fields, function(field, value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 129);
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
        errors: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 130);
            return data ? data.errors : null;
        },
        parse: identity,
        data: identity,
        total: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 131);
            return data.length;
        },
        groups: identity,
        aggregates: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 132);},
        serialize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 133);}
    });

    function mergeGroups(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 134);}

    function flattenGroups(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 135);}

    function wrapGroupItems(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 136);}

    function eachGroupItems(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 137);}

    function removeModel(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 138);}

    function wrapInEmptyGroup(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 139);}

    function indexOfPristineModel(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 140);}

    function indexOfModel(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 141);}

    function indexOf(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 142);}

    function fieldNameFromModel(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 143);}

    function convertFilterDescriptorsField(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 144);}

    function convertDescriptorsField(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 145);}

    var DataSource = Observable.extend({
        init: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 146);
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

        _isServerGrouped: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 147);
            var group = this.group() || [];

            return this.options.serverGrouping && group.length;
        },

        _flatData: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 148);
            if (this._isServerGrouped()) {
                return flattenGroups(data);
            }
            return data;
        },

        parent: noop,

        get: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 149);},

        getByUid: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 150);},

        indexOf: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 151);},

        at: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 152);},

        data: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 153);
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

        view: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 154);
            return this._view;
        },

        add: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 155);},

        _createNewModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 156);},

        insert: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 157);},

        remove: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 158);},

        sync: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 159);},

        cancelChanges: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 160);},

        hasChanges: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 161);},

        _accept: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 162);},

        _updatePristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 163);},

        _executeOnPristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 164);},

        _removePristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 165);},

        _readData: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 166);
            var read = !this._isServerGrouped() ? this.reader.data : this.reader.groups;
            return read(data);
        },

        _eachPristineItem: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 167);},

       _eachItem: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 168);},

        _pristineForModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 169);},

        _cancelModel: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 170);},

        _promise: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 171);},

        _send: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 172);},

        read: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 173);
            var that = this, params = that._params(data);

            that._queueRequest(params, function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 174);
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

        success: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 175);
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

        _addRange: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 176);
            var that = this,
                start = that._skip || 0,
                end = start + that._flatData(data).length;

            that._ranges.push({ start: start, end: end, data: data });
            that._ranges.sort( function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 177);} );
        },

        error: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 178);},

        _params: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 179);
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

        _queueRequest: function(options, callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 180);
            var that = this;
            if (!that._requestInProgress) {
                that._requestInProgress = true;
                that._pending = undefined;
                callback();
            } else {
                that._pending = { callback: proxy(callback, that), options: options };
            }
        },

        _dequeueRequest: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 181);
            var that = this;
            that._requestInProgress = false;
            if (that._pending) {
                that._queueRequest(that._pending.options, that._pending.callback);
            }
        },

        _handleCustomErrors: function(response) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 182);
            if (this.reader.errors) {
                var errors = this.reader.errors(response);
                if (errors) {
                    this.trigger(ERROR, { xhr: null, status: "customerror", errorThrown: "custom error", errors: errors });
                    return true;
                }
            }
            return false;
        },
        _observe: function(data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 183);
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
                data.parent = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 184);};
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

        _change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 185);},

        _process: function (data, e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 186);
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

        _mergeState: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 187);
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

        query: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 188);
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

        fetch: function(callback) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 189);
            var that = this;

            return $.Deferred(function(deferred) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 190);
                var success = function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 191);
                    that.unbind(ERROR, error);

                    deferred.resolve();

                    if (callback) {
                        callback.call(that, e);
                    }
                };

                var error = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 192);};

                that.one(CHANGE, success);
                that.one(ERROR, error);
                that._query();
            }).promise();
        },

        _query: function(options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 193);
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

        next: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 194);},

        prev: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 195);},

        page: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 196);
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

        pageSize: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 197);
            var that = this;

            if(val !== undefined) {
                that._query({ pageSize: val, page: 1 });
                return;
            }

            return that.take();
        },

        sort: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 198);
            var that = this;

            if(val !== undefined) {
                that._query({ sort: val });
                return;
            }

            return that._sort;
        },

        filter: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 199);
            var that = this;

            if (val === undefined) {
                return that._filter;
            }

            that._query({ filter: val, page: 1 });
        },

        group: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 200);
            var that = this;

            if(val !== undefined) {
                that._query({ group: val });
                return;
            }

            return that._group;
        },

        total: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 201);},

        aggregate: function(val) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 202);
            var that = this;

            if(val !== undefined) {
                that._query({ aggregate: val });
                return;
            }

            return that._aggregate;
        },

        aggregates: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 203);},

        totalPages: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 204);},

        inRange: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 205);},

        lastRange: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 206);},

        firstItemUid: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 207);},

        range: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 208);},

        _findRange: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 209);},

        _mergeGroups: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 210);},

        skip: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 211);
            var that = this;

            if (that._skip === undefined) {
                return (that._page !== undefined ? (that._page  - 1) * (that.take() || 1) : undefined);
            }
            return that._skip;
        },

        take: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 212);
            return this._take || this._pageSize;
        },

        _prefetchSuccessHandler: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 213);},

        prefetch: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 214);},

        _rangeExists: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 215);}
    });

    var Transport = {};

    Transport.create = function(options, data) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 216);
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

    DataSource.create = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 217);};

    function inferSelect(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 218);}

    function inferTable(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 219);}

    var Node = Model.define({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 220);},

        _initChildren: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 221);},

        append: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 222);},

        hasChildren: false,

        level: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 223);},

        _updateChildrenField: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 224);},

        load: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 225);},

        parentNode: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 226);},

        loaded: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 227);},

        shouldSerialize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 228);}
    });

    function dataMethod(name) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 229);
        return function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 230);};
    }

    var HierarchicalDataSource = DataSource.extend({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 231);},

        _attachBubbleHandlers: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 232);},

        remove: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 233);},

        success: dataMethod("success"),

        data: dataMethod("data"),

        insert: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 234);},

        _find: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 235);},

        get: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 236);},

        getByUid: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 237);}
    });

    function inferList(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 238);}

    HierarchicalDataSource.create = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 239);};

    var Buffer = kendo.Observable.extend({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 240);},

        setViewSize: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 241);},

        at: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 242);},

        indexOf: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 243);},

        total: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 244);},

        next: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 245);},

        range: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 246);},

        syncDataSource: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 247);},

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 248);},

        _prefetch: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 249);},

        _goToRange: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 250);},

        _change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 251);},

        _syncWithDataSource: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 252);},

        _recalculate: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 253);}
    });

    var BatchBuffer = kendo.Observable.extend({
        init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 254);},

        syncDataSource: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 255);},

        at: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 256);},

        total: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 257);},

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.data.js", 258);}
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
