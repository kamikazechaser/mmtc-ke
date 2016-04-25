/**
 * The MIT License (MIT)
 * Copyright (c) 2016 Forfuture LLC
 *
 * Pages
 */


exports = module.exports = {
  getHTML: getHTML,
};


// built-in modules
var fs = require('fs');


// npm-installed modules
var showdown = require('showdown');


// module variables
var converter = new showdown.Converter({
  simplifiedAutoLink: true,
  tables: true,
});


/**
 * Load HTML content from a markdown file, usually to be inserted into
 * a shell page, as the main content.
 *
 * @todo Add caching
 *
 * @param {String} filepath - path to markdown file
 * @param {Function} done - callback
 */
function getHTML(filepath, done) {
  return fs.readFile(filepath, 'utf8', function(readFileErr, markdown) {
    if (readFileErr) {
      return done(readFileErr);
    }

    var html = converter.makeHtml(markdown);
    return done(null, html);
  });
}
