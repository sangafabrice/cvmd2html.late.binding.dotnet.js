/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.2
 */

/** The application execution. */
if (Param.Markdown) {
  Package.IconLink.Create(Param.Markdown);
  Process.WaitForExit(Process.Create(format('C:\\Windows\\System32\\cmd.exe /d /c ""{0}" 2> "{1}""', [Package.IconLink.Path, ErrorLog.Path])));
  Package.IconLink.Delete();
  ErrorLog.Read();
  ErrorLog.Delete();
  quit(0);
}