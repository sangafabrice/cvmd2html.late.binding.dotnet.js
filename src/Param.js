/**
 * @file returns the parsed parameters.
 * @version 0.0.1.2
 */

package cvmd2html {

  internal abstract class Param {
  
    /// <summary>The parameter object.</summary>
    private static var _param: Object = ParseCommandLine(Environment.GetCommandLineArgs());
  
    /// <summary>Get the input markdown path.</summary>
    /// <remarks>It is an object as an alternative to nullable string.</remarks>
    static function get Markdown(): Object {
      return _param.Markdown;
    }
  
    /// <summary>Specify to configure the shortcut in the registry.</summary>
    static function get Set(): Boolean {
      return _param.Set;
    }
  
    /// <summary>Specify to remove the shortcut menu.</summary>
    static function get Unset(): Boolean {
      return _param.Unset;
    }
  
    /// <summary>Specify to configure the shortcut without the icon.</summary>
    static function get NoIcon(): Boolean {
      return _param.NoIcon;
    }
  
    /// <summary>Parse the command line arguments.</summary>
    /// <param name="args">The command line arguments array.</param>
    private static function ParseCommandLine(args: String[]) {
      if (args.length == 2) {
        var arg: String = args[1];
        var paramNameValue: String[] = arg.Split(char[]([':']),2);
        var paramMarkdown: String = '';
        if (paramNameValue.length == 2 && !String.Compare(paramNameValue[0], '/Markdown', true) && (paramMarkdown = paramNameValue[1]).length > 0) {
          return {
            Markdown: paramMarkdown
          }
        }
        switch (arg.ToLower()) {
          case '/set':
            return {
              Set: true,
              NoIcon: false
            }
          case '/set:noicon':
            return {
              Set: true,
              NoIcon: true
            }
          case '/unset':
            return {
              Unset: true
            }
        }
      } else if (args.length == 1) {
        return {
          Set: true,
          NoIcon: false
        }
      }
      ShowHelp();
    }
  
    /// <summary>Show help and quit.</summary>
    private static function ShowHelp() {
      var helpTextBuilder: StringBuilder = new StringBuilder();
      with (helpTextBuilder) {
        AppendLine('The MarkdownToHtml shortcut launcher.');
        AppendLine('It starts the shortcut menu target script in a hidden window.');
        AppendLine();
        AppendLine('Syntax:');
        AppendLine('  Convert-MarkdownToHtml /Markdown:<markdown file path>');
        AppendLine('  Convert-MarkdownToHtml [/Set[:NoIcon]]');
        AppendLine('  Convert-MarkdownToHtml /Unset');
        AppendLine('  Convert-MarkdownToHtml /Help');
        AppendLine();
        AppendLine("<markdown file path>  The selected markdown's file path.");
        AppendLine('                 Set  Configure the shortcut menu in the registry.');
        AppendLine('              NoIcon  Specifies that the icon is not configured.');
        AppendLine('               Unset  Removes the shortcut menu.');
        AppendLine('                Help  Show the help doc.');
      }
      MessageBox.Show(helpTextBuilder);
      Program.Quit(1);
    }
  }
}