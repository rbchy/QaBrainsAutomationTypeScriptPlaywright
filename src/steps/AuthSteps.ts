// =============================================
// src/steps/AuthSteps.ts — login, logout, registration, forgot password
// =============================================

import { Given, When, Then } from "@cucumber/cucumber";
import { config } from "../../config/config";
import { browserManager } from "../utils/BrowserManager";
import { LoginPage } from "../pages/LoginPage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";

const login = () => new LoginPage(browserManager.getPage());
const registration = () => new RegistrationPage(browserManager.getPage());
const forgot = () => new ForgotPasswordPage(browserManager.getPage());

// ---------- login / logout ----------

Given("User is on the login page", async () => {
  await login().open();
});

When("User enters valid username and password", async () => {
  await login().login(config.validEmail, config.validPassword);
});

When("User enters invalid username and password", async () => {
  await login().login("wrong@test.com", "wrongpass");
});

Then("User should be logged in successfully", async () => {
  await login().expectLoggedIn();
});

Then("Error message {string} should be displayed", async (message: string) => {
  await login().expectInvalidLoginError(message);
});

Given("User is logged in", async () => {
  await login().login(config.validEmail, config.validPassword);
  await login().expectLoggedIn();
});

When("User clicks on logout button", async () => {
  await login().logout();
});

Then("User should be logged out successfully", async () => {
  await login().expectLoggedOut();
});

// ---------- registration ----------

Given("User is on the registration page", async () => {
  await registration().open();
});

async function register(email: string): Promise<void> {
  const page = registration();
  await page.fill({
    name: "Ranajit Chowdhury",
    country: "United States",
    account: "Engineer",
    email,
    password: "Password123",
    confirm: "Password123",
  });
  await page.submit();
}

When("User registers with a unique email", async () => {
  await register(`rbtest${Date.now()}@mailtest.com`);
});

When("User registers with email {string}", async (email: string) => {
  await register(email);
});

Then("User should be registered successfully", async () => {
  await registration().expectRegistered();
});

Then("Email validation error message should be displayed", async () => {
  await registration().expectEmailRejected();
});

// ---------- forgot password ----------

Given("User is on Forgot Password page", async () => {
  await forgot().open();
});

When("User requests a password reset for {string}", async (email: string) => {
  await forgot().requestReset(email);
});

Then("User should see success message {string}", async (expected: string) => {
  await forgot().expectSuccess(expected);
});

Then("User should see error message {string}", async (expected: string) => {
  await forgot().expectValidationError(expected);
});
