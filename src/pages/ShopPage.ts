// =============================================
// src/pages/ShopPage.ts — the E-Commerce demo (practice.qabrains.com/ecommerce)
// Each product card has one button that toggles "Add to cart" / "Remove from cart".
// =============================================

import { Page, Locator, expect } from "@playwright/test";
import { config } from "../../config/config";

export class ShopPage {
  readonly addButtons: Locator;
  readonly removeButtons: Locator;
  readonly productLinks: Locator;

  constructor(private readonly page: Page) {
    this.addButtons = page.getByRole("button", { name: /^add to cart$/i });
    this.removeButtons = page.getByRole("button", { name: /^remove from cart$/i });
    this.productLinks = page.locator("a[href*='/ecommerce/product-details']");
  }

  async login(): Promise<void> {
    await this.page.goto("/ecommerce/login");
    await this.page.locator("#email").fill(config.shopEmail);
    await this.page.locator("#password").fill(config.shopPassword);
    await this.page.locator("form button[type='submit']").first().click();
    await expect(this.addButtons.first()).toBeVisible({ timeout: 20_000 });
  }

  /** Clicks the first "Add to cart" and waits until exactly one more product is in the cart. */
  async addOne(): Promise<void> {
    const before = await this.removeButtons.count();
    await this.addButtons.first().click();
    await expect(this.removeButtons).toHaveCount(before + 1);
  }

  async removeOne(): Promise<void> {
    const before = await this.removeButtons.count();
    await this.removeButtons.first().click();
    await expect(this.removeButtons).toHaveCount(before - 1);
  }

  /** Starts from an empty cart, whatever an earlier run left behind. */
  async emptyCart(): Promise<void> {
    while ((await this.removeButtons.count()) > 0) {
      await this.removeOne();
    }
  }

  async reload(): Promise<void> {
    await this.page.goto("/ecommerce");
    await expect(this.addButtons.or(this.removeButtons).first()).toBeVisible({ timeout: 20_000 });
  }

  async openFirstProductDetails(): Promise<void> {
    const href = await this.productLinks.first().getAttribute("href");
    expect(href, "product link").toBeTruthy();
    await this.page.goto(href!);
    await expect(this.page).toHaveURL(/product-details\?id=\d+/);
  }

  /** Text of every product card: the closest ancestor of a cart button that also holds a product link. */
  async cardTexts(): Promise<string[]> {
    return this.addButtons.evaluateAll((buttons) =>
      buttons.map((b) => {
        let el: HTMLElement | null = b as HTMLElement;
        while (el && !el.querySelector("a[href*='product-details']")) el = el.parentElement;
        return el?.innerText ?? "";
      })
    );
  }

  async distinctProducts(): Promise<number> {
    const hrefs = await this.productLinks.evaluateAll((links) =>
      links.map((a) => a.getAttribute("href"))
    );
    return new Set(hrefs).size;
  }
}
