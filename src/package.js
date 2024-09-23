/**
 * @file returns information about the resource files used by the project.
 * It also provides a way to manage the custom icon link that can be installed and uninstalled.
 * @version 0.0.1.2
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
    Root: FileSystem.GetParentFolderName(AssemblyLocation)
  };
  resource.ResourcePath = FileSystem.BuildPath(resource.Root, 'rsc');
  resource.PwshScriptPath = FileSystem.BuildPath(resource.ResourcePath, 'cvmd2html.ps1');
  resource.MenuIconPath = FileSystem.BuildPath(resource.ResourcePath, 'menu.ico');
  resource.PwshExePath = StdRegProv.GetStringValue(null, 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe', null);
  resource.IconLink = {
    DirName: WshShell.ExpandEnvironmentStrings('%TEMP%'),
    Name: generateGuid() + '.tmp.lnk',
    /**
     * Create the custom icon link file.
     * @method @memberof resource.IconLink
     * @param {string} markdownPath is the input markdown file path.
     */
    Create: function (markdownPath) {
      FileSystem.CreateTextFile(this.Path).Close();
      var link = Shell.NameSpace(this.DirName).ParseName(this.Name).GetLink;
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
  resource.IconLink.Path = FileSystem.BuildPath(resource.IconLink.DirName, resource.IconLink.Name);
  return resource;
})();