"use strict";
// =============================================
// src/steps/RegistrationSteps.ts
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const BrowserManager_1 = require("../utils/BrowserManager");
const RegistrationPage_1 = require("../pages/RegistrationPage");
let registrationPage;
(0, cucumber_1.Before)(() => { registrationPage = undefined; });
function getRegPage() {
    if (!registrationPage) {
        registrationPage = new RegistrationPage_1.RegistrationPage(BrowserManager_1.browserManager.getPage());
    }
    return registrationPage;
}
(0, cucumber_1.When)("User navigates to registration page", async () => {
    await getRegPage().openRegistrationPage();
});
(0, cucumber_1.When)("User enters valid registration details with email {string}", async (email) => {
    await getRegPage().enterRegistrationDetails("Ranajit Chowdhury", "United States", "Engineer", email, "Password123", "Password123");
});
(0, cucumber_1.When)("User enters registration details with email {string}", async (email) => {
    await getRegPage().enterRegistrationDetails("Ranajit Chowdhury", "United States", "Engineer", email, "Password123", "Password123");
});
(0, cucumber_1.When)("User clicks on register button", async () => {
    await getRegPage().clickRegister();
});
(0, cucumber_1.Then)("User should be registered successfully", async () => {
    const ok = await getRegPage().isRegistrationSuccessful();
    assert_1.strict.strictEqual(ok, true, "❌ Registration failed!");
});
(0, cucumber_1.Then)("Email validation error message should be displayed", async () => {
    const ok = await getRegPage().isEmailValidationMessageDisplayed();
    assert_1.strict.strictEqual(ok, true, "❌ Email validation error not shown!");
});
//# sourceMappingURL=RegistrationSteps.js.map