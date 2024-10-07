/**
 * @file returns the methods for managing the shortcut menu option: install and uninstall.
 * @version 0.0.1.1
 */

package cvmd2html {

  internal abstract class Setup {
    
    /// <summary>The HKCU hive.</summary>
    private static var HKCU: RegistryKey = Registry.CurrentUser;

    /// <summary>The shell subkey.</summary>
    private static var SHELL_SUBKEY: String = 'SOFTWARE\\Classes\\SystemFileAssociations\\.md\\shell';

    /// <summary>The verb to configure.</summary>
    private static var VERB: String = 'cthtml';

    /// <summary>The verb subkey.</summary>
    private static var VERB_SUBKEY: String = String.Format('{0}\\{1}', SHELL_SUBKEY, VERB);

    /// <summary>The verb full key.</summary>
    private static var VERB_KEY: String = String.Format('{0}\\{1}', HKCU, VERB_SUBKEY);

    /// <summary>The icon property name of the the verb registry key.</summary>
    private static var ICON_VALUENAME: String = 'Icon';

    /// <summary>Configure the shortcut menu in the registry.</summary>
    static function Set() {
      var COMMAND_KEY: String = VERB_KEY + '\\command';
      var command: String = String.Format('"{0}" /Markdown:"%1"', Program.Path);
      Registry.SetValue(COMMAND_KEY, '', command);
      Registry.SetValue(VERB_KEY, '', 'Convert to &HTML');
    }

    /// <summary>Add an icon to the shortcut menu in the registry.</summary>
    /// <param name="menuIconPath">The shortcut menu icon file path.</param>
    static function AddIcon(menuIconPath: String) {
      Registry.SetValue(VERB_KEY, ICON_VALUENAME, menuIconPath);
    }

    /// <summary>Remove the shortcut icon menu.</summary>
    /// <param name="menuIconPath">The shortcut menu icon file path.</param>
    static function RemoveIcon() {
      var VERB_KEY_OBJ: RegistryKey = HKCU.CreateSubKey(VERB_SUBKEY);
      if (VERB_KEY_OBJ) {
        VERB_KEY_OBJ.DeleteValue(ICON_VALUENAME, false);
        VERB_KEY_OBJ.Close();
      }
    }

    /// <summary>Remove the shortcut menu by removing the verb key and subkeys.</summary>
    static function Unset() {
      var SHELL_KEY_OBJ: RegistryKey = HKCU.CreateSubKey(SHELL_SUBKEY);
      if (SHELL_KEY_OBJ) {
        SHELL_KEY_OBJ.DeleteSubKeyTree(VERB, false);
        SHELL_KEY_OBJ.Close();
      }
    }
  }
}