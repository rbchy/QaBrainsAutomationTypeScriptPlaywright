// =============================================
// config/config.ts
// Java-এর config.properties + ConfigReader এর TypeScript equivalent
// =============================================

export const config = {
  // Application URL
  url: "https://practice.qabrains.com/",

  // Browser Configuration
  browser: "chromium" as "chromium" | "firefox" | "webkit",
  headless: false,
  timeout: 10_000,         // milliseconds
  pageLoadTimeout: 30_000, // milliseconds

  // Test Data
  validEmail: "qa_testers@qabrains.com",
  validPassword: "Password123",

  // Execution Settings
  screenshotOnFailure: true,
  retryFailedTests: true,
  parallelExecution: false,

  // Viewport
  viewportWidth: 1920,
  viewportHeight: 1080,
};
