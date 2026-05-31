// =============================================
// src/pages/CartPage.ts
// Java-এর CartPage.java এর TypeScript equivalent
// =============================================

import { Page, Locator } from "playwright";

const BASE_URL      = "https://practice.qabrains.com/ecommerce-site";
const LOGIN_URL     = "https://practice.qabrains.com/ecommerce/login";
const ECOMMERCE_URL = "https://practice.qabrains.com/ecommerce";

// XPath selectors (Java-এর private static final String এর মতো)
const EMAIL_XPATH        = "xpath=//*[@id='email']";
const PASSWORD_XPATH     = "xpath=//*[@id='password']";
const LOGIN_BUTTON_XPATH = "xpath=//button[contains(normalize-space(),'Login')]";
const VISIT_DEMO_XPATH   = "xpath=//a[contains(normalize-space(),'Visit Demo Site')]";

const ADD_TO_CART_XPATH =
  "xpath=//button[contains(translate(normalize-space()," +
  "'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'add to cart')]";

const REMOVE_XPATH =
  "xpath=//button[contains(translate(normalize-space()," +
  "'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'remove from cart')]";

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Login করা ──
  private async openEcommerceAndLogin(): Promise<void> {
    await this.page.goto(BASE_URL);
    await this.page.waitForLoadState();

    const ecommerceSite = this.page.getByText("E-Commerce Site").first();
    if ((await ecommerceSite.count()) > 0) {
      await ecommerceSite.click();
      await this.page.waitForLoadState();
    }

    const visitDemo = this.page.locator(VISIT_DEMO_XPATH).first();
    if ((await visitDemo.count()) > 0) {
      await visitDemo.click();
      await this.page.waitForLoadState();
    } else {
      await this.page.goto(LOGIN_URL);
      await this.page.waitForLoadState();
    }

    if ((await this.page.locator(EMAIL_XPATH).count()) > 0) {
      await this.page.locator(EMAIL_XPATH).fill("test@qabrains.com");
      await this.page.locator(PASSWORD_XPATH).fill("Password123");
      await this.page.locator(LOGIN_BUTTON_XPATH).click();
      await this.page.waitForLoadState();
    }
  }

  // ── Cart-এ Product যোগ করা ──
  async addProductToCart(index: number): Promise<void> {
    await this.openEcommerceAndLogin();

    try {
      await this.page.locator(ADD_TO_CART_XPATH).first().waitFor({
        state: "visible",
        timeout: 10_000,
      });
    } catch {
      throw new Error("'Add to Cart' button did not appear within 10 seconds.");
    }

    const addButton = this.page.locator(ADD_TO_CART_XPATH);
    await addButton.nth(index).scrollIntoViewIfNeeded();
    await addButton.nth(index).click();
    await this.page.waitForTimeout(1500);

    // ✅ Button "Remove from cart" এ পরিবর্তন হওয়ার জন্য অপেক্ষা
    try {
      await this.page.locator(REMOVE_XPATH).first().waitFor({
        state: "visible",
        timeout: 5000,
      });
    } catch {
      console.log("⚠ 'Remove from cart' did not appear after adding");
    }

    console.log(
      `✅ Added product. Remove buttons: ${await this.page.locator(REMOVE_XPATH).count()}`
    );
  }

  // ── Product Cart-এ আছে কিনা যাচাই ──
  async isProductInCart(index: number): Promise<boolean> {
    await this.page.goto(ECOMMERCE_URL);
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);

    const removeCount = await this.page.locator(REMOVE_XPATH).count();
    const addCount    = await this.page.locator(ADD_TO_CART_XPATH).count();

    console.log(
      `After reload → 'Remove from cart': ${removeCount} | 'Add to cart': ${addCount}`
    );

    return removeCount > index;
  }

  // ── Product Cart থেকে সরানো ──
  async removeProduct(index: number): Promise<void> {
    if (!this.page.url().includes("ecommerce")) {
      await this.page.goto(ECOMMERCE_URL);
      await this.page.waitForLoadState();
    }

    try {
      await this.page.locator(REMOVE_XPATH).first().waitFor({
        state: "visible",
        timeout: 5000,
      });
    } catch {
      console.log("⚠ 'Remove from cart' not found within 5s");
    }

    const removeButtons = this.page.locator(REMOVE_XPATH);
    const count = await removeButtons.count();
    console.log(`'Remove from cart' buttons: ${count}`);

    if (count > index) {
      await removeButtons.nth(index).scrollIntoViewIfNeeded();
      await removeButtons.nth(index).click();
      await this.page.waitForTimeout(1500);

      try {
        await this.page.locator(ADD_TO_CART_XPATH).first().waitFor({
          state: "visible",
          timeout: 5000,
        });
      } catch {
        console.log("⚠ 'Add to cart' did not reappear after remove");
      }

      console.log(
        `✅ Removed. Add buttons now: ${await this.page.locator(ADD_TO_CART_XPATH).count()}`
      );
    } else {
      throw new Error(
        `No 'Remove from cart' button at index ${index}. Found: ${count}`
      );
    }
  }

  async goToCheckout(): Promise<void> {
    await this.page
      .locator("xpath=//button[contains(normalize-space(),'Checkout')]")
      .first()
      .click();
  }

  async getProductQuantity(index: number): Promise<number> {
    const qty = this.page.locator(
      "xpath=//input[contains(@class,'quantity') or @name='quantity']"
    );
    if ((await qty.count()) > index) {
      try {
        const value = await qty.nth(index).inputValue();
        if (value) return parseInt(value, 10);
      } catch {
        // ignore
      }
    }
    return 0;
  }
}
