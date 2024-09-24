/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.3
 */

/** The application execution. */
if (Param.Markdown) {
  var WINDOW_STYLE_HIDDEN = 0;
  var WAIT_ON_RETURN = true;
  Package.IconLink.Create(Param.Markdown);
  if (WshShell.Run(format('C:\\Windows\\System32\\cmd.exe /d /c ""{0}" 2> "{1}""', [Package.IconLink.Path, ErrorLog.Path]), WINDOW_STYLE_HIDDEN, WAIT_ON_RETURN)) {
    ErrorLog.Read();
    ErrorLog.Delete();
  }
  Package.IconLink.Delete();
  quit(0);
}