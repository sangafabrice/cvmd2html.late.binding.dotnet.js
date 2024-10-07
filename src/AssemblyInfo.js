@cc_on

@set @MAJOR = 0
@set @MINOR = 0
@set @BUILD = 1
@set @REVISION = 2

import System.Reflection;
import System.Management;
import System.Diagnostics;
import cvmd2html;
import Microsoft.JScript;
import System;
import System.IO;
import System.Text;
import System.Drawing;
import System.Windows.Forms;
import System.Runtime.InteropServices;
import System.ComponentModel;
import System.Security.Principal;
import Microsoft.Win32;
import IWshRuntimeLibrary;

[assembly: AssemblyProduct('CvMd2Html Shortcut')]
[assembly: AssemblyInformationalVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyCopyright('\u00A9 2024 sangafabrice')]
[assembly: AssemblyCompany('sangafabrice')]
[assembly: AssemblyVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyTitle('CvMd2Html')]