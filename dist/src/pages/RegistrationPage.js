"use strict";
// =============================================
// src/pages/RegistrationPage.ts
// Java-এর RegistrationPage.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationPage = void 0;
class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.registerLink = page.locator("#registration span");
        this.nameField = page.locator("#name");
        this.countryDropdown = page.locator("#country");
        this.accountTypeDropdown = page.locator("#account");
        this.emailField = page.locator("#email");
        this.passwordField = page.locator("#password");
        this.confirmPasswordField = page.locator("#confirm_password");
        this.registerBtn = page.locator("button[type='submit']");
    }
    async openRegistrationPage() {
        if (!this.page.url().includes("registration")) {
            await this.registerLink.click();
        }
        await this.page.waitForURL("**/registration**");
        await this.page.waitForLoadState();
    }
    async enterRegistrationDetails(fullName, country, accountType, email, password, confirmPassword) {
        // ✅ Unique email generate করা (Java-এর System.currentTimeMillis() এর মতো)
        const finalEmail = email === "chyranajit@gmail.com"
            ? `testuser${Date.now()}@mailtest.com`
            : email;
        console.log(`📧 Registering with email: ${finalEmail}`);
        await this.nameField.fill(fullName);
        await this.countryDropdown.selectOption(country);
        await this.accountTypeDropdown.selectOption(accountType);
        await this.emailField.fill(finalEmail);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(confirmPassword);
    }
    async clickRegister() {
        await this.registerBtn.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(2000);
        const body = (await this.page.locator("body").textContent()) ?? "";
        console.log(`📄 Page after register (first 400 chars): ${body.substring(0, 400)}`);
        console.log(`🌐 URL after register: ${this.page.url()}`);
    }
    async isRegistrationSuccessful() {
        const url = this.page.url();
        const body = ((await this.page.locator("body").textContent()) ?? "").toLowerCase();
        console.log(`🔍 Checking success. URL: ${url}`);
        const keywords = [
            "successfully", "registered", "welcome", "thank you",
            "account created", "success", "confirm",
        ];
        for (const kw of keywords) {
            if (body.includes(kw)) {
                console.log(`✅ Found success keyword: ${kw}`);
                return true;
            }
        }
        const selectors = [
            ".alert-success", "[class*='success']", "#success-msg",
            ".success-message", "[role='alert']",
        ];
        for (const sel of selectors) {
            try {
                if (await this.page.locator(sel).first().isVisible()) {
                    console.log(`✅ Success element: ${sel}`);
                    return true;
                }
            }
            catch {
                // ignore
            }
        }
        const redirected = !url.includes("registration");
        console.log(`URL redirect check: ${redirected} | URL: ${url}`);
        return redirected;
    }
    async isEmailValidationMessageDisplayed() {
        const msg = await this.emailField.evaluate((el) => el.validationMessage);
        console.log(`HTML5 validation: ${msg}`);
        if (msg)
            return true;
        return ((await this.page
            .locator("#email + span, #email ~ span, .field-error, [class*='error']")
            .count()) > 0);
    }
}
exports.RegistrationPage = RegistrationPage;
//# sourceMappingURL=RegistrationPage.js.map