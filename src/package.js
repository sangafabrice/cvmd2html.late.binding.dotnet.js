/**
 * @file returns information about the resource files used by the project.
 * It also provides a way to manage the custom icon link that can be installed and uninstalled.
 * @version 0.0.1.9
 */

/**
 * @typedef {object} Package
 * @property {string} Root is the project root path.
 * @property {string} ResourcePath is the project resources directory path.
 * @property {string} MenuIconPath is the shortcut menu icon path.
 * @property {string} HtmlLibraryPath is the html file that embeds the JS library path.
 * @property {string} JsLibraryPath is the showdown.js library path.
 */

/** @class */
var Package = (function() {
  var resource = {
    Root: FileSystem.GetParentPath(AssemblyLocation)
  };
  resource.ResourcePath = FileSystem.CombinePath(resource.Root, 'rsc');
  resource.HtmlLibraryPath = FileSystem.CombinePath(resource.ResourcePath, 'showdown.html');
  resource.JsLibraryPath = FileSystem.CombinePath(resource.ResourcePath, 'showdown.min.js');
  resource.MenuIconPath = AssemblyLocation;
  return resource;
})();