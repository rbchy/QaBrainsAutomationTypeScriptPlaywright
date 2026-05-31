// =============================================
// src/steps/CommonSteps.ts
// Java-এর CommonSteps.java এর TypeScript equivalent
// =============================================

import { Given, Then, Before } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { Page } from "playwright";

let page: Page;

Before(() => { page = undefined as any; });

function getPage(): Page {
  if (!page) page = browserManager.getPage();
  return page;
}

Given("User launches the application", async () => {
  const p = getPage();
  assert.ok(
    p.url().includes("practice.qabrains.com"),
    `❌ App did not launch. URL: ${p.url()}`
  );
});

Then("Home page should load successfully", async () => {
  const p = getPage();
  await p.waitForLoadState();
  assert.ok(
    p.url().includes("practice.qabrains.com"),
    `❌ Home page did not load. URL: ${p.url()}`
  );
});

Given("User is on homepage", async () => {
  const p = getPage();
  const url = p.url();
  if (url !== "https://practice.qabrains.com/" && url !== "https://practice.qabrains.com") {
    await p.goto("https://practice.qabrains.com/");
  }
  await p.waitForLoadState();
});

Then("Products should be added successfully", async () => {
  const p = getPage();
  const cartHasItems =
    (await p.locator(".cart-count, .cart-badge, .cart-item, [class*='cart']").count()) > 0;
  assert.ok(cartHasItems, "❌ No products found in cart after adding");
});
