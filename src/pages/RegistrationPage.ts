// =============================================
// src/pages/RegistrationPage.ts — the Registration demo module
// =============================================

import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage {
  private readonly name: Locator;
  private readonly country: Locator;
  private readonly account: Locator;
  readonly email: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly registerButton: Locator;

  constructor(private readonly page: Page) {
    this.name = page.locator("#name");
    this.country = page.locator("#country");
    this.account = page.locator("#account");
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.confirmPassword = page.locator("#confirm_password");
    this.registerButton = page.locator("form button[type='submit']");
  }

  /** The menu item ids are generated per page load, so the module is opened by its URL. */
  async open(): Promise<void> {
    await this.page.goto("/registration");
    await expect(this.name).toBeVisible();
  }

  async fill(details: {
    name: string; country: string; account: string; email: string; password: string; confirm: string;
  }): Promise<void> {
    await this.name.fill(details.name);
    await this.country.selectOption(details.country);
    await this.account.selectOption(details.account);
    await this.email.fill(details.email);
    await this.password.fill(details.password);
    await this.confirmPassword.fill(details.confirm);
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async expectRegistered(): Promise<void> {
    await expect(this.page.getByText(/successfully/i).first()).toBeVisible();
  }

  /** The browser blocks the submit and reports why on the field itself. */
  async expectEmailRejected(): Promise<void> {
    const state = await this.email.evaluate((el: HTMLInputElement) => ({
      valid: el.validity.valid,
      message: el.validationMessage,
    }));
    expect(state.valid, "e-mail field should be invalid").toBe(false);
    expect(state.message).toContain("@");
    await expect(this.page.getByText(/successfully/i)).toHaveCount(0);
  }
}
