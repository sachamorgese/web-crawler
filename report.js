function printReport(pages) {
  const sortedReport = Object.entries(pages).sort((a, b) => b[1] - a[1]);

  for (const [key, value] of sortedReport) {
    console.log(`Found ${value} internal links to ${key}`);
  }
}

module.exports = {
  printReport,
};
