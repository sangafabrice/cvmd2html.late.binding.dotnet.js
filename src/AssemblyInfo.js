import Microsoft.JScript;
import System;
import System.Runtime.InteropServices;
import System.Reflection;
import Microsoft.VisualBasic.FileIO;
import Microsoft.VisualBasic;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

/** @typedef {object} Scriptlet */
var Scriptlet = Interaction.CreateObject('Scriptlet.TypeLib');
/** @typedef {object} SWbemService */
var SWbemService = Interaction.CreateObject('WbemScripting.SWbemLocator').ConnectServer();
/** @typedef {object} StdRegProv */
var StdRegProv = SWbemService.Get('StdRegProv');