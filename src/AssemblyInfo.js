@cc_on

import System.Runtime.InteropServices;
@if (@StdRegProvWim)
import System.Diagnostics;
import WbemScripting;
@else
import System;
import System.Reflection;
import System.Reflection.Emit;
import IWshRuntimeLibrary;
import ROOT.CIMV2;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

var FileSystem = new FileSystemObjectClass();
var WshShell = new WshShellClass();
@end