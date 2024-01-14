const { getUrlsFromHtml } = require("./getUrlsFromHtml");
const { describe, it, expect } = require("@jest/globals");

describe("getUrlsFromHtml", () => {
  it("returns an empty array if no links are found", () => {
    expect(getUrlsFromHtml("")).toEqual([]);
  });

  it("returns an array of links", () => {
    const html = `
      <html lang="">
        <body>
          <a href="https://www.google.com">Google</a>
          <a href="https://www.facebook.com">Facebook</a>
        </body>
      </html>
    `;

    expect(getUrlsFromHtml(html)).toEqual([
      "https://www.google.com/",
      "https://www.facebook.com/",
    ]);
  });
});
