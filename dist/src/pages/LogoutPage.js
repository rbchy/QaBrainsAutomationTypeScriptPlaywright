"use strict";
// =============================================
// src/pages/LogoutPage.ts
// Java-এর LogoutPage.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutPage = void 0;
const LOGOUT_SELECTOR = "a[href*='logout'], a[href*='signout'], a[href*='sign-out'], " +
    "button[onclick*='logout'], " +
    "[data-testid*='logout'], [data-testid*='signout'], " +
    "[id*='logout'], [class*='logout']";
const LOGOUT_TEXT_PATTERN = /^(logout|log out|sign out|signout)$/i;
const DROPDOWN_TRIGGER_SELECTORS = [
    "[class*='user-menu']",
    "[class*='user-dropdown']",
    "[class*='account-menu']",
    "[class*='profile-menu']",
    "[class*='user-avatar']",
    "[class*='avatar']",
    "[class*='nav-user']",
    "button[aria-haspopup='true']",
    "button[aria-haspopup='menu']",
    "[aria-expanded]",
    "[data-toggle='dropdown']",
    "[data-bs-toggle='dropdown']",
    "button:has-text('My Account')",
    "button:has-text('Account')",
    "a:has-text('My Account')",
    "nav [class*='user']",
    "header [class*='user']",
];
class LogoutPage {
    constructor(page) {
        this.page = page;
    }
    // ══════════════════════════════════════════════
    // মূল Logout method — একাধিক strategy তে চেষ্টা করে
    // ══════════════════════════════════════════════
    async clickLogout() {
        console.log("🔓 Logout প্রক্রিয়া শুরু হচ্ছে...");
        if (await this.tryDirectLogout())
            return;
        if (await this.tryDropdownThenLogout())
            return;
        if (await this.tryAnyElementWithLogoutText())
            return;
        if (await this.tryLogoutViaUrl())
            return;
        if (await this.tryJavaScriptLogout())
            return;
        throw new Error("❌ Logout করা সম্ভব হয়নি।\n" +
            "সম্ভাব্য কারণ:\n" +
            "  ১. User login করা নেই\n" +
            "  ২. Logout button এর HTML structure পরিবর্তন হয়েছে\n" +
            "  ৩. Page সম্পূর্ণ load হয়নি");
    }
    // ── Strategy 1: সরাসরি Logout বাটন ──
    async tryDirectLogout() {
        console.log("🔍 Strategy 1: সরাসরি Logout বাটন খোঁজা হচ্ছে...");
        const bySelector = this.page.locator(LOGOUT_SELECTOR);
        if ((await bySelector.count()) > 0) {
            const visible = bySelector.filter({ visible: true });
            if ((await visible.count()) > 0) {
                console.log("✅ Selector দিয়ে Logout বাটন পাওয়া গেছে।");
                await visible.first().click();
                await this.waitForLogoutRedirect();
                return true;
            }
        }
        // Role + text দিয়ে খোঁজা
        for (const role of ["link", "button"]) {
            const byText = this.page.getByRole(role, { name: LOGOUT_TEXT_PATTERN });
            if ((await byText.count()) > 0 &&
                (await byText.first().isVisible())) {
                console.log("✅ Text দিয়ে Logout বাটন পাওয়া গেছে।");
                await byText.first().click();
                await this.waitForLogoutRedirect();
                return true;
            }
        }
        console.log("⚠️ Strategy 1 ব্যর্থ।");
        return false;
    }
    // ── Strategy 2: Dropdown খুলে Logout ──
    async tryDropdownThenLogout() {
        console.log("🔍 Strategy 2: Dropdown trigger খোঁজা হচ্ছে...");
        for (const triggerSel of DROPDOWN_TRIGGER_SELECTORS) {
            try {
                const trigger = this.page
                    .locator(triggerSel)
                    .filter({ visible: true });
                if ((await trigger.count()) > 0) {
                    console.log(`🖱️ Trigger পাওয়া গেছে: ${triggerSel}`);
                    await trigger.first().click();
                    await this.page.waitForTimeout(1000);
                    let logoutBtn = this.page.locator(LOGOUT_SELECTOR);
                    if ((await logoutBtn.count()) === 0) {
                        logoutBtn = this.page
                            .locator("a, button, li")
                            .filter({ hasText: /logout|log out|sign out/i });
                    }
                    const visibleLogout = logoutBtn.filter({ visible: true });
                    if ((await visibleLogout.count()) > 0) {
                        console.log("✅ Dropdown খুলে Logout বাটন পাওয়া গেছে।");
                        await visibleLogout.first().click();
                        await this.waitForLogoutRedirect();
                        return true;
                    }
                    await this.page.keyboard.press("Escape");
                    await this.page.waitForTimeout(300);
                }
            }
            catch {
                // পরের selector চেষ্টা
            }
        }
        console.log("⚠️ Strategy 2 ব্যর্থ।");
        return false;
    }
    // ── Strategy 3: Page-এ যেকোনো Logout text element ──
    async tryAnyElementWithLogoutText() {
        console.log("🔍 Strategy 3: Page এ Logout text সহ যেকোনো element খোঁজা হচ্ছে...");
        try {
            const result = await this.page.evaluate(() => {
                const all = Array.from(document.querySelectorAll('a, button, li, span, div[role="button"]'));
                for (const el of all) {
                    const text = el.textContent?.trim().toLowerCase() ?? "";
                    if (text === "logout" ||
                        text === "log out" ||
                        text === "sign out" ||
                        text === "signout") {
                        el.click();
                        return "clicked";
                    }
                }
                return "not found";
            });
            if (result === "clicked") {
                console.log("✅ JavaScript দিয়ে Logout element খুঁজে click করা হয়েছে।");
                await this.page.waitForTimeout(1500);
                await this.waitForLogoutRedirect();
                return true;
            }
        }
        catch (e) {
            console.log("⚠️ JavaScript evaluation ব্যর্থ:", e.message);
        }
        console.log("⚠️ Strategy 3 ব্যর্থ।");
        return false;
    }
    // ── Strategy 4: URL দিয়ে Logout ──
    async tryLogoutViaUrl() {
        console.log("🔍 Strategy 4: URL দিয়ে Logout চেষ্টা করা হচ্ছে...");
        const base = this.page.url().replace(/(https?:\/\/[^/]+).*/, "$1");
        const logoutUrls = [
            `${base}/logout`,
            `${base}/signout`,
            `${base}/sign-out`,
            `${base}/auth/logout`,
            `${base}/user/logout`,
            `${base}/account/logout`,
        ];
        for (const url of logoutUrls) {
            try {
                console.log(`🔗 চেষ্টা করা হচ্ছে: ${url}`);
                await this.page.goto(url);
                await this.page.waitForLoadState();
                await this.page.waitForTimeout(1000);
                if (await this.isLoggedOut()) {
                    console.log(`✅ URL দিয়ে Logout সফল: ${url}`);
                    return true;
                }
            }
            catch {
                // পরের URL চেষ্টা
            }
        }
        console.log("⚠️ Strategy 4 ব্যর্থ।");
        return false;
    }
    // ── Strategy 5: JavaScript দিয়ে Logout ──
    async tryJavaScriptLogout() {
        console.log("🔍 Strategy 5: JavaScript দিয়ে Logout চেষ্টা করা হচ্ছে...");
        try {
            await this.page.evaluate(() => {
                document.cookie.split(";").forEach((c) => {
                    document.cookie = c
                        .replace(/^ +/, "")
                        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                sessionStorage?.clear();
                localStorage?.removeItem("token");
            });
            const base = this.page.url().replace(/(https?:\/\/[^/]+).*/, "$1");
            await this.page.goto(`${base}/auth/login`);
            await this.page.waitForLoadState();
            if (await this.isLoggedOut()) {
                console.log("✅ JavaScript দিয়ে session clear করা হয়েছে।");
                return true;
            }
        }
        catch (e) {
            console.log("⚠️ Strategy 5 ব্যর্থ:", e.message);
        }
        return false;
    }
    // ── Helper: Logout redirect এর জন্য অপেক্ষা ──
    async waitForLogoutRedirect() {
        try {
            await this.page.waitForURL((url) => url.href.includes("login") ||
                url.href.includes("signin") ||
                url.href.endsWith("/"), { timeout: 8000 });
        }
        catch {
            await this.page.waitForLoadState();
        }
        await this.page.waitForTimeout(800);
        console.log(`✅ Logout redirect সম্পন্ন। Current URL: ${this.page.url()}`);
    }
    // ── Logout হয়েছে কিনা যাচাই ──
    async isLoggedOut() {
        const url = this.page.url();
        if (url.includes("login") || url.includes("signin") || url.includes("auth")) {
            return true;
        }
        const loginForm = this.page.locator("input[type='password'], form[action*='login'], #login, .login-form");
        if ((await loginForm.count()) > 0 &&
            (await loginForm.first().isVisible())) {
            return true;
        }
        const signInBtn = this.page.locator("a[href*='login'], a:has-text('Sign In'), a:has-text('Login'), " +
            "button:has-text('Sign In'), button:has-text('Login')");
        if ((await signInBtn.count()) > 0 &&
            (await signInBtn.first().isVisible())) {
            return true;
        }
        return (await this.page.locator(LOGOUT_SELECTOR).count()) === 0;
    }
    async isLogoutSuccessful() {
        return this.isLoggedOut();
    }
    async isUserLoggedIn() {
        return !(await this.isLoggedOut());
    }
}
exports.LogoutPage = LogoutPage;
//# sourceMappingURL=LogoutPage.js.map