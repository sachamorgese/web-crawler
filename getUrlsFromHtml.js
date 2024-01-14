const { JSDOM } = require("jsdom");

function getUrlsFromHtml(html) {
  const dom = new JSDOM(html);

  const links = dom.window.document.querySelectorAll("a");
  return Array.from(links).map((link) => link.href);
}

module.exports = {
  getUrlsFromHtml,
};
