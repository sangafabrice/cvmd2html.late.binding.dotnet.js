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
  waitForChildExit(processService.ExecMethod_(createMethod.Name, inParam).ProcessId);
  Package.IconLink.Delete();
  ErrorLog.Read();
  ErrorLog.Delete();
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
 * Wait for the child process exit.
 * @param {number} parentProcessId is the parent process identifier.
 */
function waitForChildExit(parentProcessId) {
  // Select the process whose parent is the intermediate process used for executing the link.
  var wmiQuery = 'SELECT * FROM Win32_Process WHERE Name="pwsh.exe" AND ParentProcessId=' + parentProcessId;
  var getProcess = function() {
    return (new Enumerator(GetObject('winmgmts:').ExecQuery(wmiQuery))).item();
  }
  // Wait for the process to start.
  while (getProcess() == null) { }
  // Wait for the process to exit.
  while (getProcess() != null) { }
}