// =============================================
// src/steps/SmokeSteps.ts — home page and sidebar demo modules
// =============================================

import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { config } from "../../config/config";
import { browserManager } from "../utils/BrowserManager";

Given("User launches the application", async () => {
  await browserManager.getPage().goto("/");
});

Then("Home page should load successfully", async () => {
  const page = browserManager.getPage();
  await expect(page).toHaveURL(config.url);
  await expect(page.locator("#email")).toBeVisible();
  await expect(page.locator("form button[type='submit']", { hasText: "Login" })).toBeVisible();
});

When("User opens each demo module from the menu", async (table: DataTable) => {
  const page = browserManager.getPage();
  for (const [label, expectedInUrl] of table.raw()) {
    await page.goto("/");
    // menu items are rendered client-side; the locator waits for them
    const item = page
      .locator("[role='menuitem'], a")
      .filter({ hasText: new RegExp(`^\\s*${label}\\s*$`) })
      .first();
    await expect(item).toBeVisible();
    // keep the demo in this tab
    await item.evaluate((el) => {
      const a = el.tagName === "A" ? el : el.querySelector("a");
      a?.removeAttribute("target");
    });
    await item.click();
    await expect(page).toHaveURL(new RegExp(expectedInUrl));
  }
});

Then("Each module page should open", async () => {
  await expect(browserManager.getPage().locator("body")).toBeVisible();
});
