// =============================================
// src/utils/BrowserManager.ts — a fresh browser, context and page per scenario
// =============================================

import { chromium, firefox, webkit, Browser, BrowserContext, Page } from "playwright";
import { config } from "../../config/config";

class BrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  async initBrowser(): Promise<void> {
    const browserType =
      config.browser === "firefox" ? firefox : config.browser === "webkit" ? webkit : chromium;

    this.browser = await browserType.launch({ headless: config.headless });
    this.context = await this.browser.newContext({
      baseURL: config.url,
      viewport: { width: config.viewportWidth, height: config.viewportHeight },
    });
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(config.timeout);
    await this.page.goto(config.url);
  }

  getPage(): Page {
    if (!this.page) {
      throw new Error("Page is not ready — initBrowser() runs in the Before hook.");
    }
    return this.page;
  }

  async quitBrowser(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
    this.page = null;
    this.context = null;
    this.browser = null;
  }

  async screenshot(): Promise<Buffer | null> {
    return this.page ? this.page.screenshot({ fullPage: true }) : null;
  }
}

export const browserManager = new BrowserManager();
