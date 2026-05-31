"use strict";
// =============================================
// src/pages/LoginPage.ts
// Java-এর LoginPage.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    constructor(page) {
        this.page = page;
        // Java: page.locator("#email, input[type='email']").first()
        this.emailField = page
            .locator("#email, input[type='email'], input[name='email']")
            .first();
        this.passwordField = page
            .locator("#password, input[type='password']")
            .first();
        this.loginBtn = page
            .locator("button[type='submit'], button:has-text('Login'), button:has-text('Sign In')")
            .first();
    }
    // ===== Login Action =====
    async login(email, password) {
        const url = this.page.url();
        // Login page-এ না থাকলে navigate করা
        if (!url.includes("login") && !url.includes("sign-in")) {
            const loginLink = this.page
                .locator("a:has-text('Login'), a:has-text('Sign In'), a:has-text('Log In'), [href*='login'], [href*='sign-in']")
                .first();
            if (await loginLink.isVisible()) {
                await loginLink.click();
                await this.page.waitForLoadState();
            }
            else {
                await this.page.goto("https://practice.qabrains.com/login");
                await this.page.waitForLoadState();
            }
        }
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState();
        await this.page.waitForTimeout(1000);
    }
    // ===== Login সফল কিনা যাচাই =====
    async isLoginSuccessful() {
        const url = this.page.url();
        const successSelectors = [
            ".dashboard, #dashboard",
            "text=/welcome/i",
            "text=/logged in/i",
            "a:has-text('Logout'), a:has-text('Log Out'), a:has-text('Sign Out')",
            "[class*='dashboard'], [class*='account']",
        ];
        for (const sel of successSelectors) {
            try {
                if (await this.page.locator(sel).first().isVisible()) {
                    console.log(`✅ Login success detected via: ${sel}`);
                    return true;
                }
            }
            catch {
                // পরের selector চেষ্টা করো
            }
        }
        const urlChanged = !url.includes("login") && !url.includes("sign-in");
        console.log(`Login URL check: ${url} → ${urlChanged ? "PASSED" : "FAILED"}`);
        return urlChanged;
    }
    // ===== Error দেখাচ্ছে কিনা যাচাই =====
    async isErrorDisplayed() {
        const errorSelectors = [
            ".error, .alert-danger, .alert-error",
            "[class*='error'], [class*='invalid']",
            "text=/invalid/i",
            "text=/incorrect/i",
            "text=/wrong/i",
            "text=/failed/i",
        ];
        for (const sel of errorSelectors) {
            try {
                if (await this.page.locator(sel).first().isVisible()) {
                    console.log(`✅ Login error detected via: ${sel}`);
                    return true;
                }
            }
            catch {
                // পরের selector চেষ্টা করো
            }
        }
        const stillOnLogin = this.page.url().includes("login") || this.page.url().includes("sign-in");
        console.log(`Login error URL check: still on login? ${stillOnLogin}`);
        return stillOnLogin;
    }
}
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map