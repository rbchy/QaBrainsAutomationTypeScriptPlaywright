// =============================================
// src/steps/LogoutSteps.ts
// Java-এর LogoutSteps.java এর TypeScript equivalent
// =============================================

import { Given, When, Then, Before } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";

let loginPage: LoginPage;
let logoutPage: LogoutPage;

function init() {
  if (!loginPage) {
    const page = browserManager.getPage();
    loginPage  = new LoginPage(page);
    logoutPage = new LogoutPage(page);
  }
}

Before(() => {
  loginPage  = undefined as any;
  logoutPage = undefined as any;
});

Given("User is logged in", async () => {
  init();
  await loginPage.login("qa_testers@qabrains.com", "Password123");
  const ok = await loginPage.isLoginSuccessful();
  assert.strictEqual(ok, true, "❌ Login failed, so logout scenario cannot continue.");
});

When("User clicks on logout button", async () => {
  init();
  await logoutPage.clickLogout();
});

Then("User should be logged out successfully", async () => {
  init();
  const ok = await logoutPage.isLogoutSuccessful();
  assert.strictEqual(ok, true, "❌ Logout was not successful.");
});
