/**
 * @file separate the utils and setup processes from the application logic.
 * @version 0.0.1.3
 */

/** Configuration and settings. */
if (Param.Set || Param.Unset) {
  if (Param.Set) {
    Setup.Set(Param.NoIcon, Package.MenuIconPath);
  } else if (Param.Unset) {
    Setup.Unset();
  }
  quit(0);
}

quit(1);

/**
 * Replace the format item "{n}" by the nth input in a list of arguments.
 * @param {string} formatStr the pattern format.
 * @param {string|string[]} args the replacement texts.
 * @returns {string} a copy of format with the format items replaced by args.
 */
function format(formatStr, args) {
  if (args.constructor !== Array) {
    return Strings.Replace(formatStr, '{0}', args);
  }
  while (args.length > 0) {
    formatStr = Strings.Replace(formatStr, '{' + (args.length - 1) + '}', args.pop());
  }
  return formatStr;
}

/**
 * Clean up and quit.
 * @param {number} exitCode .
 */
function quit(exitCode) {
  Marshal.FinalReleaseComObject(StdRegProv);
  Marshal.FinalReleaseComObject(WshShell);
  WshShell = null;
  StdRegProv = null;
  GC.Collect();
  Environment.Exit(exitCode);
}