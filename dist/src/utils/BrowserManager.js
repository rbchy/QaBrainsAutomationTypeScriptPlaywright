"use strict";
// =============================================
// src/utils/BrowserManager.ts
// Java-এর BaseTest.java + DriverFactory.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserManager = void 0;
const playwright_1 = require("playwright");
const config_1 = require("../../config/config");
class BrowserManager {
    constructor() {
        this.browser = null;
        this.context = null;
        this.page = null;
    }
    // 🚀 ব্রাউজার চালু করা (Java-এর initBrowser() এর মতো)
    async initBrowser() {
        // Browser type বেছে নেওয়া
        const browserType = config_1.config.browser === "firefox"
            ? playwright_1.firefox
            : config_1.config.browser === "webkit"
                ? playwright_1.webkit
                : playwright_1.chromium;
        this.browser = await browserType.launch({
            headless: config_1.config.headless,
        });
        this.context = await this.browser.newContext({
            viewport: {
                width: config_1.config.viewportWidth,
                height: config_1.config.viewportHeight,
            },
        });
        this.page = await this.context.newPage();
        // Default timeout set করা
        this.page.setDefaultTimeout(config_1.config.timeout);
        // Home page-এ navigate করা
        await this.page.goto(config_1.config.url);
        await this.page.waitForLoadState("domcontentloaded");
    }
    // 📌 Page instance নেওয়া (Java-এর getPage() এর মতো)
    getPage() {
        if (!this.page) {
            throw new Error("❌ Page is null! initBrowser() আগে call করুন।");
        }
        return this.page;
    }
    // ❌ ব্রাউজার বন্ধ করা (Java-এর quitBrowser() এর মতো)
    async quitBrowser() {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }
        if (this.context) {
            await this.context.close();
            this.context = null;
        }
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
    // Screenshot নেওয়া (failure-এর সময়)
    async takeScreenshot(name) {
        if (this.page && config_1.config.screenshotOnFailure) {
            await this.page.screenshot({
                path: `reports/screenshots/${name}-${Date.now()}.png`,
                fullPage: true,
            });
        }
    }
}
// Singleton instance — পুরো test run-এ একটিই থাকবে
exports.browserManager = new BrowserManager();
//# sourceMappingURL=BrowserManager.js.map