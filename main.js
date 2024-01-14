const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

function main() {
  if (process.argv.length > 3) {
    console.error("Too many arguments");
    process.exit(1);
  }

  const url = process.argv[2];

  if (!url) {
    console.error("Please provide a URL");
    process.exit(1);
  }

  console.log("Starting crawl of", url);
  crawlPage(url, "/").then((pages) => {
    console.log("Crawl complete");
    printReport(pages);
  });
}

main();
