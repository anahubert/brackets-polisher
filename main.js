define(function (require, exports, module) {

	"use strict";

	var DocumentManager = brackets.getModule('document/DocumentManager');
	var CommandManager = brackets.getModule("command/CommandManager");
	var ExtensionUtils = brackets.getModule('utils/ExtensionUtils');
	var EditorManager = brackets.getModule("editor/EditorManager");
	var Menus = brackets.getModule("command/Menus");

	var PREFIX = 'brackets-polisher';
	var COMMAND_ID = PREFIX + '.format';

	var KEY_BINDINGS = [
		{
			key: 'Ctrl-Shift-F',
			platform: 'win'
        }, {
			key: 'Ctrl-Alt-F',
			platform: 'win'
        }, {
			key: 'Cmd-Shift-F',
			platform: 'mac'
        }, {
			key: 'Ctrl-Alt-F'
        }
    ];

	ExtensionUtils.loadStyleSheet(module, 'styles/styles.css');

	function format() {

		var editor = EditorManager.getCurrentFullEditor();

		if (editor.hasSelection()) {

			var selection = editor.getSelection();
			var htmlUnformatted = editor.getSelectedText();
			var htmlFormatted = '';
			var document = DocumentManager.getCurrentDocument();

			var rgx = /\s{2,}/gi;

			htmlFormatted = htmlUnformatted.replace(rgx, ' ');
			document.replaceRange(htmlFormatted, selection.start, selection.end);

		} else {
			//console.log('no selection');
		}
	}


	CommandManager.register('Polish up!', COMMAND_ID, format);

	$(document.createElement('a'))
		.attr('id', 'polisher-icon')
		.attr('href', '#')
		.attr('title', 'Polish up!')
		.on('click', function () {
			format();
		})
		.appendTo($('#main-toolbar .buttons'));

	var editMenu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
	editMenu.addMenuDivider();
	editMenu.addMenuItem(COMMAND_ID, KEY_BINDINGS);

	Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem(COMMAND_ID);

});
