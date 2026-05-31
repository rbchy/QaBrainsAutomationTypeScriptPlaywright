// =============================================
// src/steps/RegistrationSteps.ts
// =============================================

import { When, Then, Before } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { RegistrationPage } from "../pages/RegistrationPage";

let registrationPage: RegistrationPage;

Before(() => { registrationPage = undefined as any; });

function getRegPage(): RegistrationPage {
  if (!registrationPage) {
    registrationPage = new RegistrationPage(browserManager.getPage());
  }
  return registrationPage;
}

When("User navigates to registration page", async () => {
  await getRegPage().openRegistrationPage();
});

When("User enters valid registration details with email {string}", async (email: string) => {
  await getRegPage().enterRegistrationDetails(
    "Rezaul Karim", "United States", "Engineer", email, "Password123", "Password123"
  );
});

When("User enters registration details with email {string}", async (email: string) => {
  await getRegPage().enterRegistrationDetails(
    "Rezaul Karim", "United States", "Engineer", email, "Password123", "Password123"
  );
});

When("User clicks on register button", async () => {
  await getRegPage().clickRegister();
});

Then("User should be registered successfully", async () => {
  const ok = await getRegPage().isRegistrationSuccessful();
  assert.strictEqual(ok, true, "❌ Registration failed!");
});

Then("Email validation error message should be displayed", async () => {
  const ok = await getRegPage().isEmailValidationMessageDisplayed();
  assert.strictEqual(ok, true, "❌ Email validation error not shown!");
});
