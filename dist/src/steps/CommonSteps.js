"use strict";
// =============================================
// src/steps/CommonSteps.ts
// Java-এর CommonSteps.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const BrowserManager_1 = require("../utils/BrowserManager");
let page;
(0, cucumber_1.Before)(() => { page = undefined; });
function getPage() {
    if (!page)
        page = BrowserManager_1.browserManager.getPage();
    return page;
}
(0, cucumber_1.Given)("User launches the application", async () => {
    const p = getPage();
    assert_1.strict.ok(p.url().includes("practice.qabrains.com"), `❌ App did not launch. URL: ${p.url()}`);
});
(0, cucumber_1.Then)("Home page should load successfully", async () => {
    const p = getPage();
    await p.waitForLoadState();
    assert_1.strict.ok(p.url().includes("practice.qabrains.com"), `❌ Home page did not load. URL: ${p.url()}`);
});
(0, cucumber_1.Given)("User is on homepage", async () => {
    const p = getPage();
    const url = p.url();
    if (url !== "https://practice.qabrains.com/" && url !== "https://practice.qabrains.com") {
        await p.goto("https://practice.qabrains.com/");
    }
    await p.waitForLoadState();
});
(0, cucumber_1.Then)("Products should be added successfully", async () => {
    const p = getPage();
    const cartHasItems = (await p.locator(".cart-count, .cart-badge, .cart-item, [class*='cart']").count()) > 0;
    assert_1.strict.ok(cartHasItems, "❌ No products found in cart after adding");
});
//# sourceMappingURL=CommonSteps.js.map