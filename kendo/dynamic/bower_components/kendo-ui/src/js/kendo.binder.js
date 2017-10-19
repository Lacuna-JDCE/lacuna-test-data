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
    id: "binder",
    name: "MVVM",
    category: "framework",
    description: "Model View ViewModel (MVVM) is a design pattern which helps developers separate the Model (the data) from the View (the UI).",
    depends: [ "core", "data" ]
});

(function ($, undefined) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 0);
    var kendo = window.kendo,
        Observable = kendo.Observable,
        ObservableObject = kendo.data.ObservableObject,
        ObservableArray = kendo.data.ObservableArray,
        toString = {}.toString,
        binders = {},
        splice = Array.prototype.splice,
        Class = kendo.Class,
        innerText,
        proxy = $.proxy,
        VALUE = "value",
        SOURCE = "source",
        EVENTS = "events",
        CHECKED = "checked",
        CHANGE = "change";

    (function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 1);
        var a = document.createElement("a");
        if (a.innerText !== undefined) {
            innerText = "innerText";
        } else if (a.textContent !== undefined) {
            innerText = "textContent";
        }
    })();

    var Binding = Observable.extend( {
        init: function(parents, path) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 2);
            var that = this;

            Observable.fn.init.call(that);

            that.source = parents[0];
            that.parents = parents;
            that.path = path;
            that.dependencies = {};
            that.dependencies[path] = true;
            that.observable = that.source instanceof Observable;

            that._access = function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 3);
                that.dependencies[e.field] = true;
            };

            if (that.observable) {
                that._change = function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 4);
                    that.change(e);
                };

                that.source.bind(CHANGE, that._change);
            }
        },

        _parents: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 5);},

        change: function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 6);
            var dependency,
                ch,
                field = e.field,
                that = this;

            if (that.path === "this") {
                that.trigger(CHANGE, e);
            } else {
                for (dependency in that.dependencies) {
                    if (dependency.indexOf(field) === 0) {
                       ch = dependency.charAt(field.length);

                       if (!ch || ch === "." || ch === "[") {
                            that.trigger(CHANGE, e);
                            break;
                       }
                    }
                }
            }
        },

        start: function(source) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 7);
            source.bind("get", this._access);
        },

        stop: function(source) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 8);
            source.unbind("get", this._access);
        },

        get: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 9);

            var that = this,
                source = that.source,
                index = 0,
                path = that.path,
                result = source;

            if (!that.observable) {
                return result;
            }

            that.start(that.source);

            result = source.get(path);

            // Traverse the observable hierarchy if the binding is not resolved at the current level.
            while (result === undefined && source) {

                source = that.parents[++index];

                if (source instanceof ObservableObject) {
                    result = source.get(path);
                }
            }

            // second pass try to get the parent from the object hierarchy
            if (result === undefined) {
                source = that.source; //get the initial source

                while (result === undefined && source) {
                    source = source.parent();

                    if (source instanceof ObservableObject) {
                        result = source.get(path);
                    }
                }
            }

            // If the result is a function - invoke it
            if (typeof result === "function") {
                index = path.lastIndexOf(".");

                // If the function is a member of a nested observable object make that nested observable the context (this) of the function
                if (index > 0) {
                    source = source.get(path.substring(0, index));
                }

                // Invoke the function
                that.start(source);

                result = result.call(source, that.source);

                that.stop(source);
            }

            // If the binding is resolved by a parent object
            if (source && source !== that.source) {

                that.currentSource = source; // save parent object

                // Listen for changes in the parent object
                source.unbind(CHANGE, that._change)
                      .bind(CHANGE, that._change);
            }

            that.stop(that.source);

            return result;
        },

        set: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 10);},

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 11);}
    });

    var EventBinding = Binding.extend( {
        get: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 12);
            var source = this.source,
                path = this.path,
                index = 0,
                handler;

            handler = source.get(path);

            while (!handler && source) {
                source = this.parents[++index];

                if (source instanceof ObservableObject) {
                    handler = source.get(path);
                }
            }

            return proxy(handler, source);
        }
    });

    var TemplateBinding = Binding.extend( {
        init: function(source, path, template) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 13);
            var that = this;

            Binding.fn.init.call(that, source, path);

            that.template = template;
        },

        render: function(value) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 14);
            var html;

            this.start(this.source);

            html = kendo.render(this.template, value);

            this.stop(this.source);

            return html;
        }
    });

    var Binder = Class.extend({
        init: function(element, bindings, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 15);
            this.element = element;
            this.bindings = bindings;
            this.options = options;
        },

        bind: function(binding, attribute) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 16);
            var that = this;

            binding = attribute ? binding[attribute] : binding;

            binding.bind(CHANGE, function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 17);
                that.refresh(attribute || e);
            });

            that.refresh(attribute);
        },

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 18);}
    });

    binders.attr = Binder.extend({
        refresh: function(key) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 19);
            this.element.setAttribute(key, this.bindings.attr[key].get());
        }
    });

    binders.style = Binder.extend({
        refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 20);}
    });

    binders.enabled = Binder.extend({
        refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 21);}
    });

    binders.readonly = Binder.extend({
       refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 22);}
    });

    binders.disabled = Binder.extend({
        refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 23);}
    });

    binders.events = Binder.extend({
        init: function(element, bindings, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 24);
            Binder.fn.init.call(this, element, bindings, options);
            this.handlers = {};
        },

        refresh: function(key) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 25);
            var element = $(this.element),
                binding = this.bindings.events[key],
                handler = this.handlers[key];

            if (handler) {
                element.off(key, handler);
            }

            handler = this.handlers[key] = binding.get();

            element.on(key, binding.source, handler);
        },

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 26);}
    });

    binders.text = Binder.extend({
        refresh: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 27);
            var text = this.bindings.text.get();

            if (text == null) {
                text = "";
            }

            this.element[innerText] = text;
        }
    });

    binders.visible = Binder.extend({
        refresh: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 28);
            if (this.bindings.visible.get()) {
                this.element.style.display = "";
            } else {
                this.element.style.display = "none";
            }
        }
    });

    binders.invisible = Binder.extend({
        refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 29);}
    });

    binders.html = Binder.extend({
        refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 30);}
    });

    binders.value = Binder.extend({
        init: function(element, bindings, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 31);
            Binder.fn.init.call(this, element, bindings, options);

            this._change = proxy(this.change, this);
            this.eventName = options.valueUpdate || CHANGE;

            $(this.element).on(this.eventName, this._change);

            this._initChange = false;
        },

        change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 32);},

        refresh: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 33);
            if (!this._initChange) {
                var value = this.bindings[VALUE].get();

                if (value == null) {
                    value = "";
                }

                var type = this.element.type;

                if (type == "date") {
                    value = kendo.toString(value, "yyyy-MM-dd");
                } else if (type == "datetime-local") {
                    value = kendo.toString(value, "yyyy-MM-ddTHH:mm:ss");
                }

                this.element.value = value;
            }

            this._initChange = false;
        },

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 34);}
    });

    binders.source = Binder.extend({
        init: function(element, bindings, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 35);
            Binder.fn.init.call(this, element, bindings, options);

            var source = this.bindings.source.get();

            if (source instanceof kendo.data.DataSource && options.autoBind !== false) {
                source.fetch();
            }
        },

        refresh: function(e) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 36);
            var that = this,
                source = that.bindings.source.get();

            if (source instanceof ObservableArray || source instanceof kendo.data.DataSource) {
                e = e || {};

                if (e.action == "add") {
                    that.add(e.index, e.items);
                } else if (e.action == "remove") {
                    that.remove(e.index, e.items);
                } else if (e.action != "itemchange") {
                    that.render();
                }
            } else {
                that.render();
            }
        },

        container: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 37);
            var element = this.element;

            if (element.nodeName.toLowerCase() == "table") {
                if (!element.tBodies[0]) {
                    element.appendChild(document.createElement("tbody"));
                }
                element = element.tBodies[0];
            }

            return element;
        },

        template: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 38);
            var options = this.options,
                template = options.template,
                nodeName = this.container().nodeName.toLowerCase();

            if (!template) {
                if (nodeName == "select") {
                    if (options.valueField || options.textField) {
                        template = kendo.format('<option value="#:{0}#">#:{1}#</option>',
                            options.valueField || options.textField, options.textField || options.valueField);
                    } else {
                        template = "<option>#:data#</option>";
                    }
                } else if (nodeName == "tbody") {
                    template = "<tr><td>#:data#</td></tr>";
                } else if (nodeName == "ul" || nodeName == "ol") {
                    template = "<li>#:data#</li>";
                } else {
                    template = "#:data#";
                }

                template = kendo.template(template);
            }

            return template;
        },

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 39);},

        add: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 40);},

        remove: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 41);},

        render: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 42);
            var source = this.bindings.source.get(),
                parents,
                idx,
                length,
                element = this.container(),
                template = this.template(),
                parent;

            if (source instanceof kendo.data.DataSource) {
                source = source.view();
            }

            if (!(source instanceof ObservableArray) && toString.call(source) !== "[object Array]") {
                if (source.parent) {
                    parent = source.parent;
                }

                source = new ObservableArray([source]);

                if (source.parent) {
                    source.parent = parent;
                }
            }

            if (this.bindings.template) {
                unbindElementChildren(element);

                $(element).html(this.bindings.template.render(source));

                if (element.children.length) {
                    parents = this.bindings.source._parents();

                    for (idx = 0, length = source.length; idx < length; idx++) {
                        bindElement(element.children[idx], source[idx], this.options.roles, [source[idx]].concat(parents));
                    }
                }
            }
            else {
                $(element).html(kendo.render(template, source));
            }
        }
    });

    binders.input = {
        checked: Binder.extend({
            init: function(element, bindings, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 43);
                Binder.fn.init.call(this, element, bindings, options);
                this._change = proxy(this.change, this);

                $(this.element).change(this._change);
            },
            change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 44);},

            refresh: function() {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 45);
                var value = this.bindings[CHECKED].get(),
                    source = value,
                    element = this.element;

                if (element.type == "checkbox") {
                    if (source instanceof ObservableArray) {
                        value = this.element.value;
                        if (source.indexOf(value) >= 0) {
                            value = true;
                        }
                    }

                    element.checked = value === true;
                } else if (element.type == "radio" && value != null) {
                    if (element.value === value.toString()) {
                        element.checked = true;
                    }
                }
            },

            value: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 46);},
            destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 47);}
        })
    };

    binders.select = {
        value: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 48);},

            change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 49);},
            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 50);},
            destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 51);}
        })
    };

    binders.widget = {
        events : Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 52);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 53);},

            destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 54);}
        }),

        checked: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 55);},
            change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 56);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 57);},

            value: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 58);},

            destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 59);}
        }),

        visible: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 60);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 61);}
        }),

        invisible: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 62);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 63);}
        }),

        enabled: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 64);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 65);}
        }),

        disabled: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 66);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 67);}
        }),

        source: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 68);},

            itemChange: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 69);},

            dataBinding: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 70);},

            _ns: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 71);},

            dataBound: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 72);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 73);},

            destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 74);}
        }),

        value: Binder.extend({
            init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 75);},

            change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 76);},

            refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 77);},

            destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 78);}
        }),

        multiselect: {
            value: Binder.extend({
                init: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 79);},

                change: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 80);},

                refresh: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 81);},

                destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 82);}

            })
        }
    };

    var BindingTarget = Class.extend( {
        init: function(target, options) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 83);
            this.target = target;
            this.options = options;
            this.toDestroy = [];
        },

        bind: function(bindings) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 84);
            var nodeName = this.target.nodeName.toLowerCase(),
                key,
                hasValue,
                hasSource,
                hasEvents,
                specificBinders = binders[nodeName] || {};

            for (key in bindings) {
                if (key == VALUE) {
                    hasValue = true;
                } else if (key == SOURCE) {
                    hasSource = true;
                } else if (key == EVENTS) {
                    hasEvents = true;
                } else {
                    this.applyBinding(key, bindings, specificBinders);
                }
            }

            if (hasSource) {
                this.applyBinding(SOURCE, bindings, specificBinders);
            }

            if (hasValue) {
                this.applyBinding(VALUE, bindings, specificBinders);
            }

            if (hasEvents) {
                this.applyBinding(EVENTS, bindings, specificBinders);
            }
        },

        applyBinding: function(name, bindings, specificBinders) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 85);
            var binder = specificBinders[name] || binders[name],
                toDestroy = this.toDestroy,
                attribute,
                binding = bindings[name];

            if (binder) {
                binder = new binder(this.target, bindings, this.options);

                toDestroy.push(binder);

                if (binding instanceof Binding) {
                    binder.bind(binding);
                    toDestroy.push(binding);
                } else {
                    for (attribute in binding) {
                        binder.bind(binding, attribute);
                        toDestroy.push(binding[attribute]);
                    }
                }
            } else if (name !== "template") {
                throw new Error("The " + name + " binding is not supported by the " + this.target.nodeName.toLowerCase() + " element");
            }
        },

        destroy: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 86);}
    });

    var WidgetBindingTarget = BindingTarget.extend( {
        bind: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 87);},

        applyBinding: function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 88);}
    });

    function flattenGroups(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 89);}

    function bindingTargetForRole(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 90);}

    var keyValueRegExp = /[A-Za-z0-9_\-]+:(\{([^}]*)\}|[^,}]+)/g,
        whiteSpaceRegExp = /\s/g;

    function parseBindings(bind) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 91);
        var result = {},
            idx,
            length,
            token,
            colonIndex,
            key,
            value,
            tokens;

        tokens = bind.match(keyValueRegExp);

        for (idx = 0, length = tokens.length; idx < length; idx++) {
            token = tokens[idx];
            colonIndex = token.indexOf(":");

            key = token.substring(0, colonIndex);
            value = token.substring(colonIndex + 1);

            if (value.charAt(0) == "{") {
                value = parseBindings(value);
            }

            result[key] = value;
        }

        return result;
    }

    function createBindings(bindings, source, type) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 92);
        var binding,
            result = {};

        for (binding in bindings) {
            result[binding] = new type(source, bindings[binding]);
        }

        return result;
    }

    function bindElement(element, source, roles, parents) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 93);
        var role = element.getAttribute("data-" + kendo.ns + "role"),
            idx,
            bind = element.getAttribute("data-" + kendo.ns + "bind"),
            children = element.children,
            childrenCopy = [],
            deep = true,
            bindings,
            options = {},
            target;

        parents = parents || [source];

        if (role || bind) {
            unbindElement(element);
        }

        if (role) {
            target = bindingTargetForRole(element, roles);
        }

        if (bind) {
            bind = parseBindings(bind.replace(whiteSpaceRegExp, ""));

            if (!target) {
                options = kendo.parseOptions(element, {textField: "", valueField: "", template: "", valueUpdate: CHANGE, valuePrimitive: false, autoBind: true});
                options.roles = roles;
                target = new BindingTarget(element, options);
            }

            target.source = source;

            bindings = createBindings(bind, parents, Binding);

            if (options.template) {
                bindings.template = new TemplateBinding(parents, "", options.template);
            }

            if (bindings.click) {
                bind.events = bind.events || {};
                bind.events.click = bind.click;
                delete bindings.click;
            }

            if (bindings.source) {
                deep = false;
            }

            if (bind.attr) {
                bindings.attr = createBindings(bind.attr, parents, Binding);
            }

            if (bind.style) {
                bindings.style = createBindings(bind.style, parents, Binding);
            }

            if (bind.events) {
                bindings.events = createBindings(bind.events, parents, EventBinding);
            }

            target.bind(bindings);
        }

        if (target) {
            element.kendoBindingTarget = target;
        }

        if (deep && children) {
            // https://github.com/telerik/kendo/issues/1240 for the weirdness.
            for (idx = 0; idx < children.length; idx++) {
                childrenCopy[idx] = children[idx];
            }

            for (idx = 0; idx < childrenCopy.length; idx++) {
                bindElement(childrenCopy[idx], source, roles, parents);
            }
        }
    }

    function bind(dom, object) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 94);
        var idx,
            length,
            node,
            roles = kendo.rolesFromNamespaces([].slice.call(arguments, 2));

        object = kendo.observable(object);
        dom = $(dom);

        for (idx = 0, length = dom.length; idx < length; idx++) {
            node = dom[idx];
            if (node.nodeType === 1) {
                bindElement(node, object, roles);
            }
        }
    }

    function unbindElement(element) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 95);
        var bindingTarget = element.kendoBindingTarget;

        if (bindingTarget) {
            bindingTarget.destroy();

            if ($.support.deleteExpando) {
                delete element.kendoBindingTarget;
            } else if (element.removeAttribute) {
                element.removeAttribute("kendoBindingTarget");
            } else {
                element.kendoBindingTarget = null;
            }
        }
    }

    function unbindElementTree(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 96);}

    function unbindElementChildren(element) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 97);
        var children = element.children;

        if (children) {
            for (var idx = 0, length = children.length; idx < length; idx++) {
                unbindElementTree(children[idx]);
            }
        }
    }

    function unbind(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 98);}

    function notify(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 99);}

    kendo.unbind = unbind;
    kendo.bind = bind;
    kendo.data.binders = binders;
    kendo.data.Binder = Binder;
    kendo.notify = notify;

    kendo.observable = function(object) {___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 100);
        if (!(object instanceof ObservableObject)) {
            object = new ObservableObject(object);
        }

        return object;
    };

    kendo.observableHierarchy = function(){___jdce_logger("/bower_components/kendo-ui/src/js/kendo.binder.js", 101);};

})(window.kendo.jQuery);
