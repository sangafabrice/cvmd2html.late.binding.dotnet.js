/**
 * @file returns the methods for managing the shortcut menu option: install and uninstall.
 * @version 0.0.1
 */

/**
 * @typedef {object} Setup
 */

/** @class */
var Setup = (function() {
  var HKCU = 0x80000001;
  var VERB_KEY = 'SOFTWARE\\Classes\\SystemFileAssociations\\.md\\shell\\cthtml';
  var setup = {
    /**
     * Configure the shortcut menu in the registry.
     * @param {boolean} paramNoIcon specifies that the menu icon should not be set.
     * @param {string} menuIconPath is the shortcut menu icon file path.
     */
    Set: function (paramNoIcon, menuIconPath) {
      var COMMAND_KEY = VERB_KEY + '\\command';
      var command = format('"{0}" /Markdown:"%1"', AssemblyLocation);
      StdRegProv.CreateKey(HKCU, COMMAND_KEY);
      StdRegProv.SetStringValue(HKCU, COMMAND_KEY, null, command);
      StdRegProv.SetStringValue(HKCU, VERB_KEY, null, 'Convert to &HTML');
      var iconValueName = 'Icon';
      if (paramNoIcon) {
        StdRegProv.DeleteValue(HKCU, VERB_KEY, iconValueName);
      } else {
        StdRegProv.SetStringValue(HKCU, VERB_KEY, iconValueName, menuIconPath);
      }
    },
    /** Remove the shortcut menu by removing the verb key and subkeys. */
    Unset: function () {
      StdRegProv.DeleteKeyTree(HKCU, VERB_KEY);
    }
  }
  return setup;
})();