@set @MAJOR = 0
@set @MINOR = 0
@set @BUILD = 1
@set @REVISION = 2

import Microsoft.JScript;
import System;
import System.Runtime.InteropServices;
import System.Reflection;

[assembly: AssemblyProduct('CvMd2Html Shortcut')]
[assembly: AssemblyInformationalVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyCopyright('\u00A9 2024 sangafabrice')]
[assembly: AssemblyCompany('sangafabrice')]
[assembly: AssemblyVersion(@MAJOR + '.' + @MINOR + '.' + @BUILD + '.' + @REVISION)]
[assembly: AssemblyTitle('CvMd2Html')]

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;