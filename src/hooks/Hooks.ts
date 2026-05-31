// =============================================
// src/hooks/Hooks.ts
// Senior QA approach:
// - Screenshot on failure
// - @known_issue scenarios skipped with reason
// - Clean browser per scenario
// =============================================

import { After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { config } from "../../config/config";
import { browserManager } from "../utils/BrowserManager";

setDefaultTimeout(config.pageLoadTimeout);

const KNOWN_ISSUE_MSG =
  "KNOWN SITE BUG: E-Commerce component on practice.qabrains.com " +
  "fails to load ('Failed to fetch component data'). " +
  "This is a server-side defect, not an automation issue. " +
  "Defect: E-Commerce API endpoint returning error.";

// ⚠️ @known_issue scenarios — skip gracefully, don't run browser
Before({ tags: "@known_issue" }, async function () {
  console.warn(`\n⚠ SKIPPING (Known Issue): ${KNOWN_ISSUE_MSG}`);
  return "pending";
});

// 🟢 প্রতিটি normal Scenario শুরুর আগে ব্রাউজার চালু হবে
Before({ tags: "not @known_issue" }, async function () {
  await browserManager.initBrowser();
});

// 🔴 প্রতিটি Scenario শেষ হলে
After(async function (scenario) {
  // @known_issue scenarios-এর জন্য browser quit করার দরকার নেই
  const tags = scenario.pickle.tags.map((t) => t.name);
  if (tags.includes("@known_issue")) {
    return;
  }

  // ❌ Scenario fail হলে screenshot নেওয়া
  if (scenario.result?.status === Status.FAILED) {
    try {
      const scenarioName = scenario.pickle.name.replace(/\s+/g, "_").slice(0, 80);
      await browserManager.takeScreenshot(`FAILED_${scenarioName}`);
      console.log(`📸 Screenshot saved: FAILED_${scenarioName}`);
    } catch (e) {
      console.warn(`⚠ Screenshot failed: ${e}`);
    }
  }

  // ব্রাউজার বন্ধ করা
  await browserManager.quitBrowser();
});