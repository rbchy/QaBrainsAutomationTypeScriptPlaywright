"use strict";
// =============================================
// src/hooks/Hooks.ts
// Senior QA approach:
// - Screenshot on failure
// - @known_issue scenarios skipped with reason
// - Clean browser per scenario
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const config_1 = require("../../config/config");
const BrowserManager_1 = require("../utils/BrowserManager");
(0, cucumber_1.setDefaultTimeout)(config_1.config.pageLoadTimeout);
const KNOWN_ISSUE_MSG = "KNOWN SITE BUG: E-Commerce component on practice.qabrains.com " +
    "fails to load ('Failed to fetch component data'). " +
    "This is a server-side defect, not an automation issue. " +
    "Defect: E-Commerce API endpoint returning error.";
// ⚠️ @known_issue scenarios — skip gracefully, don't run browser
(0, cucumber_1.Before)({ tags: "@known_issue" }, async function () {
    console.warn(`\n⚠ SKIPPING (Known Issue): ${KNOWN_ISSUE_MSG}`);
    return "pending";
});
// 🟢 প্রতিটি normal Scenario শুরুর আগে ব্রাউজার চালু হবে
(0, cucumber_1.Before)({ tags: "not @known_issue" }, async function () {
    await BrowserManager_1.browserManager.initBrowser();
});
// 🔴 প্রতিটি Scenario শেষ হলে
(0, cucumber_1.After)(async function (scenario) {
    // @known_issue scenarios-এর জন্য browser quit করার দরকার নেই
    const tags = scenario.pickle.tags.map((t) => t.name);
    if (tags.includes("@known_issue")) {
        return;
    }
    // ❌ Scenario fail হলে screenshot নেওয়া
    if (scenario.result?.status === cucumber_1.Status.FAILED) {
        try {
            const scenarioName = scenario.pickle.name.replace(/\s+/g, "_").slice(0, 80);
            await BrowserManager_1.browserManager.takeScreenshot(`FAILED_${scenarioName}`);
            console.log(`📸 Screenshot saved: FAILED_${scenarioName}`);
        }
        catch (e) {
            console.warn(`⚠ Screenshot failed: ${e}`);
        }
    }
    // ব্রাউজার বন্ধ করা
    await BrowserManager_1.browserManager.quitBrowser();
});
//# sourceMappingURL=Hooks.js.map