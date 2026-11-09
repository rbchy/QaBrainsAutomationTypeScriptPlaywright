// =============================================
// src/pages/LoginPage.ts — the Login demo on the practice-site home page
// =============================================

import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.loginButton = page.locator("form button[type='submit']", { hasText: "Login" });
    this.successMessage = page.locator("#success-msg");
  }

  async open(): Promise<void> {
    await this.page.goto("/");
    await expect(this.email).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn(): Promise<void> {
    await expect(this.page).toHaveURL(/logged=true/);
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).not.toHaveText("");
  }

  async expectInvalidLoginError(message: string): Promise<void> {
    await expect(this.page.getByText(message)).toBeVisible();
    await expect(this.successMessage).toHaveCount(0);
    await expect(this.page).not.toHaveURL(/logged=true/);
  }

  async logout(): Promise<void> {
    await this.page
      .locator("a, button")
      .filter({ hasText: /^\s*log ?out\s*$/i })
      .filter({ visible: true })
      .first()
      .click();
  }

  async expectLoggedOut(): Promise<void> {
    await expect(this.page).not.toHaveURL(/logged=true/);
    await expect(this.loginButton).toBeVisible();
    await expect(this.successMessage).toHaveCount(0);
  }
}
