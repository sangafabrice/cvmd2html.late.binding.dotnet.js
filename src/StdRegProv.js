/**
 * @file WMI classes as inspired by mgmclassgen.exe.
 * @version 0.0.1.1
 */

package ROOT.CIMV2 {

  abstract class StdRegProv {

    private static var CreatedClassName: String = 'StdRegProv';

    /// <remarks>uRequired is not needed. That is why I removed it from the method signature.</remarks>
    static function CheckAccess(hDefKey: uint, sSubKeyName: String): Boolean {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['hDefKey'] = hDefKey;
      inParams['sSubKeyName'] = sSubKeyName;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['bGranted'].Value;
    }

    static function CreateKey(hDefKey: uint, sSubKeyName: String): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['hDefKey'] = hDefKey;
      inParams['sSubKeyName'] = sSubKeyName;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['ReturnValue'].Value;
    }

    static function DeleteKey(hDefKey: uint, sSubKeyName: String): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['hDefKey'] = hDefKey;
      inParams['sSubKeyName'] = sSubKeyName;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['ReturnValue'].Value;
    }

    static function DeleteValue(hDefKey: uint, sSubKeyName: String, sValueName: String): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['hDefKey'] = hDefKey;
      inParams['sSubKeyName'] = sSubKeyName;
      inParams['sValueName'] = sValueName;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['ReturnValue'].Value;
    }

    static function EnumKey(hDefKey: uint, sSubKeyName: String): String[] {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['hDefKey'] = hDefKey;
      inParams['sSubKeyName'] = sSubKeyName;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['sNames'].Value;
    }

    static function GetStringValue(hDefKey: uint, sSubKeyName: String, sValueName: String): String {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      if (hDefKey) {
        inParams['hDefKey'] = hDefKey;
      }
      inParams['sSubKeyName'] = sSubKeyName;
      inParams['sValueName'] = sValueName;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['sValue'].Value;
    }

    static function SetStringValue(hDefKey: uint, sSubKeyName: String, sValueName: String, sValue: String): uint {
      var stackTrace: StackTrace = new StackTrace();
      var methodName: String = Util.GetMethodName(stackTrace);
      var classObj: ManagementClass = new ManagementClass(CreatedClassName);
      var inParams: ManagementBaseObject = classObj.GetMethodParameters(methodName);
      inParams['hDefKey'] = hDefKey;
      inParams['sSubKeyName'] = sSubKeyName;
      inParams['sValueName'] = sValueName;
      inParams['sValue'] = sValue;
      return classObj.InvokeMethod(methodName, inParams, null).Properties['ReturnValue'].Value;
    }

    /// <summary>Remove the key and all descendant subkeys.</summary>
    static function DeleteKeyTree(hDefKey: uint, sSubKeyName: String): uint {
      var returnValue: uint = 0;
      var sNames = EnumKey(hDefKey, sSubKeyName);
      if (sNames != null) {
        for (var index = 0; index < sNames.length; index++) {
          returnValue += DeleteKeyTree(hDefKey, sSubKeyName + '\\' + sNames[index]);
        }
      }
      return (returnValue += DeleteKey(hDefKey, sSubKeyName));
    }
  }
}