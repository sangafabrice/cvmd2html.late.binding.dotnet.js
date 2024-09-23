/**
 * @file returns the parsed parameters.
 * @version 0.0.1
 */

/**
 * The parameters and arguments.
 * @typedef {object} Param
 * @property {string} Markdown is the selected markdown file path.
 * @property {boolean} Set installs the shortcut menu.
 * @property {boolean} NoIcon installs the shortcut menu without icon.
 * @property {boolean} Unset uninstalls the shortcut menu.
 * @property {boolean} Help shows help.
 */

/** @class */
var Param = (function (args) {
  if (args.length == 2) {
    var arg = args[1];
    var paramName = arg.split(':', 1)[0].toLowerCase();
    if (paramName == '/markdown') {
      var paramMarkdown = arg.replace(new RegExp('^' + paramName + ':?', 'i'), '');
      if (paramMarkdown.length > 0) {
        return {
          Markdown: paramMarkdown
        }
      }
    }
    switch (arg.toLowerCase()) {
      case '/set':
        return {
          Set: true,
          NoIcon: false
        }
      case '/set:noicon':
        return {
          Set: true,
          NoIcon: true
        }
      case '/unset':
        return {
          Unset: true
        }
    }
  } else if (args.length == 1) {
    return {
      Set: true,
      NoIcon: false
    }
  }
  var helpText = '';
  helpText += 'The MarkdownToHtml shortcut launcher.\n';
  helpText += 'It starts the shortcut menu target script in a hidden window.\n\n';
  helpText += 'Syntax:\n';
  helpText += '  Convert-MarkdownToHtml /Markdown:<markdown file path>\n';
  helpText += '  Convert-MarkdownToHtml [/Set[:NoIcon]]\n';
  helpText += '  Convert-MarkdownToHtml /Unset\n';
  helpText += '  Convert-MarkdownToHtml /Help\n\n';
  helpText += "<markdown file path>  The selected markdown's file path.\n";
  helpText += '                 Set  Configure the shortcut menu in the registry.\n';
  helpText += '              NoIcon  Specifies that the icon is not configured.\n';
  helpText += '               Unset  Removes the shortcut menu.\n';
  helpText += '                Help  Show the help doc.\n';
  (new ActiveXObject('WScript.Shell')).Popup(helpText);
  quit(1);
})(Environment.GetCommandLineArgs());