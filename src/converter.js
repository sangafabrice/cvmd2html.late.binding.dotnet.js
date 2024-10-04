/**
 * @file returns the method to convert from markdown to html.
 * @version 0.0.1.4
 */

/**
 * Represents the markdown to html converter.
 * @typedef {object} MarkdownToHtml
 */

var CreateConverter = (function() {
  /** @constant {regexp} */
  var MARKDOWN_REGEX = /\.md$/i;

  /**
   * @param {string} htmlLibraryPath is the path string of the html loading the library.
   * @param {string} jsLibraryPath is the javascript library path.
   * @returns {object} the Converter type.
   */
  return function (htmlLibraryPath, jsLibraryPath) {
    /** @class @constructs MarkdownToHtml */
    function MarkdownToHtml() { }

    /**
     * Show a warning message or an error message box.
     * The function does not return anything when the message box is an error.
     * @public @static @memberof MessageBox
     * @param {string} message is the message text.
     * @param {number} [messageType = ERROR_MESSAGE] message box type (Warning/Error).
     * @returns {string|void} "Yes" or "No" depending on the user's click when the message box is a warning.
     */
    MarkdownToHtml.ConvertFrom = function (markdownPath) {
      // Validate the input markdown path string.
      if (!MARKDOWN_REGEX.test(markdownPath)) {
        MessageBox.Show(format('"{0}" is not a markdown (.md) file.', markdownPath));
      }
      SetHtmlContent(GetHtmlPath(markdownPath), ConvertToHtml(GetContent(markdownPath)));
    }

    /**
     * Convert a markdown content to an html document.
     * @param {string} mardownContent is the content to convert.
     * @returns {string} the output html document content. 
     */
    function ConvertToHtml(markdownContent) {
      // Build the HTML document that will load the showdown.js library.
      var document = Activator.CreateInstance(Type.GetTypeFromProgID('htmlFile'));
      document.open();
      document.IHTMLDocument2_write(format(GetContent(htmlLibraryPath), GetContent(jsLibraryPath)));
      document.close();
      document.body.innerText = markdownContent;
      document.parentWindow.execScript('convertMarkdown()', 'javascript');
      try {
        return document.body.innerHTML;
      } finally {
        if (document) {
          Marshal.FinalReleaseComObject(document);
          document = null;
        }
      }
    }

    /**
     * This function returns the output path when it is unique without prompts or when
     * the user accepts to overwrite an existing HTML file. Otherwise, it exits the script.
     * @returns {string} the output html path.
     */
    function GetHtmlPath(markdownPath) {
      var htmlPath = markdownPath.replace(MARKDOWN_REGEX, '.html');
      if (FileSystem.FileExists(htmlPath)) {
        MessageBox.Show(format('The file "{0}" already exists.\n\nDo you want to overwrite it?', htmlPath), MessageBox.WARNING);
      } else if (FileSystem.DirectoryExists(htmlPath)) {
        MessageBox.Show(format('"{0}" cannot be overwritten because it is a directory.', htmlPath));
      }
      return htmlPath;
    }

    /**
     * Get the content of a file.
     * @param {string} filePath is path that is read.
     * @returns {string} the content of the file.
     */
    function GetContent(filePath) {
      try {
        with (FileSystem.OpenTextFileReader(filePath)) {
          var content = ReadToEnd();
          Close();
          Dispose();
        }
        return content;
      } catch (error) {
        MessageBox.Show(error.message);
      } 
    }

    /**
     * Write the html text to the output HTML file.
     * It notifies the user when the operation did not complete with success.
     * @param {string} htmlPath is the output html path.
     * @param {string} htmlContent is the content of the html file.
     */
    function SetHtmlContent(htmlPath, htmlContent) {
      try {
        var txtStream = FileSystem.OpenTextFileWriter(htmlPath, false);
        txtStream.Write(htmlContent);
      } catch (error) {
        MessageBox.Show(error.message);
      } finally {
        if (txtStream) {
          txtStream.Close();
          txtStream.Dispose();
        }
      }
    }

    return MarkdownToHtml;
  }
})();