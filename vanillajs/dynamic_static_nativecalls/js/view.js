/*global qs, qsa, $on, $parent, $delegate */

(function (window) {___jdce_logger("/js/view.js", 0);
	'use strict';

	/**
	     * View that abstracts away the browser's DOM completely.
	     * It has two simple entry points:
	     *
	     *   - bind(eventName, handler)
	     *     Takes a todo application event and registers the handler
	     *   - render(command, parameterObject)
	     *     Renders the given command with the options
	     */
	function View(template) {___jdce_logger("/js/view.js", 1);
		this.template = template;

		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;

		this.$todoList = qs('.todo-list');
		this.$todoItemCounter = qs('.todo-count');
		this.$clearCompleted = qs('.clear-completed');
		this.$main = qs('.main');
		this.$footer = qs('.footer');
		this.$toggleAll = qs('.toggle-all');
		this.$newTodo = qs('.new-todo');
	}

	View.prototype._removeItem = function (id) {___jdce_logger("/js/view.js", 2);
		var elem = qs('[data-id="' + id + '"]');

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	};

	View.prototype._clearCompletedButton = function (completedCount, visible) {___jdce_logger("/js/view.js", 3);
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
		this.$clearCompleted.style.display = visible ? 'block' : 'none';
	};

	View.prototype._setFilter = function (currentPage) {___jdce_logger("/js/view.js", 4);
		qs('.filters .selected').className = '';
		qs('.filters [href="#/' + currentPage + '"]').className = 'selected';
	};

	View.prototype._elementComplete = function(){___jdce_logger("/js/view.js", 5);};

	View.prototype._editItem = function (id, title) {___jdce_logger("/js/view.js", 6);
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = listItem.className + ' editing';

		var input = document.createElement('input');
		input.className = 'edit';

		listItem.appendChild(input);
		input.focus();
		input.value = title;
	};

	View.prototype._editItemDone = function(){___jdce_logger("/js/view.js", 7);};

	View.prototype.render = function (viewCmd, parameter) {___jdce_logger("/js/view.js", 8);
		var self = this;
		var viewCommands = {
			showEntries: function () {___jdce_logger("/js/view.js", 9);
				self.$todoList.innerHTML = self.template.show(parameter);
			},
			removeItem: function () {___jdce_logger("/js/view.js", 10);
				self._removeItem(parameter);
			},
			updateElementCount: function () {___jdce_logger("/js/view.js", 11);
				self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
			},
			clearCompletedButton: function () {___jdce_logger("/js/view.js", 12);
				self._clearCompletedButton(parameter.completed, parameter.visible);
			},
			contentBlockVisibility: function () {___jdce_logger("/js/view.js", 13);
				self.$main.style.display = self.$footer.style.display = parameter.visible ? 'block' : 'none';
			},
			toggleAll: function () {___jdce_logger("/js/view.js", 14);
				self.$toggleAll.checked = parameter.checked;
			},
			setFilter: function () {___jdce_logger("/js/view.js", 15);
				self._setFilter(parameter);
			},
			clearNewTodo: function(){___jdce_logger("/js/view.js", 16);},
			elementComplete: function(){___jdce_logger("/js/view.js", 17);},
			editItem: function () {___jdce_logger("/js/view.js", 18);
				self._editItem(parameter.id, parameter.title);
			},
			editItemDone: function(){___jdce_logger("/js/view.js", 19);}
		};

		viewCommands[viewCmd]();
	};

	View.prototype._itemId = function(){___jdce_logger("/js/view.js", 20);};

	View.prototype._bindItemEditDone = function (handler) {___jdce_logger("/js/view.js", 21);
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'blur', function(){___jdce_logger("/js/view.js", 22);});

		$delegate(self.$todoList, 'li .edit', 'keypress', function(){___jdce_logger("/js/view.js", 23);});
	};

	View.prototype._bindItemEditCancel = function (handler) {___jdce_logger("/js/view.js", 24);
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'keyup', function(){___jdce_logger("/js/view.js", 25);});
	};

	View.prototype.bind = function (event, handler) {___jdce_logger("/js/view.js", 26);
		var self = this;
		if (event === 'newTodo') {
			$on(self.$newTodo, 'change', function(){___jdce_logger("/js/view.js", 27);});

		} else if (event === 'removeCompleted') {
			$on(self.$clearCompleted, 'click', function(){___jdce_logger("/js/view.js", 28);});

		} else if (event === 'toggleAll') {
			$on(self.$toggleAll, 'click', function(){___jdce_logger("/js/view.js", 29);});

		} else if (event === 'itemEdit') {
			$delegate(self.$todoList, 'li label', 'dblclick', function(){___jdce_logger("/js/view.js", 30);});

		} else if (event === 'itemRemove') {
			$delegate(self.$todoList, '.destroy', 'click', function(){___jdce_logger("/js/view.js", 31);});

		} else if (event === 'itemToggle') {
			$delegate(self.$todoList, '.toggle', 'click', function(){___jdce_logger("/js/view.js", 32);});

		} else if (event === 'itemEditDone') {
			self._bindItemEditDone(handler);

		} else if (event === 'itemEditCancel') {
			self._bindItemEditCancel(handler);
		}
	};

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));
