@cc_on

@set @MAJOR = 0
@set @MINOR = 0
@set @BUILD = 1
@set @REVISION = 2

import System.Runtime.InteropServices;
import System.Reflection;
@if (@StdRegProvWim || @Win32ProcessWim)
import System.Diagnostics;
import WbemScripting;
@else
import System;
import System.Reflection.Emit;
import IWshRuntimeLibrary;
import Shell32;
import ROOT.CIMV2;
import ROOT.CIMV2.WIN32;
@end

[assembly: AssemblyProduct('CvMd2Html Shortcut')]
[assembly: AssemblyInformationalVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyCopyright('\u00A9 2024 sangafabrice')]
[assembly: AssemblyCompany('sangafabrice')]
[assembly: AssemblyVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
@if (@StdRegProvWim)
[assembly: AssemblyTitle('StdRegProv')]
@elif (@Win32ProcessWim)
[assembly: AssemblyTitle('Win32_Process')]
@else
[assembly: AssemblyTitle('CvMd2Html')]
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