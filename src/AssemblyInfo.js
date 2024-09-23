@cc_on

@set @MAJOR = 0
@set @MINOR = 0
@set @BUILD = 1
@set @REVISION = 2

import System.Reflection;
import System.Management;
@if (@StdRegProvWim || @Win32ProcessWim)
import System.Diagnostics;
@else
import System;
import System.IO;
import System.Text;
import System.Drawing;
import System.Windows.Forms;
import System.Runtime.InteropServices;
import IWshRuntimeLibrary;
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
@end