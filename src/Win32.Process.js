/**
 * @file WMI classes as inspired by mgmclassgen.exe.
 * @version 0.0.1.1
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

    /// <summary>Wait for the cmd process exit.</summary>
    /// <param name="ProcessId">The process identifier.</param>
    static function WaitForExit(ProcessId: uint) {
      var monikerPath: String = 'Win32_Process=' + ProcessId;
      try {
        while ((new ManagementObject(monikerPath)).Properties['Name'].Value == 'cmd.exe') { }
      } catch (error) { }
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
}