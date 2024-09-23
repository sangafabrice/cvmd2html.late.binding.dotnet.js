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
  var KEY_FORMAT = 'HKCU\\{0}\\';
  var wshell = new ActiveXObject('WScript.Shell');
  var setup = {
    /**
     * Configure the shortcut menu in the registry.
     * @param {boolean} paramNoIcon specifies that the menu icon should not be set.
     * @param {string} menuIconPath is the shortcut menu icon file path.
     */
    Set: function (paramNoIcon, menuIconPath) {
      VERB_KEY = format(KEY_FORMAT, VERB_KEY);
      var COMMAND_KEY = VERB_KEY + 'command\\';
      var VERBICON_VALUENAME = VERB_KEY + 'Icon';
      var command = format('"{0}" /Markdown:"%1"', AssemblyLocation);
      wshell.RegWrite(COMMAND_KEY, command);
      wshell.RegWrite(VERB_KEY, 'Convert to &HTML');
      if (paramNoIcon) {
        try {
          wshell.RegDelete(VERBICON_VALUENAME);
        } catch (error) { }
      } else {
        wshell.RegWrite(VERBICON_VALUENAME, menuIconPath);
      }
    },
    /** Remove the shortcut menu by removing the verb key and subkeys. */
    Unset: function () {
      var HKCU = 0x80000001;
      var registry = GetObject('winmgmts:StdRegProv');
      var enumKeyMethod = registry.Methods_.Item('EnumKey');
      var inParam = enumKeyMethod.InParameters.SpawnInstance_();
      inParam.hDefKey = Convert.ToInt32(HKCU);
      // Recursion is used because a key with subkeys cannot be deleted.
      // Recursion helps removing the leaf keys first.
      var deleteVerbKey = function(key) {
        var recursive = function func(key) {
          inParam.sSubKeyName = key;
          var sNames = registry.ExecMethod_(enumKeyMethod.Name, inParam).sNames;
          if (sNames != null) {
            for (var index = 0; index < sNames.length; index++) {
              func(format('{0}\\{1}', [key, sNames[index]]));
            }
          }
          try {
            wshell.RegDelete(format(KEY_FORMAT, key));
          } catch (error) { }
        };
        recursive(key);
      }
      deleteVerbKey(VERB_KEY);
      deleteVerbKey = null;
      Marshal.FinalReleaseComObject(enumKeyMethod);
      Marshal.FinalReleaseComObject(inParam);
      Marshal.FinalReleaseComObject(registry);
      registry = null;
      enumKeyMethod = null;
      inParam = null;
    },
    /**
     * Destroy the object.
     */
    Dispose: function () {
      Marshal.FinalReleaseComObject(wshell);
      wshell = null;
    }
  }
  return setup;
})();