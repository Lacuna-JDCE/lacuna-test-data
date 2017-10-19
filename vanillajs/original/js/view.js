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

	View.prototype._elementComplete = function (id, completed) {___jdce_logger("/js/view.js", 5);
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		listItem.className = completed ? 'completed' : '';

		// In case it was toggled from an event and not by clicking the checkbox
		qs('input', listItem).checked = completed;
	};

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

	View.prototype._editItemDone = function (id, title) {___jdce_logger("/js/view.js", 7);
		var listItem = qs('[data-id="' + id + '"]');

		if (!listItem) {
			return;
		}

		var input = qs('input.edit', listItem);
		listItem.removeChild(input);

		listItem.className = listItem.className.replace('editing', '');

		qsa('label', listItem).forEach(function (label) {___jdce_logger("/js/view.js", 8);
			label.textContent = title;
		});
	};

	View.prototype.render = function (viewCmd, parameter) {___jdce_logger("/js/view.js", 9);
		var self = this;
		var viewCommands = {
			showEntries: function () {___jdce_logger("/js/view.js", 10);
				self.$todoList.innerHTML = self.template.show(parameter);
			},
			removeItem: function () {___jdce_logger("/js/view.js", 11);
				self._removeItem(parameter);
			},
			updateElementCount: function () {___jdce_logger("/js/view.js", 12);
				self.$todoItemCounter.innerHTML = self.template.itemCounter(parameter);
			},
			clearCompletedButton: function () {___jdce_logger("/js/view.js", 13);
				self._clearCompletedButton(parameter.completed, parameter.visible);
			},
			contentBlockVisibility: function () {___jdce_logger("/js/view.js", 14);
				self.$main.style.display = self.$footer.style.display = parameter.visible ? 'block' : 'none';
			},
			toggleAll: function () {___jdce_logger("/js/view.js", 15);
				self.$toggleAll.checked = parameter.checked;
			},
			setFilter: function () {___jdce_logger("/js/view.js", 16);
				self._setFilter(parameter);
			},
			clearNewTodo: function () {___jdce_logger("/js/view.js", 17);
				self.$newTodo.value = '';
			},
			elementComplete: function () {___jdce_logger("/js/view.js", 18);
				self._elementComplete(parameter.id, parameter.completed);
			},
			editItem: function () {___jdce_logger("/js/view.js", 19);
				self._editItem(parameter.id, parameter.title);
			},
			editItemDone: function () {___jdce_logger("/js/view.js", 20);
				self._editItemDone(parameter.id, parameter.title);
			}
		};

		viewCommands[viewCmd]();
	};

	View.prototype._itemId = function (element) {___jdce_logger("/js/view.js", 21);
		var li = $parent(element, 'li');
		return parseInt(li.dataset.id, 10);
	};

	View.prototype._bindItemEditDone = function (handler) {___jdce_logger("/js/view.js", 22);
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'blur', function () {___jdce_logger("/js/view.js", 23);
			if (!this.dataset.iscanceled) {
				handler({
					id: self._itemId(this),
					title: this.value
				});
			}
		});

		$delegate(self.$todoList, 'li .edit', 'keypress', function (event) {___jdce_logger("/js/view.js", 24);
			if (event.keyCode === self.ENTER_KEY) {
				// Remove the cursor from the input when you hit enter just like if it
				// were a real form
				this.blur();
			}
		});
	};

	View.prototype._bindItemEditCancel = function (handler) {___jdce_logger("/js/view.js", 25);
		var self = this;
		$delegate(self.$todoList, 'li .edit', 'keyup', function (event) {___jdce_logger("/js/view.js", 26);
			if (event.keyCode === self.ESCAPE_KEY) {
				this.dataset.iscanceled = true;
				this.blur();

				handler({id: self._itemId(this)});
			}
		});
	};

	View.prototype.bind = function (event, handler) {___jdce_logger("/js/view.js", 27);
		var self = this;
		if (event === 'newTodo') {
			$on(self.$newTodo, 'change', function () {___jdce_logger("/js/view.js", 28);
				handler(self.$newTodo.value);
			});

		} else if (event === 'removeCompleted') {
			$on(self.$clearCompleted, 'click', function () {___jdce_logger("/js/view.js", 29);
				handler();
			});

		} else if (event === 'toggleAll') {
			$on(self.$toggleAll, 'click', function () {___jdce_logger("/js/view.js", 30);
				handler({completed: this.checked});
			});

		} else if (event === 'itemEdit') {
			$delegate(self.$todoList, 'li label', 'dblclick', function () {___jdce_logger("/js/view.js", 31);
				handler({id: self._itemId(this)});
			});

		} else if (event === 'itemRemove') {
			$delegate(self.$todoList, '.destroy', 'click', function () {___jdce_logger("/js/view.js", 32);
				handler({id: self._itemId(this)});
			});

		} else if (event === 'itemToggle') {
			$delegate(self.$todoList, '.toggle', 'click', function () {___jdce_logger("/js/view.js", 33);
				handler({
					id: self._itemId(this),
					completed: this.checked
				});
			});

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
