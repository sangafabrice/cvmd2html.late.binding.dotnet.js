/**
 * @file returns the methods for managing the shortcut menu option: install and uninstall.
 * @version 0.0.1
 */

/**
 * @typedef {object} Setup
 */

/** @class */
var Setup = (function() {
  var VERB_KEY = 'SOFTWARE\\Classes\\SystemFileAssociations\\.md\\shell\\cthtml';
  var setup = {
    /**
     * Configure the shortcut menu in the registry.
     * @param {boolean} paramNoIcon specifies that the menu icon should not be set.
     * @param {string} menuIconPath is the shortcut menu icon file path.
     */
    Set: function (paramNoIcon, menuIconPath) {
      var pVERB_KEY = format('HKCU\\{0}\\', VERB_KEY);
      var COMMAND_KEY = pVERB_KEY + 'command\\';
      var VERBICON_VALUENAME = pVERB_KEY + 'Icon';
      var command = format('"{0}" /Markdown:"%1"', AssemblyLocation);
      WshShell.RegWrite(COMMAND_KEY, command);
      WshShell.RegWrite(pVERB_KEY, 'Convert to &HTML');
      if (paramNoIcon) {
        try {
          WshShell.RegDelete(VERBICON_VALUENAME);
        } catch (error) { }
      } else {
        WshShell.RegWrite(VERBICON_VALUENAME, menuIconPath);
      }
    },
    /** Remove the shortcut menu by removing the verb key and subkeys. */
    Unset: function () {
      var HKCU = 0x80000001;
      StdRegProv.DeleteKeyTree(HKCU, VERB_KEY);
    }
  }
  return setup;
})();