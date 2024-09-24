import Microsoft.JScript;
import System;
import System.Runtime.InteropServices;
import System.Reflection;

var AssemblyLocation = Assembly.GetExecutingAssembly().Location;

/** @typedef {object} FileSystem */
var FileSystem = new ActiveXObject('Scripting.FileSystemObject');
/** @typedef {object} WshShell */
var WshShell = new ActiveXObject('WScript.Shell');
/** @typedef {object} Scriptlet */
var Scriptlet = new ActiveXObject('Scriptlet.TypeLib');
/** @typedef {object} Shell */
var Shell = new ActiveXObject('Shell.Application');
/** @typedef {object} SWbemService */
var SWbemService = (new ActiveXObject('WbemScripting.SWbemLocator')).ConnectServer();
/** @typedef {object} StdRegProv */
var StdRegProv = SWbemService.Get('StdRegProv');