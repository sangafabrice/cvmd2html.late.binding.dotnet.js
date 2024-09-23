/**
 * @file returns the methods for managing the shortcut menu option: install and uninstall.
 * @version 0.0.1.1
 */

package cvmd2html {

  internal abstract class Setup {
    
    /// <summary>The HKCU hive.</summary>
    private static var HKCU: uint = 0x80000001;
  
    /// <summary>The verb subkey.</summary>
    private static var VERB_KEY: String = 'SOFTWARE\\Classes\\SystemFileAssociations\\.md\\shell\\cthtml';

    /// <summary>The icon property name of the the verb registry key.</summary>
    private static var ICON_VALUENAME: String = 'Icon';
  
    /// <summary>Configure the shortcut menu in the registry.</summary>
    static function Set() {
      var COMMAND_KEY: String = VERB_KEY + '\\command';
      var command: String = String.Format('"{0}" /Markdown:"%1"', Program.Path);
      StdRegProv.CreateKey(HKCU, COMMAND_KEY);
      StdRegProv.SetStringValue(HKCU, COMMAND_KEY, null, command);
      StdRegProv.SetStringValue(HKCU, VERB_KEY, null, 'Convert to &HTML');
    }

    /// <summary>Add an icon to the shortcut menu in the registry.</summary>
    /// <param name="menuIconPath">The shortcut menu icon file path.</param>
    static function AddIcon(menuIconPath: String) {
      StdRegProv.SetStringValue(HKCU, VERB_KEY, ICON_VALUENAME, menuIconPath);
    }

    /// <summary>Remove the shortcut icon menu.</summary>
    static function RemoveIcon() {
      StdRegProv.DeleteValue(HKCU, VERB_KEY, ICON_VALUENAME);
    }

    /// <summary>Remove the shortcut menu by removing the verb key and subkeys.</summary>
    static function Unset() {
      StdRegProv.DeleteKeyTree(HKCU, VERB_KEY);
    }
  }
}