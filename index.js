/**
 * @file Launches the shortcut target PowerShell script with the selected markdown as an argument.
 * It aims to eliminate the flashing console window when the user clicks on the shortcut menu.
 * @version 0.0.1.3
 */

/** The application execution. */
if (Param.Markdown) {
  var WINDOW_STYLE_HIDDEN = 0xC;
  var startInfo = GetObject('winmgmts:Win32_ProcessStartup').SpawnInstance_();
  startInfo.ShowWindow = WINDOW_STYLE_HIDDEN;
  var processService = GetObject('winmgmts:Win32_Process');
  var createMethod = processService.Methods_.Item('Create');
  var inParam = createMethod.InParameters.SpawnInstance_();
  inParam.CommandLine = format('C:\\Windows\\System32\\cmd.exe /d /c ""{0}" 2> "{1}""', [Package.IconLink.Path, ErrorLog.Path]);
  inParam.ProcessStartupInformation = startInfo;
  Package.IconLink.Create(Param.Markdown);
  if (waitForExit(processService.ExecMethod_(createMethod.Name, inParam).ProcessId)) {
    ErrorLog.Read();
    ErrorLog.Delete();
  }
  Package.IconLink.Delete();
  Marshal.FinalReleaseComObject(inParam);
  Marshal.FinalReleaseComObject(createMethod);
  Marshal.FinalReleaseComObject(processService);
  Marshal.FinalReleaseComObject(startInfo);
  startInfo = null;
  processService = null;
  createMethod = null;
  inParam = null;
  quit(0);
}

/**
 * Wait for the process exit.
 * @param {number} processId is the process identifier.
 * @return {number} the process exit code.
 */
function waitForExit(processId) {
  // The process termination event query.
  var wmiQuery = 'SELECT * FROM Win32_ProcessStopTrace WHERE ProcessName="cmd.exe" AND ProcessId=' + processId;
  // Wait for the process to exit.
  return GetObject('winmgmts:').ExecNotificationQuery(wmiQuery).NextEvent().ExitStatus;
}