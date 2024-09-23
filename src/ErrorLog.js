/**
 * @file manages the error log file and content.
 * @version 0.0.1.1
 */

package cvmd2html {

  internal abstract class ErrorLog {
  
    private static var _path: String = System.IO.Path.Combine(System.IO.Path.GetTempPath(), Guid.NewGuid() + '.tmp.log');
  
    /// <summary>The randomly generated error log file path.</summary>
    static function get Path(): String {
      return _path;
    }
  
    /// <summary>Display the content of the error log file in a message box if it is not empty.</summary>
    static function Read() {
      try {
        var txtStream: StreamReader = File.OpenText(_path);
        // Read the error message and remove the ANSI escaped character for red coloring.
        var errorMessage: String = txtStream.ReadToEnd().replace(/(\x1B\[31;1m)|(\x1B\[0m)/g, '');
        if (errorMessage.length) {
          MessageBox.Show(errorMessage, 'Convert to HTML', MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
      } catch (error) { }
      finally {
        if (txtStream) {
          txtStream.Close();
          txtStream.Dispose();
        }
      }
    }
  
    /// <summary>Delete the error log file.</summary>
    static function Delete() {
      try {
        File.Delete(_path);
      } catch (error) { }
    }
  }
}