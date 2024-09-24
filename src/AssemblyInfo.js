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
/** @typedef {object} StdRegProv */
var StdRegProv = GetObject('winmgmts:StdRegProv');