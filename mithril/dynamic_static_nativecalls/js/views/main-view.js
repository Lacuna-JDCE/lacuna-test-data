'use strict';
/*global m */
var app = app || {};

// View utility
app.watchInput = function (onenter, onescape) {___jdce_logger("/js/views/main-view.js", 0);
	return function(){___jdce_logger("/js/views/main-view.js", 1);};
};

app.view = (function () {___jdce_logger("/js/views/main-view.js", 2);
	var focused = false;

	return function (ctrl) {___jdce_logger("/js/views/main-view.js", 3);
		return [
			m('header#header', [
				m('h1', 'todos'), m('input#new-todo[placeholder="What needs to be done?"]', {
					onkeyup: app.watchInput(ctrl.add.bind(ctrl),
						ctrl.clearTitle.bind(ctrl)),
					value: ctrl.title(),
					oninput: m.withAttr('value', ctrl.title),
					config: function (element) {___jdce_logger("/js/views/main-view.js", 4);
						if (!focused) {
							element.focus();
							focused = true;
						}
					}
				})
			]),
			m('section#main', {
				style: {
					display: ctrl.list.length ? '' : 'none'
				}
			}, [
				m('input#toggle-all[type=checkbox]', {
					onclick: ctrl.completeAll.bind(ctrl),
					checked: ctrl.allCompleted()
				}),
				m('ul#todo-list', [
					ctrl.list.filter(ctrl.isVisible.bind(ctrl)).map(function (task, index) {___jdce_logger("/js/views/main-view.js", 5);
						return m('li', { class: (function () {___jdce_logger("/js/views/main-view.js", 6);
							var classes = '';
							classes += task.completed() ? 'completed' : '';
							classes += task.editing() ? ' editing' : '';
							return classes;
						})(),
						key: task.key
						}, [
							m('.view', [
								m('input.toggle[type=checkbox]', {
									onclick: m.withAttr('checked', ctrl.complete.bind(ctrl, task)),
									checked: task.completed()
								}),
								m('label', {
									ondblclick: ctrl.edit.bind(ctrl, task)
								}, task.title()),
								m('button.destroy', {
									onclick: ctrl.remove.bind(ctrl, index)
								})
							]), m('input.edit', {
								value: task.title(),
								onkeyup: app.watchInput(
									ctrl.doneEditing.bind(ctrl, task, index),
									ctrl.cancelEditing.bind(ctrl, task)
								),
								oninput: m.withAttr('value', function(){___jdce_logger("/js/views/main-view.js", 7);}),
								config: function(){___jdce_logger("/js/views/main-view.js", 8);},
								onblur: ctrl.doneEditing.bind(ctrl, task, index)
							})
						]);
					})
				])
			]), ctrl.list.length === 0 ? '' : app.footer(ctrl)
		];
	}
})();
