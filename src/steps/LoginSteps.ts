// =============================================
// src/steps/LoginSteps.ts
// Java-এর LoginSteps.java এর TypeScript equivalent
// =============================================

import { When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { LoginPage } from "../pages/LoginPage";

// Java-এর private Page page + lazy init() এর মতো
let loginPage: LoginPage;

function getLoginPage(): LoginPage {
  if (!loginPage) {
    loginPage = new LoginPage(browserManager.getPage());
  }
  return loginPage;
}

// প্রতিটি Scenario-এ নতুন instance (Hooks এ Browser reset হয় তাই)
import { Before } from "@cucumber/cucumber";
Before(() => { loginPage = undefined as any; });

When("User enters valid username and password", async () => {
  await getLoginPage().login("qa_testers@qabrains.com", "Password123");
});

When("User enters invalid username and password", async () => {
  await getLoginPage().login("wrong@test.com", "wrongpass");
});

Then("User should be logged in successfully", async () => {
  const result = await getLoginPage().isLoginSuccessful();
  assert.strictEqual(result, true, "❌ Login failed!");
});

Then("Error message should be displayed", async () => {
  const result = await getLoginPage().isErrorDisplayed();
  assert.strictEqual(result, true, "❌ Error message not displayed!");
});
