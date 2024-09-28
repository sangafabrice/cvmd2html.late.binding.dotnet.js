/**
 * @file returns the method to convert from markdown to html.
 * @version 0.0.1.5
 */

/**
 * Represents the markdown to html converter.
 * @typedef {object} MarkdownToHtml
 */

var CreateConverter = (function() {
  /** @constant {int32} */
  var PERMISSION_DENIED = Convert.ToInt32(0x800A0046);
  /** @constant {int32} */
  var FILE_NOT_FOUND = Convert.ToInt32(0x800A0035);

  /** @constant {regexp} */
  var MARKDOWN_REGEX = /\.md$/i;

  /**
   * @param {string} htmlLibraryPath is the path string of the html loading the library.
   * @returns {object} the Converter type.
   */
  return function (htmlLibraryPath) {
    /** @class @constructs MarkdownToHtml */
    function MarkdownToHtml() { }

    /**
     * Convert the content of the markdown file and write it to an html file.
     * @public @static @memberof MarkdownToHtml
     * @param {string} markdownPath is the markdown file path.
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
      with (new WebBrowser()) {
        ScriptErrorsSuppressed = true;
        Navigate('about:blank');
        var document = Document.DomDocument;
      }
      document.open();
      document.IHTMLDocument2_write(GetContent(htmlLibraryPath));
      document.close();
      // Wait for the convertMarkdown method to load.
      while (true) {
        try {
          document.body.innerText = markdownContent;
          document.parentWindow.execScript('convertMarkdown()', 'javascript');
          var htmlContent = document.body.innerHTML;
          if (document) {
            Marshal.FinalReleaseComObject(document);
            document = null;
          }
          return htmlContent;
        } catch (error) { }
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
      } else if (FileSystem.FolderExists(htmlPath)) {
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
      var FOR_READING = 1;
      try {
        with (FileSystem.OpenTextFile(filePath, FOR_READING)) {
          var content = ReadAll();
          Close();
        }
        return content;
      } catch (error: Exception) {
        switch (error.HResult) {
          case PERMISSION_DENIED:
            if (!FileSystem.FolderExists(filePath)) {
              MessageBox.Show(format('Access to the path "{0}" is denied.', filePath));
            }
          case FILE_NOT_FOUND:
            MessageBox.Show(format('File "{0}" is not found.', filePath));
          default:
            MessageBox.Show(format('Unspecified error trying to read from "{0}".', filePath));
        }
      } 
    }

    /**
     * Write the html text to the output HTML file.
     * It notifies the user when the operation did not complete with success.
     * @param {string} htmlPath is the output html path.
     * @param {string} htmlContent is the content of the html file.
     */
    function SetHtmlContent(htmlPath, htmlContent) {
      var FOR_WRITING = 2;
      try {
        var txtStream = FileSystem.OpenTextFile(htmlPath, FOR_WRITING, true);
        txtStream.Write(htmlContent);
      } catch (error: Exception) {
        if (error.HResult == PERMISSION_DENIED) {
          MessageBox.Show(format('Access to the path "{0}" is denied.', htmlPath));
        } else {
          MessageBox.Show(format('Unspecified error trying to write to "{0}".', htmlPath));
        }
      } finally {
        if (txtStream) {
          txtStream.Close();
          Marshal.FinalReleaseComObject(txtStream);
          txtStream = null;
        }
      }
    }

    return MarkdownToHtml;
  }
})();