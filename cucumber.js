// Cucumber runs the compiled JavaScript in dist/ — `npm test` builds it first.
module.exports = {
  default: {
    require: ["dist/src/hooks/*.js", "dist/src/steps/*.js"],
    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json",
      "junit:reports/cucumber-report.xml",
    ],
    formatOptions: { snippetInterface: "async-await" },
  },
};
