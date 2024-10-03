/**
 * @file returns information about the resource files used by the project.
 * It also provides a way to manage the custom icon link that can be installed and uninstalled.
 * @version 0.0.1.4
 */

/**
 * @typedef {object} Package
 * @property {string} Root is the project root path.
 * @property {string} ResourcePath is the project resources directory path.
 * @property {string} MenuIconPath is the shortcut menu icon path.
 * @property {string} PwshExePath is the powershell core runtime path.
 * @property {string} PwshScriptPath is the shortcut target powershell script path.
 * @property {object} IconLink represents an adapted link object.
 * @property {string} IconLink.DirName is the parent directory path of the custom icon link.
 * @property {string} IconLink.Name is the custom icon link file name.
 * @property {string} IconLink.Path is the custom icon link full path.
 */

/** @class */
var Package = (function() {
  var resource = {
    Root: FileSystem.GetParentPath(AssemblyLocation)
  };
  resource.ResourcePath = FileSystem.CombinePath(resource.Root, 'rsc');
  resource.PwshScriptPath = FileSystem.CombinePath(resource.ResourcePath, 'cvmd2html.ps1');
  resource.MenuIconPath = AssemblyLocation;
  resource.PwshExePath = (function() {
    var getStringValueMethod = StdRegProv.Methods_.Item('GetStringValue');
    var inParam = getStringValueMethod.InParameters.SpawnInstance_();
    // The HKLM registry subkey stores the PowerShell Core application path.
    inParam.sSubKeyName = 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe';
    try {
      return StdRegProv.ExecMethod_(getStringValueMethod.Name, inParam).sValue;
    } finally {
      Marshal.FinalReleaseComObject(getStringValueMethod);
      Marshal.FinalReleaseComObject(inParam);
      inParam = null;
      getStringValueMethod = null;
    }
  })();
  resource.IconLink = {
    DirName: Interaction.Environ('TEMP'),
    Name: Scriptlet.Guid.substr(1, 36).toLowerCase() + '.tmp.lnk',
    /**
     * Create the custom icon link file.
     * @method @memberof resource.IconLink
     * @param {string} markdownPath is the input markdown file path.
     */
    Create: function (markdownPath) {
      Interaction.CreateObject('Scripting.FileSystemObject').CreateTextFile(this.Path).Close();
      var link = Interaction.CreateObject('Shell.Application').NameSpace(this.DirName).ParseName(this.Name).GetLink;
      link.Path = resource.PwshExePath;
      link.Arguments = format('-ep Bypass -nop -w Hidden -f "{0}" -Markdown "{1}"', [resource.PwshScriptPath, markdownPath]);
      link.SetIconLocation(resource.MenuIconPath, 0);
      link.Save();
      Marshal.FinalReleaseComObject(link);
      link = null;
    },
    /**
     * Delete the custom icon link file.
     * @method @memberof resource.IconLink
     */
    Delete: function () {
      try {
        FileSystem.DeleteFile(this.Path);
      } catch (error) { }
    }
  }
  resource.IconLink.Path = FileSystem.CombinePath(resource.IconLink.DirName, resource.IconLink.Name);
  return resource;
})();