/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.9
 */

/** The application execution. */
if (Param.Markdown) {
  CreateConverter(Package.HtmlLibraryPath).ConvertFrom(Param.Markdown);
  quit(0);
}