// =============================================
// src/steps/ForgotPasswordSteps.ts
// =============================================

import { Given, When, Then, Before } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";

let forgotPage: ForgotPasswordPage;

Before(() => { forgotPage = undefined as any; });

function getForgotPage(): ForgotPasswordPage {
  if (!forgotPage) {
    forgotPage = new ForgotPasswordPage(browserManager.getPage());
  }
  return forgotPage;
}

Given("User is on Forgot Password page", async () => {
  const page = browserManager.getPage();
  await page.goto("https://practice.qabrains.com/forgot-password");
});

When("User enters registered email {string}", async (email: string) => {
  await getForgotPage().enterEmail(email);
});

When("User enters unregistered email {string}", async (email: string) => {
  await getForgotPage().enterEmail(email);
});

When("User clicks on Submit button", async () => {
  await getForgotPage().clickSubmit();
});

Then("User should see success message {string}", async (_expected: string) => {
  const actual = await getForgotPage().getSuccessMessage();
  assert.ok(
    actual.toLowerCase().includes("reset") || actual.toLowerCase().includes("success"),
    `❌ Success message not displayed correctly. Actual: ${actual}`
  );
});

Then("User should see error message {string}", async (_expected: string) => {
  const actual = await getForgotPage().getErrorMessage();
  assert.ok(
    actual.toLowerCase().includes("@") || actual.toLowerCase().includes("not found"),
    `❌ Error message not displayed correctly. Actual: ${actual}`
  );
});
