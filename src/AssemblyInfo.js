@cc_on

@set @MAJOR = 0
@set @MINOR = 0
@set @BUILD = 1
@set @REVISION = 2

import System.Management;
@if (@Win32ProcessWim)
import System.Diagnostics;
@else
import System.Reflection;
import System;
import System.IO;
import System.Text;
import System.Drawing;
import System.Windows.Forms;
import System.Runtime.InteropServices;
import Microsoft.Win32;
import Shell32;
import ROOT.CIMV2.WIN32;
@end