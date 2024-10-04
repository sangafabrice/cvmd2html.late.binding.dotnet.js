import Microsoft.JScript;
import System;
import System.Runtime.InteropServices;
import System.Reflection;
import Microsoft.VisualBasic.FileIO;
import Microsoft.VisualBasic;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

/** @typedef {object} WshShell */
var WshShell = Interaction.CreateObject('WScript.Shell');
/** @typedef {object} StdRegProv */
var StdRegProv = Interaction.GetObject('winmgmts:StdRegProv');