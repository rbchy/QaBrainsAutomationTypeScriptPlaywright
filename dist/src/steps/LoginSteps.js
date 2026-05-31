"use strict";
// =============================================
// src/steps/LoginSteps.ts
// Java-এর LoginSteps.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const BrowserManager_1 = require("../utils/BrowserManager");
const LoginPage_1 = require("../pages/LoginPage");
// Java-এর private Page page + lazy init() এর মতো
let loginPage;
function getLoginPage() {
    if (!loginPage) {
        loginPage = new LoginPage_1.LoginPage(BrowserManager_1.browserManager.getPage());
    }
    return loginPage;
}
// প্রতিটি Scenario-এ নতুন instance (Hooks এ Browser reset হয় তাই)
const cucumber_2 = require("@cucumber/cucumber");
(0, cucumber_2.Before)(() => { loginPage = undefined; });
(0, cucumber_1.When)("User enters valid username and password", async () => {
    await getLoginPage().login("qa_testers@qabrains.com", "Password123");
});
(0, cucumber_1.When)("User enters invalid username and password", async () => {
    await getLoginPage().login("wrong@test.com", "wrongpass");
});
(0, cucumber_1.Then)("User should be logged in successfully", async () => {
    const result = await getLoginPage().isLoginSuccessful();
    assert_1.strict.strictEqual(result, true, "❌ Login failed!");
});
(0, cucumber_1.Then)("Error message should be displayed", async () => {
    const result = await getLoginPage().isErrorDisplayed();
    assert_1.strict.strictEqual(result, true, "❌ Error message not displayed!");
});
//# sourceMappingURL=LoginSteps.js.map