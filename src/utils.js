/**
 * @file separate the utils and setup processes from the application logic.
 * @version 0.0.1
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
    return formatStr.replace(/\{0\}/g, args);
  }
  while (args.length > 0) {
    formatStr = formatStr.replace(new RegExp('\\{' + (args.length - 1) + '\\}', 'g'), args.pop());
  }
  return formatStr;
}

/**
 * Clean up and quit.
 * @param {number} exitCode .
 */
function quit(exitCode) {
  try {    
    Package.Dispose();
  } catch (error) { }
  try {    
    ErrorLog.Dispose();
  } catch (error) { }
  try {    
    Setup.Dispose();
  } catch (error) { }
  CollectGarbage();
  Environment.Exit(exitCode);
}