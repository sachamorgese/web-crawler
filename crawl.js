const { getUrlsFromHtml } = require("./getUrlsFromHtml");

function normalizeURL(url) {
  return url.replace(/http.*\/\/|\/$|(\/)?\?.*$/g, "");
}

async function crawlPage(baseUrl, url = "", pages = {}) {
  try {
    if (url.startsWith("http")) {
      return pages;
    }

    const fullUrl = normalizeURL(baseUrl) + normalizeURL(url);

    if (typeof pages[fullUrl] === "number") {
      pages[fullUrl]++;
      return pages;
    } else {
      if (normalizeURL(fullUrl) === normalizeURL(baseUrl)) {
        pages[fullUrl] = 0;
      } else {
        pages[fullUrl] = 1;
      }
    }

    const pageRes = await fetch(baseUrl + url);

    console.log("Crawling", url, pageRes.status);

    if (pageRes.status >= 400) {
      console.error("Failed to crawl", url);
      return;
    }

    if (!pageRes.headers.get("content-type").includes("text/html")) {
      console.log("Skipping", url);
      return;
    }

    const pageHtml = await pageRes.text();

    const urls = await getUrlsFromHtml(pageHtml);

    const tempPages = pages;
    for (const url of urls) {
      await crawlPage(baseUrl, url, tempPages);
    }
    return tempPages;
  } catch (err) {
    console.error("Failed to crawl", url, err);
  }
}

module.exports = {
  normalizeURL,
  crawlPage,
};
