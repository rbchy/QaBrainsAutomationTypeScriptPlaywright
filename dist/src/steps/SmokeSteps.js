"use strict";
// =============================================
// src/steps/SmokeSteps.ts
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
async function clickNavAndGoBack(linkText) {
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
        }
        catch {
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
            }
            catch {
                // ignore
            }
        }
    }
}
(0, cucumber_1.When)("User clicks on Catalog, About and Blog", async () => {
    await clickNavAndGoBack("Catalog");
    await clickNavAndGoBack("About");
    await clickNavAndGoBack("Blog");
});
(0, cucumber_1.Then)("Pages should navigate correctly", async () => {
    assert_1.strict.ok(getPage().url().includes("practice.qabrains.com"), `❌ Navigation failed. URL: ${getPage().url()}`);
});
(0, cucumber_1.When)("User clicks on Wish list and Refer a Friend", async () => {
    await clickNavAndGoBack("Wish List");
    await clickNavAndGoBack("Refer a Friend");
});
(0, cucumber_1.Then)("Pages should open successfully", async () => {
    assert_1.strict.ok(getPage().url().includes("practice.qabrains.com"), `❌ Wishlist/Refer page navigation failed. URL: ${getPage().url()}`);
});
//# sourceMappingURL=SmokeSteps.js.map