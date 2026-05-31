"use strict";
// =============================================
// config/config.ts
// Java-এর config.properties + ConfigReader এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    // Application URL
    url: "https://practice.qabrains.com/",
    // Browser Configuration
    browser: "chromium",
    headless: false,
    timeout: 10000, // milliseconds
    pageLoadTimeout: 30000, // milliseconds
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
//# sourceMappingURL=config.js.map