/**
 * @file WMI classes as inspired by mgmclassgen.exe.
 * @version 0.0.1.2
 */

package ROOT.CIMV2.WIN32 {

  abstract class Process {

    /// <remarks>
    /// Initializing the Process.CurrentDirectory causes an issue.
    /// That is why I removed it from the method signature.
    /// </remarks>
    static function Create(CommandLine: String, ProcessStartupInformation: ManagementBaseObject): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass('Win32_Process');
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['CommandLine'] = CommandLine;
      inParams['ProcessStartupInformation'] = ProcessStartupInformation;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['ProcessId'].Value;
    }

    /// <remarks>
    /// Use-case specific method. ProcessStartupInformation is made optional.
    /// </remarks>
    static function Create(CommandLine: String): uint {
      return Create(CommandLine, ProcessStartup.CreateInstance());
    }

    /// <summary>Wait for the child process exit.</summary>
    /// <param name="ParentProcessId">The parent process identifier.</param>
    static function WaitForChildExit(ParentProcessId: uint) {
      var wmiQuery = 'SELECT * FROM Win32_Process WHERE Name="pwsh.exe" AND ParentProcessId=' + ParentProcessId;
      var getProcessCount = function() {
        return (new ManagementObjectSearcher(wmiQuery)).Get().Count;
      }
      // Wait for the process to start.
      while (getProcessCount() == 0) { }
      // Wait for the process to exit.
      while (getProcessCount()) { }
    }
  }

  abstract class ProcessStartup {

    /// <summary>We change the default value of the ProcessStartup instance to HIDDEN.</summary>
    static function CreateInstance(): ManagementBaseObject {
      var WINDOW_STYLE_HIDDEN: uint = 0;
      var startInfo: ManagementBaseObject = (new ManagementClass('Win32_ProcessStartup')).CreateInstance();
      startInfo['ShowWindow'] = WINDOW_STYLE_HIDDEN;
      return startInfo;
    }
  }

  internal abstract class Util {

    /// <summary>Get the name of the method calling this method.</summary>
    /// <remarks>
    /// The method should initialize the stackTrace variable in its scope
    /// before calling GetMethodName. So avoid GetMethodName(new stackTrace()).
    /// </remarks>
    /// <param name="stackTrace">The stack trace from the calling method.</param>
    static function GetMethodName(stackTrace: StackTrace): String {
      return stackTrace.GetFrame(0).GetMethod().Name;
    }
  }
}