/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.7
 */

/** The application execution. */
if (Param.Markdown) {
  var WAIT_ON_RETURN = true;
  Package.IconLink.Create(Param.Markdown);
  Interaction.Shell(format('C:\\Windows\\System32\\cmd.exe /d /c ""{0}" 2> "{1}""', [Package.IconLink.Path, ErrorLog.Path]), AppWinStyle.Hide, WAIT_ON_RETURN);
  Package.IconLink.Delete();
  ErrorLog.Read();
  ErrorLog.Delete();
  quit(0);
}