/**
 * @file Class entry called in index.js.
 * @version 0.0.1.1
 */

package cvmd2html {

  abstract class Program {

    static function Main(args: String[]): void {

      RequestAdminPrivileges(args);

      /** The application execution. */
      if (Param.Markdown) {
        Package.IconLink.Create(Param.Markdown);
        if (RunIconLink(Package.IconLink.Path, ErrorLog.Path)) {
          ErrorLog.Read();
          ErrorLog.Delete();
        }
        Package.IconLink.Delete();
        Quit(0);
      }

      /** Configuration and settings. */
      if (Param.Set || Param.Unset) {
        if (Param.Set) {
          Setup.Set();
          if (Param.NoIcon) {
            Setup.RemoveIcon();
          } else {
            Setup.AddIcon(Package.MenuIconPath);
          }
        } else if (Param.Unset) {
          Setup.Unset();
        }
        Quit(0);
      }

      Quit(1);
    }

    private static var _assemblyLocation: String = Assembly.GetExecutingAssembly().Location;

    /// <summary>The assembly full path.</summary>
    internal static function get Path(): String {
      return _assemblyLocation;
    }
    
    /// <summary>Clean up and quit.</summary>
    /// <param name="exitCode">The exit code.</param>
    internal static function Quit(exitCode: int) {
      GC.Collect();
      Environment.Exit(exitCode);
    }

    /// <summary>Request administrator privileges if standard user.</summary>
    /// <param name="args">The input arguments.</param>
    private static function RequestAdminPrivileges(args: String[]) {
      // Check if the current user is admin.
      if ((new WindowsPrincipal(WindowsIdentity.GetCurrent())).IsInRole(WindowsBuiltInRole.Administrator)) {
        return;
      }
      var appStartInfo: ProcessStartInfo = new ProcessStartInfo(_assemblyLocation, String.Format('"{0}"', args.join('" "')));
      appStartInfo.UseShellExecute = true;
      appStartInfo.Verb = 'runas';
      appStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
      try {
        Process.Start(appStartInfo);
      } catch (error: Win32Exception) {
        Quit(0);
      } catch (error: Exception) {
        Quit(1);
      }
      Quit(0);
    }

    /// <summary>Execute the icon link.</summary>
    /// <param name="iconLinkPath">The icon link file path.</param>
    /// <param name="errorLogPath">The error log file path.</param>
    /// <returns>The exit status.</returns>
    private static function RunIconLink(iconLinkPath: String, errorLogPath: String): uint {
      var appStartInfo: ProcessStartInfo = new ProcessStartInfo('C:\\Windows\\System32\\cmd.exe', String.Format('/d /c ""{0}" 2> "{1}""', iconLinkPath, errorLogPath));
      appStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
      return WaitForExit(Process.Start(appStartInfo).Id);
    }

    /// <summary>Wait for the cmd process exit.</summary>
    /// <param name="ProcessId">The process identifier.</param>
    /// <returns>The exit status.</returns>
    private static function WaitForExit(ProcessId: int): uint {
      // The process termination event query.
      var wmiQuery: String = 'SELECT * FROM Win32_ProcessStopTrace WHERE ProcessName="cmd.exe" AND ProcessId=' + ProcessId;
      return (new ManagementEventWatcher(wmiQuery)).WaitForNextEvent().Properties['ExitStatus'].Value;
    }
  }
}