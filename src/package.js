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
 */

/** @class */
var Package = (function() {
  var resource = {
    Root: FileSystem.GetParentFolderName(AssemblyLocation)
  };
  resource.ResourcePath = FileSystem.BuildPath(resource.Root, 'rsc');
  resource.PwshScriptPath = FileSystem.BuildPath(resource.Root, 'cvmd2html.psd1');
  resource.MenuIconPath = AssemblyLocation;
  resource.PwshExePath = WshShell.RegRead('HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\pwsh.exe\\');
  return resource;
})();