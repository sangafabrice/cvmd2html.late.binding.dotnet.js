/**
 * @file returns information about the resource files used by the project.
 * It also provides a way to manage the custom icon link that can be installed and uninstalled.
 * @version 0.0.1.3
 */

package cvmd2html {

  abstract class Package {
  
    /// <summary>The project root path.</summary>
    private static var _root: String = System.AppContext.BaseDirectory;
  
    /// <summary>The project resources directory path.</summary>
    private static var _resourcePath: String = Path.Combine(_root, 'rsc');
  
    private static var _pwshScriptPath: String = Path.Combine(_resourcePath, 'cvmd2html.ps1');
  
    private static var _pwshExePath: String = Registry.GetValue('HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe', null, null);
  
    private static var _menuIconPath: String = Path.Combine(_resourcePath, 'menu.ico');
  
    /// <summary>The shortcut target powershell script path.</summary>
    static function get PwshScriptPath(): String {
      return _pwshScriptPath;
    }
  
    /// <summary>The powershell core runtime path.</summary>
    static function get PwshExePath(): String {
      return _pwshExePath;
    }
  
    /// <summary>The shortcut menu icon path.</summary>
    static function get MenuIconPath(): String {
      return _menuIconPath;
    }
  
    /// <summary>Represents the custom icon link.</summary>
    static abstract class IconLink {
  
      /// <summary>The shortcut link parent full path.</summary>
      private static var _dirName: String = System.IO.Path.GetTempPath();
  
      /// <summary>The generated shortcut link file name.</summary>
      private static var _name: String = Guid.NewGuid() + '.tmp.lnk';
  
      private static var _path: String = System.IO.Path.Combine(_dirName, _name);
  
      /// <summary>The custom icon shortcut link full path.</summary>
      static function get Path(): String {
        return _path;
      }
  
      /// <summary>Create the custom icon link file.</summary>
      /// <param name="markdownPath">The input markdown file path.</param>
      static function Create(markdownPath): String {
        var link: WshShortcut = (new WshShellClass()).CreateShortcut(_path);
        link.TargetPath = Package.PwshExePath;
        link.Arguments = String.Format('-ep Bypass -nop -w Hidden -f "{0}" -Markdown "{1}"', Package.PwshScriptPath, markdownPath);
        link.IconLocation = Package.MenuIconPath;
        link.Save();
        Marshal.FinalReleaseComObject(link);
        link = null;
      }
  
      /// <summary>Delete the custom icon link file.</summary>
      static function Delete() {
        try {
          File.Delete(_path);
        } catch (error) { }
      }
    }
  }
}