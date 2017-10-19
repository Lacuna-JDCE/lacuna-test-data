/* ---------------------------------------------------------------------------------------
Todos.ts
Microsoft grants you the right to use these script files under the Apache 2.0 license.
Microsoft reserves all other rights to the files not expressly granted by Microsoft,
whether by implication, estoppel or otherwise. The copyright notices and MIT licenses
below are for informational purposes only.

Portions Copyright © Microsoft Corporation
Apache 2.0 License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
file except in compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License.
------------------------------------------------------------------------------------------
Provided for Informational Purposes Only
MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
--------------------------------------------------------------------------------------- */
// Todos.js
// https://github.com/documentcloud/backbone/blob/master/examples/todos/todos.js
var __extends = (this && this.__extends) || function (d, b) {___jdce_logger("/js/app.js", 0);
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {___jdce_logger("/js/app.js", 1); this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Todo Model
// ----------
// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
var Todo = (function (_super) {___jdce_logger("/js/app.js", 2);
    __extends(Todo, _super);
    function Todo() {___jdce_logger("/js/app.js", 3);
        _super.apply(this, arguments);
    }
    // Default attributes for the todo.
    Todo.prototype.defaults = function () {___jdce_logger("/js/app.js", 4);
        return {
            title: '',
            completed: false
        };
    };
    // Ensure that each todo created has `title`.
    Todo.prototype.initialize = function(){___jdce_logger("/js/app.js", 5);};
    // Toggle the `completed` state of this todo item.
    Todo.prototype.toggle = function(){___jdce_logger("/js/app.js", 6);};
    // Remove this Todo from *localStorage* and delete its view.
    Todo.prototype.clear = function () {___jdce_logger("/js/app.js", 7);
        this.destroy();
    };
    return Todo;
})(Backbone.Model);
// Todo Collection
// ---------------
// The collection of todos is backed by *localStorage* instead of a remote
// server.
var TodoList = (function (_super) {___jdce_logger("/js/app.js", 8);
    __extends(TodoList, _super);
    function TodoList() {___jdce_logger("/js/app.js", 9);
        _super.apply(this, arguments);
        // Reference to this collection's model.
        this.model = Todo;
        // Save all of the todo items under the `'todos'` namespace.
        this.localStorage = new Store('todos-typescript-backbone');
    }
    // Filter down the list of all todo items that are completed.
    TodoList.prototype.completed = function () {___jdce_logger("/js/app.js", 10);
        return this.filter(function (todo) {___jdce_logger("/js/app.js", 11); return todo.get('completed'); });
    };
    // Filter down the list to only todo items that are still not completed.
    TodoList.prototype.remaining = function () {___jdce_logger("/js/app.js", 12);
        return this.without.apply(this, this.completed());
    };
    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    TodoList.prototype.nextOrder = function(){___jdce_logger("/js/app.js", 13);};
    // Todos are sorted by their original insertion order.
    TodoList.prototype.comparator = function (todo) {___jdce_logger("/js/app.js", 14);
        return todo.get('order');
    };
    return TodoList;
})(Backbone.Collection);
// Create our global collection of **Todos**.
var Todos = new TodoList();
var taskFilter;
// Todo Item View
// --------------
// The DOM element for a todo item...
var TodoView = (function (_super) {___jdce_logger("/js/app.js", 15);
    __extends(TodoView, _super);
    function TodoView(options) {___jdce_logger("/js/app.js", 16);
        //... is a list tag.
        this.tagName = 'li';
        // The DOM events specific to an item.
        this.events = {
            'click .check': 'toggleDone',
            'dblclick label.todo-content': 'edit',
            'click button.destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'keydown .edit': 'revertOnEscape',
            'blur .edit': 'close'
        };
        _super.call(this, options);
        // Cache the template function for a single item.
        this.template = _.template($('#item-template').html());
        _.bindAll(this, 'render', 'close', 'remove', 'toggleVisible');
        this.model.bind('change', this.render);
        this.model.bind('destroy', this.remove);
        this.model.bind('visible', this.toggleVisible);
    }
    // Re-render the contents of the todo item.
    TodoView.prototype.render = function () {___jdce_logger("/js/app.js", 17);
        this.$el
            .html(this.template(this.model.toJSON()))
            .toggleClass('completed', this.model.get('completed'));
        this.toggleVisible();
        this.input = this.$('.todo-input');
        return this;
    };
    // Toggle the `completed` state of the model.
    TodoView.prototype.toggleDone = function(){___jdce_logger("/js/app.js", 18);};
    TodoView.prototype.toggleVisible = function () {___jdce_logger("/js/app.js", 19);
        var completed = this.model.get('completed');
        var hidden = (taskFilter === 'completed' && !completed) ||
            (taskFilter === 'active' && completed);
        this.$el.toggleClass('hidden', hidden);
    };
    // Switch this view into `'editing'` mode, displaying the input field.
    TodoView.prototype.edit = function(){___jdce_logger("/js/app.js", 20);};
    // Close the `'editing'` mode, saving changes to the todo.
    TodoView.prototype.close = function () {___jdce_logger("/js/app.js", 21);
        var trimmedValue = this.input.val().trim();
        if (trimmedValue) {
            this.model.save({ title: trimmedValue });
        }
        else {
            this.clear();
        }
        this.$el.removeClass('editing');
    };
    // If you hit `enter`, we're through editing the item.
    TodoView.prototype.updateOnEnter = function(){___jdce_logger("/js/app.js", 22);};
    // If you're pressing `escape` we revert your change by simply leaving
    // the `editing` state.
    TodoView.prototype.revertOnEscape = function(){___jdce_logger("/js/app.js", 23);};
    // Remove the item, destroy the model.
    TodoView.prototype.clear = function () {___jdce_logger("/js/app.js", 24);
        this.model.clear();
    };
    TodoView.ENTER_KEY = 13;
    TodoView.ESC_KEY = 27;
    return TodoView;
})(Backbone.View);
// Todo Router
// -----------
var TodoRouter = (function (_super) {___jdce_logger("/js/app.js", 25);
    __extends(TodoRouter, _super);
    function TodoRouter() {___jdce_logger("/js/app.js", 26);
        _super.call(this);
        this.routes = {
            '*filter': 'setFilter'
        };
        this._bindRoutes();
    }
    TodoRouter.prototype.setFilter = function (param) {___jdce_logger("/js/app.js", 27);
        if (param === void 0) { param = ''; }
        // Trigger a collection filter event, causing hiding/unhiding
        // of Todo view items
        Todos.trigger('filter', param);
    };
    return TodoRouter;
})(Backbone.Router);
// The Application
// ---------------
// Our overall **AppView** is the top-level piece of UI.
var AppView = (function (_super) {___jdce_logger("/js/app.js", 28);
    __extends(AppView, _super);
    function AppView() {___jdce_logger("/js/app.js", 29);
        _super.call(this);
        // Delegated events for creating new items, and clearing completed ones.
        this.events = {
            'keypress .new-todo': 'createOnEnter',
            'click .todo-clear button': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'
        };
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        this.setElement($('.todoapp'), true);
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete', 'filter');
        this.input = this.$('.new-todo');
        this.allCheckbox = this.$('.toggle-all')[0];
        this.mainElement = this.$('.main')[0];
        this.footerElement = this.$('.footer')[0];
        this.statsTemplate = _.template($('#stats-template').html());
        Todos.bind('add', this.addOne);
        Todos.bind('reset', this.addAll);
        Todos.bind('all', this.render);
        Todos.bind('change:completed', this.filterOne);
        Todos.bind('filter', this.filter);
        Todos.fetch();
        // Initialize the router, showing the selected view
        var todoRouter = new TodoRouter();
        Backbone.history.start();
    }
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    AppView.prototype.render = function () {___jdce_logger("/js/app.js", 30);
        var completed = Todos.completed().length;
        var remaining = Todos.remaining().length;
        if (Todos.length) {
            this.mainElement.style.display = 'block';
            this.footerElement.style.display = 'block';
            this.$('.todo-stats').html(this.statsTemplate({
                total: Todos.length,
                completed: completed,
                remaining: remaining
            }));
            this.$('.filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (taskFilter || '') + '"]')
                .addClass('selected');
        }
        else {
            this.mainElement.style.display = 'none';
            this.footerElement.style.display = 'none';
        }
        this.allCheckbox.checked = !remaining;
    };
    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    AppView.prototype.addOne = function (todo) {___jdce_logger("/js/app.js", 31);
        var view = new TodoView({ model: todo });
        this.$('.todo-list').append(view.render().el);
    };
    // Add all items in the **Todos** collection at once.
    AppView.prototype.addAll = function () {___jdce_logger("/js/app.js", 32);
        Todos.each(this.addOne);
    };
    // Filter out completed/remaining tasks
    AppView.prototype.filter = function (criteria) {___jdce_logger("/js/app.js", 33);
        taskFilter = criteria;
        this.filterAll();
    };
    AppView.prototype.filterOne = function (todo) {___jdce_logger("/js/app.js", 34);
        todo.trigger('visible');
    };
    AppView.prototype.filterAll = function () {___jdce_logger("/js/app.js", 35);
        Todos.each(this.filterOne);
    };
    // Generate the attributes for a new Todo item.
    AppView.prototype.newAttributes = function(){___jdce_logger("/js/app.js", 36);};
    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    AppView.prototype.createOnEnter = function(){___jdce_logger("/js/app.js", 37);};
    // Clear all completed todo items, destroying their models.
    AppView.prototype.clearCompleted = function(){___jdce_logger("/js/app.js", 38);};
    AppView.prototype.toggleAllComplete = function(){___jdce_logger("/js/app.js", 39);};
    return AppView;
})(Backbone.View);
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function () {___jdce_logger("/js/app.js", 40);
    // Finally, we kick things off by creating the **App**.
    new AppView();
});
