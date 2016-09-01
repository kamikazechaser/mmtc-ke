/**
 * The MIT License (MIT)
 * Copyright (c) 2016 GochoMugo <mugo@forfuture.co.ke>
 * Copyright (c) 2016 Forfuture, LLC <we@forfuture.co.ke>
 *
 * Pages.
 */


exports = module.exports = {
  /**
   * Load HTML content from a markdown file, usually to be inserted into
   * a shell page, as the main content.
   *
   * @todo Add caching
   *
   * @param {String} filepath - path to markdown file
   * @param {Function} done - callback
   */
  getHTML: getHTML,
};


// built-in modules
const fs = require('fs');


// npm-installed modules
const showdown = require('showdown');


// module variables
const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  tables: true,
});


function getHTML(filepath, done) {
  return fs.readFile(filepath, 'utf8', function(readFileErr, markdown) {
    if (readFileErr) {
      return done(readFileErr);
    }

    const html = converter.makeHtml(markdown);
    return done(null, html);
  });
}
