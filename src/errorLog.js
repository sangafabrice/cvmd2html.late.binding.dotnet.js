/**
 * @file manages the error log file and content.
 * @version 0.0.1.2
 */

/**
 * @typedef {object} ErrorLog
 * @property {string} Path is the randomly generated error log file path.
 */

/** @class */
var ErrorLog = (function() {
  var errorLog = {
    Path: FileSystem.CombinePath(Interaction.Environ('TEMP'), Scriptlet.Guid.substr(1, 36).toLowerCase() + '.tmp.log'),
    /**
     * Display the content of the error log file in a message box if it is not empty.
     */
    Read: function () {
      try {
        var txtStream = FileSystem.OpenTextFileReader(this.Path);
        // Read the error message and remove the ANSI escaped character for red coloring.
        var errorMessage = txtStream.ReadToEnd().replace(/(\x1B\[31;1m)|(\x1B\[0m)/g, '');
        if (errorMessage.length) {
          Interaction.MsgBox(errorMessage, MsgBoxStyle.OkOnly + MsgBoxStyle.Critical, 'Convert to HTML');
        }
      } catch (error) { }
      finally {
        if (txtStream) {
          txtStream.Close();
          txtStream.Dispose();
        }
      }
    },
    /**
     * Delete the error log file.
     */
    Delete: function () {
      try {
        FileSystem.DeleteFile(this.Path);
      } catch (error) { }
    }
  }
  return errorLog;
})();