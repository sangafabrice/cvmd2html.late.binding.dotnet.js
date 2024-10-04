/**
 * @file returns information about the resource files used by the project.
 * It also provides a way to manage the custom icon link that can be installed and uninstalled.
 * @version 0.0.1.8
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
  resource.PwshScriptPath = FileSystem.CombinePath(resource.Root, 'cvmd2html.psd1');
  resource.MenuIconPath = AssemblyLocation;
  resource.PwshExePath = WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe\\');
  return resource;
})();