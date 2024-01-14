const { it, describe, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

describe("normalizeURL", () => {
  it("normalizes the URL", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(
      "blog.boot.dev/path",
    );
  });

  it("normalizeURL doesn't remove subdomains", () => {
    expect(normalizeURL("https://sub.blog.boot.dev/path/")).toBe(
      "sub.blog.boot.dev/path",
    );
    expect(normalizeURL("https://sub.blog.boot.dev/path")).toBe(
      "sub.blog.boot.dev/path",
    );
    expect(normalizeURL("http://sub.blog.boot.dev/path/")).toBe(
      "sub.blog.boot.dev/path",
    );
    expect(normalizeURL("http://sub.blog.boot.dev/path")).toBe(
      "sub.blog.boot.dev/path",
    );
  });

  it("normalizeURL doesn't remove ports", () => {
    expect(normalizeURL("https://blog.boot.dev:8080/path/")).toBe(
      "blog.boot.dev:8080/path",
    );
    expect(normalizeURL("https://blog.boot.dev:8080/path")).toBe(
      "blog.boot.dev:8080/path",
    );
    expect(normalizeURL("http://blog.boot.dev:8080/path/")).toBe(
      "blog.boot.dev:8080/path",
    );
    expect(normalizeURL("http://blog.boot.dev:8080/path")).toBe(
      "blog.boot.dev:8080/path",
    );
  });

  it("normalizeURL removes query strings", () => {
    expect(normalizeURL("https://blog.boot.dev/path/?q=1")).toBe(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("https://blog.boot.dev/path?q=1")).toBe(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("http://blog.boot.dev/path/?q=1")).toBe(
      "blog.boot.dev/path",
    );
    expect(normalizeURL("http://blog.boot.dev/path?q=1")).toBe(
      "blog.boot.dev/path",
    );
  });

  it("normalizeURL throws error when the argument is not a URL ", () => {
    expect(() => normalizeURL("not a url")).toThrow();
    expect(() => normalizeURL("not a url")).toThrowError(
      "Invalid URL: not a url",
    );
  });
});
