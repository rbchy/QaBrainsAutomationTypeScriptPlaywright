"use strict";
// =============================================
// src/steps/LogoutSteps.ts
// Java-এর LogoutSteps.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const BrowserManager_1 = require("../utils/BrowserManager");
const LoginPage_1 = require("../pages/LoginPage");
const LogoutPage_1 = require("../pages/LogoutPage");
let loginPage;
let logoutPage;
function init() {
    if (!loginPage) {
        const page = BrowserManager_1.browserManager.getPage();
        loginPage = new LoginPage_1.LoginPage(page);
        logoutPage = new LogoutPage_1.LogoutPage(page);
    }
}
(0, cucumber_1.Before)(() => {
    loginPage = undefined;
    logoutPage = undefined;
});
(0, cucumber_1.Given)("User is logged in", async () => {
    init();
    await loginPage.login("qa_testers@qabrains.com", "Password123");
    const ok = await loginPage.isLoginSuccessful();
    assert_1.strict.strictEqual(ok, true, "❌ Login failed, so logout scenario cannot continue.");
});
(0, cucumber_1.When)("User clicks on logout button", async () => {
    init();
    await logoutPage.clickLogout();
});
(0, cucumber_1.Then)("User should be logged out successfully", async () => {
    init();
    const ok = await logoutPage.isLogoutSuccessful();
    assert_1.strict.strictEqual(ok, true, "❌ Logout was not successful.");
});
//# sourceMappingURL=LogoutSteps.js.map