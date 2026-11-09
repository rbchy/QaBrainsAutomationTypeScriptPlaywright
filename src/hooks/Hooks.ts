// =============================================
// src/hooks/Hooks.ts — clean browser per scenario, screenshot + page text on failure
// =============================================

import { After, Before, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { config } from "../../config/config";
import { browserManager } from "../utils/BrowserManager";

setDefaultTimeout(config.stepTimeout);

Before(async function () {
  await browserManager.initBrowser();
});

After(async function (scenario) {
  try {
    if (scenario.result?.status === Status.FAILED) {
      const png = await browserManager.screenshot();
      if (png) this.attach(png, "image/png");
      // printed so a CI failure can be read straight from the log
      const page = browserManager.getPage();
      const body = (await page.locator("body").innerText()).slice(0, 1200);
      console.log(`\n---- FAILED: ${scenario.pickle.name} @ ${page.url()}\n${body}\n----`);
    }
  } catch (e) {
    console.log(`Could not capture failure details: ${e}`);
  } finally {
    await browserManager.quitBrowser();
  }
});
