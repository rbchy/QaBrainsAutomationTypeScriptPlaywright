"use strict";
// =============================================
// src/steps/ForgotPasswordSteps.ts
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const BrowserManager_1 = require("../utils/BrowserManager");
const ForgotPasswordPage_1 = require("../pages/ForgotPasswordPage");
let forgotPage;
(0, cucumber_1.Before)(() => { forgotPage = undefined; });
function getForgotPage() {
    if (!forgotPage) {
        forgotPage = new ForgotPasswordPage_1.ForgotPasswordPage(BrowserManager_1.browserManager.getPage());
    }
    return forgotPage;
}
(0, cucumber_1.Given)("User is on Forgot Password page", async () => {
    const page = BrowserManager_1.browserManager.getPage();
    await page.goto("https://practice.qabrains.com/forgot-password");
});
(0, cucumber_1.When)("User enters registered email {string}", async (email) => {
    await getForgotPage().enterEmail(email);
});
(0, cucumber_1.When)("User enters unregistered email {string}", async (email) => {
    await getForgotPage().enterEmail(email);
});
(0, cucumber_1.When)("User clicks on Submit button", async () => {
    await getForgotPage().clickSubmit();
});
(0, cucumber_1.Then)("User should see success message {string}", async (_expected) => {
    const actual = await getForgotPage().getSuccessMessage();
    assert_1.strict.ok(actual.toLowerCase().includes("reset") || actual.toLowerCase().includes("success"), `❌ Success message not displayed correctly. Actual: ${actual}`);
});
(0, cucumber_1.Then)("User should see error message {string}", async (_expected) => {
    const actual = await getForgotPage().getErrorMessage();
    assert_1.strict.ok(actual.toLowerCase().includes("@") || actual.toLowerCase().includes("not found"), `❌ Error message not displayed correctly. Actual: ${actual}`);
});
//# sourceMappingURL=ForgotPasswordSteps.js.map