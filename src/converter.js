/**
 * @file returns the method to convert from markdown to html.
 * @version 0.0.1.3
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
   * @param {string} jsLibraryPath is the javascript library path.
   * @returns {object} the Converter type.
   */
  return function (jsLibraryPath) {
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
      var document = new ActiveXObject('htmlFile');
      document.open();
      document.IHTMLDocument2_write(
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
          '<meta charset="UTF-8" />' +
          '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
          '<script type="text/javascript">' +
            GetContent(jsLibraryPath) +
            'function convertMarkdown() {' +
              'document.body.innerHTML = (new showdown.Converter()).makeHtml(document.body.innerText);' +
            '}' +
          '</script>' +
        '</head>' +
        '<body>' +
        '</body>' +
        '</html>'
      );
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