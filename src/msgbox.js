/**
 * @file returns the markdown conversion message box.
 * @version 0.0.1.1
 */

/**
 * Represents the markdown conversion message box.
 * @typedef {object} MessageBox
 * @property {number} WARNING specifies that the dialog shows a warning message.
 */

/** @class */
var MessageBox = (function() {
  /** @private @constant {string} */
  var MESSAGE_BOX_TITLE = 'Convert to HTML';

  /** @typedef MessageBox */
  var MessageBox = { };

  /** @public @static @readonly @property {number} */
  MessageBox.WARNING = MsgBoxStyle.Exclamation;
  // Object.defineProperty() method does not work in WSH.
  // It is not possible in this implementation to make the
  // property non-writable.

  /**
   * Show a warning message or an error message box.
   * The function does not return anything when the message box is an error.
   * @public @static @memberof MessageBox
   * @param {string} message is the message text.
   * @param {number} [messageType = MsgBoxStyle.Critical] message box type (Warning/Error).
   * @returns {string|void} "Yes" or "No" depending on the user's click when the message box is a warning.
   */
  MessageBox.Show = function(message, messageType) {
    if (messageType != MsgBoxStyle.Critical && messageType != MsgBoxStyle.Exclamation) {
      messageType = MsgBoxStyle.Critical;
    }
    // The error message box shows the OK button alone.
    // The warning message box shows the alternative Yes or No buttons.
    messageType += messageType == MsgBoxStyle.Critical ? MsgBoxStyle.OkOnly:MsgBoxStyle.YesNo;
    var INCLUDE_DIALOGRESULT_MATCH = true;
    if (Strings.Filter(String[]([format(' {0} ', MsgBoxResult.Ok), format(' {0} ', MsgBoxResult.No)]), format(' {0} ', Interaction.MsgBox(String(message), messageType, MESSAGE_BOX_TITLE)), INCLUDE_DIALOGRESULT_MATCH, CompareMethod.Text).length > 0) {
      quit(1);
    }
  }

  return MessageBox;
})();