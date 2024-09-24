@cc_on

import System.Runtime.InteropServices;
@if (@StdRegProvWim || @Win32ProcessWim)
import System.Diagnostics;
import WbemScripting;
@else
import System;
import System.Reflection;
import System.Reflection.Emit;
import IWshRuntimeLibrary;
import Shell32;
import ROOT.CIMV2;
import ROOT.CIMV2.WIN32;
@end

@if (@StdRegProvWim)
package ROOT.CIMV2 {
@elif (@Win32ProcessWim)
package ROOT.CIMV2.WIN32 {
@end
@if (@StdRegProvWim || @Win32ProcessWim)
  internal abstract class Util {

    /**
     * Get the name of the method calling this method.
     * NOTE: the method should initialize the stackTrace variable in its scope
     * before calling GetMethodName. So avoid GetMethodName(new stackTrace()).
     * @param stackTrace is the stack trace from the calling method.
     */
    static function GetMethodName(stackTrace: StackTrace): String {
      return stackTrace.GetFrame(0).GetMethod().Name;
    }
  }
}
@else
var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

var FileSystem = new FileSystemObjectClass();
var WshShell = new WshShellClass();
var Shell = new ShellClass();
@end