/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.7
 */

/** The application execution. */
if (Param.Markdown) {
  Package.IconLink.Create(Param.Markdown);
  waitForChildExit(Interaction.Shell(format('C:\\Windows\\System32\\cmd.exe /d /c ""{0}" 2> "{1}""', [Package.IconLink.Path, ErrorLog.Path]), AppWinStyle.Hide));
  Package.IconLink.Delete();
  ErrorLog.Read();
  ErrorLog.Delete();
  quit(0);
}

/**
 * Wait for the child process exit.
 * @param {number} parentProcessId is the parent process identifier.
 */
function waitForChildExit(parentProcessId) {
  // The process termination event query.
  // Select the process whose parent is the intermediate process used for executing the link.
  var wmiQuery = 'SELECT * FROM __InstanceDeletionEvent WITHIN 0.1 WHERE TargetInstance ISA "Win32_Process" AND TargetInstance.Name="pwsh.exe" AND TargetInstance.ParentProcessId=' + parentProcessId;
  // Wait for the process to exit.
  SWbemService.ExecNotificationQuery(wmiQuery).NextEvent();
}