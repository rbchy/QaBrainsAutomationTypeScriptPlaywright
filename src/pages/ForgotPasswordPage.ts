// =============================================
// src/pages/ForgotPasswordPage.ts
// Java-এর ForgotPasswordPage.java এর TypeScript equivalent
// =============================================

import { Page, Locator } from "playwright";

export class ForgotPasswordPage {
  private readonly page: Page;
  private readonly emailField: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator("#email");
    this.submitBtn = page
      .locator(
        "#inner-body form button, " +
          "form button[type='submit'], " +
          "button:has-text('Submit'), " +
          "button:has-text('Reset'), " +
          "input[type='submit']"
      )
      .first();
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async clickSubmit(): Promise<void> {
    await this.submitBtn.click();
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(1000);
  }

  async getSuccessMessage(): Promise<string> {
    const selectors = [
      "#success-msg",
      ".success-message",
      ".alert-success",
      "[class*='success']",
      "text=/reset/i",
      "text=/sent/i",
      "text=/check your email/i",
      "p.success, div.success",
    ];

    for (const sel of selectors) {
      try {
        const el = this.page.locator(sel).first();
        if (await el.isVisible()) {
          const text = (await el.textContent())?.trim() ?? "";
          console.log(`✅ ForgotPassword success msg [${sel}]: ${text}`);
          return text;
        }
      } catch {
        // পরের selector চেষ্টা
      }
    }

    const body = ((await this.page.locator("body").textContent()) ?? "").toLowerCase();
    if (body.includes("reset") || body.includes("sent") || body.includes("check your email")) {
      return "reset";
    }

    console.log(`⚠ ForgotPassword: no success message found. URL: ${this.page.url()}`);
    return "";
  }

  async getErrorMessage(): Promise<string> {
    const selectors = [
      "#email + span",
      "#email ~ span",
      "#email + div",
      "#email ~ .error",
      ".field-error",
      ".alert-danger",
      ".error-message",
      "[class*='error']",
      "text=/not found/i",
      "text=/invalid/i",
      "text=/enter a valid/i",
    ];

    for (const sel of selectors) {
      try {
        const el = this.page.locator(sel).first();
        if (await el.isVisible()) {
          const text = (await el.textContent())?.trim() ?? "";
          if (text.toUpperCase() !== "RESET PASSWORD" && text !== "") {
            console.log(`✅ ForgotPassword error msg [${sel}]: ${text}`);
            return text;
          }
        }
      } catch {
        // পরের selector চেষ্টা
      }
    }

    const body = ((await this.page.locator("body").textContent()) ?? "").toLowerCase();
    if (body.includes("not found") || body.includes("invalid") || body.includes("@")) {
      return "not found";
    }

    return "";
  }
}
