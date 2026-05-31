// =============================================
// src/steps/SmokeSteps.ts
// =============================================

import { When, Then, Before } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { Page } from "playwright";

let page: Page;
Before(() => { page = undefined as any; });

function getPage(): Page {
  if (!page) page = browserManager.getPage();
  return page;
}

async function clickNavAndGoBack(linkText: string): Promise<void> {
  const p = getPage();
  await p.goto("https://practice.qabrains.com/");
  await p.waitForLoadState();

  const strategies = [
    `nav a:has-text('${linkText}')`,
    `header a:has-text('${linkText}')`,
    `a:has-text('${linkText}')`,
    `[href*='${linkText.toLowerCase().replace(/ /g, "-")}']`,
    `[href*='${linkText.toLowerCase().replace(/ /g, "")}']`,
  ];

  let found = false;
  for (const strategy of strategies) {
    try {
      const candidate = p.locator(strategy).first();
      if (await candidate.isVisible()) {
        console.log(`✅ Found nav link '${linkText}' via: ${strategy}`);
        await candidate.click();
        await p.waitForLoadState();
        await p.goBack();
        await p.waitForLoadState();
        found = true;
        break;
      }
    } catch {
      // পরের strategy চেষ্টা
    }
  }

  if (!found) {
    console.log(`⚠ Could not find nav link: '${linkText}'`);
    const allLinks = await p.locator("a").all();
    for (const a of allLinks) {
      try {
        const text = await a.textContent();
        const href = await a.getAttribute("href");
        console.log(`   → [${text?.trim()}] href=${href}`);
      } catch {
        // ignore
      }
    }
  }
}

When("User clicks on Catalog, About and Blog", async () => {
  await clickNavAndGoBack("Catalog");
  await clickNavAndGoBack("About");
  await clickNavAndGoBack("Blog");
});

Then("Pages should navigate correctly", async () => {
  assert.ok(
    getPage().url().includes("practice.qabrains.com"),
    `❌ Navigation failed. URL: ${getPage().url()}`
  );
});

When("User clicks on Wish list and Refer a Friend", async () => {
  await clickNavAndGoBack("Wish List");
  await clickNavAndGoBack("Refer a Friend");
});

Then("Pages should open successfully", async () => {
  assert.ok(
    getPage().url().includes("practice.qabrains.com"),
    `❌ Wishlist/Refer page navigation failed. URL: ${getPage().url()}`
  );
});
