/**
 * @file Entry point
 * @version 0.0.1.2
 */

Program.Main(Convert.ToNativeArray(Environment.GetCommandLineArgs(), Type.GetTypeHandle(new String())).slice(1));