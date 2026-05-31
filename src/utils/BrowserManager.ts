// =============================================
// src/utils/BrowserManager.ts
// Java-এর BaseTest.java + DriverFactory.java এর TypeScript equivalent
// =============================================

import { chromium, firefox, webkit, Browser, BrowserContext, Page } from "playwright";
import { config } from "../../config/config";

class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  // 🚀 ব্রাউজার চালু করা (Java-এর initBrowser() এর মতো)
  async initBrowser(): Promise<void> {
    // Browser type বেছে নেওয়া
    const browserType =
      config.browser === "firefox"
        ? firefox
        : config.browser === "webkit"
        ? webkit
        : chromium;

    this.browser = await browserType.launch({
      headless: config.headless,
    });

    this.context = await this.browser.newContext({
      viewport: {
        width: config.viewportWidth,
        height: config.viewportHeight,
      },
    });

    this.page = await this.context.newPage();

    // Default timeout set করা
    this.page.setDefaultTimeout(config.timeout);

    // Home page-এ navigate করা
    await this.page.goto(config.url);
    await this.page.waitForLoadState("domcontentloaded");
  }

  // 📌 Page instance নেওয়া (Java-এর getPage() এর মতো)
  getPage(): Page {
    if (!this.page) {
      throw new Error("❌ Page is null! initBrowser() আগে call করুন।");
    }
    return this.page;
  }

  // ❌ ব্রাউজার বন্ধ করা (Java-এর quitBrowser() এর মতো)
  async quitBrowser(): Promise<void> {
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
  async takeScreenshot(name: string): Promise<void> {
    if (this.page && config.screenshotOnFailure) {
      await this.page.screenshot({
        path: `reports/screenshots/${name}-${Date.now()}.png`,
        fullPage: true,
      });
    }
  }
}

// Singleton instance — পুরো test run-এ একটিই থাকবে
export const browserManager = new BrowserManager();
