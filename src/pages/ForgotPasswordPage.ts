// =============================================
// src/pages/ForgotPasswordPage.ts — the Forgot Password demo module
// =============================================

import { Page, Locator, expect } from "@playwright/test";

export class ForgotPasswordPage {
  readonly email: Locator;
  private readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.email = page.locator("#email");
    this.submitButton = page.locator("form button[type='submit']").first();
  }

  async open(): Promise<void> {
    await this.page.goto("/forgot-password");
    await expect(this.email).toBeVisible();
  }

  async requestReset(email: string): Promise<void> {
    await this.email.fill(email);
    await this.submitButton.click();
  }

  /** A valid e-mail adds ?forgot=true and shows the success banner. */
  async expectSuccess(expected: string): Promise<void> {
    await expect(this.page).toHaveURL(/forgot=true/);
    await expect(this.page.locator("#success-msg")).toBeVisible();
    await expect(this.page.locator("#success-msg")).toContainText(expected);
  }

  /** A malformed e-mail is stopped by the browser before it is sent. */
  async expectValidationError(expected: string): Promise<void> {
    const message = await this.email.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(message).toContain(expected);
    await expect(this.page).not.toHaveURL(/forgot=true/);
  }
}
