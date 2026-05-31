module.exports = {
  default: {
    require: ['dist/src/hooks/*.js', 'dist/src/steps/*.js'],
    format: [
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'progress-bar'
    ],
    formatOptions: { snippetInterface: 'async-await' }
  }
}