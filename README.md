# QA Brains Automation — TypeScript + Playwright + Cucumber

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.53-green?logo=playwright)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen?logo=cucumber)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

**Author:** Ranajit Baran Chowdhury — QA Automation Engineer
**Email:** chyranajit@gmail.com

A production-grade **BDD (Behavior Driven Development)** test automation framework built with **TypeScript**, **Playwright**, and **Cucumber** — migrated from the original Java + Playwright + Cucumber project.

---

## 📁 Project Structure

```
QaBrainAutomation-TypeScript-Playwright/
├── config/
│   └── config.ts                  ← Java-এর config.properties + ConfigReader
├── features/                      ← সব .feature ফাইল (Java থেকে হুবহু same)
│   ├── Login.feature
│   ├── Logout.feature
│   ├── CartCheckout.feature
│   ├── Registration.feature
│   ├── ForgotPassword.feature
│   ├── SmokeTests.feature
│   └── RegressionTests.feature
├── src/
│   ├── utils/
│   │   └── BrowserManager.ts      ← Java-এর BaseTest + DriverFactory
│   ├── hooks/
│   │   └── Hooks.ts               ← Java-এর Hooks.java (@Before / @After)
│   ├── pages/                     ← Java-এর pages package (Page Object Model)
│   │   ├── LoginPage.ts
│   │   ├── LogoutPage.ts
│   │   ├── CartPage.ts
│   │   ├── ForgotPasswordPage.ts
│   │   └── RegistrationPage.ts
│   └── steps/                     ← Java-এর stepdefinitions package
│       ├── CommonSteps.ts
│       ├── LoginSteps.ts
│       ├── LogoutSteps.ts
│       ├── CartSteps.ts
│       ├── ForgotPasswordSteps.ts
│       ├── RegistrationSteps.ts
│       ├── RegressionSteps.ts
│       └── SmokeSteps.ts
├── dist/                          ← TypeScript compiled output (auto-generated)
├── reports/                       ← HTML + JSON reports তৈরি হবে এখানে
│   └── cucumber-report.html
├── package.json                   ← Java-এর pom.xml এর equivalent
├── tsconfig.json                  ← TypeScript compiler configuration
└── cucumber.js                    ← Java-এর TestRunner.java এর equivalent
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| TypeScript | 5.0+ | Programming language |
| Playwright | 1.53+ | Browser automation |
| Cucumber JS | 11.0+ | BDD framework |
| Node.js | 18+ | Runtime environment |
| ts-node | 10.9+ | TypeScript execution |

---

## ⚙️ Installation & Setup

**1. Clone the repository:**
```bash
git clone https://github.com/ranajitchowdhury/QaBrainAutomation-TypeScript-Playwright.git
cd QaBrainAutomation-TypeScript-Playwright
```

**2. Install dependencies:**
```bash
npm install
```

**3. Fix permissions (Mac only):**
```bash
chmod +x node_modules/.bin/*
```

**4. Install Playwright browser:**
```bash
npx playwright install chromium
```

**5. Compile TypeScript:**
```bash
npx tsc
```

---

## ▶️ Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | সব test চালান |
| `npm run test:smoke` | শুধু Smoke tests |
| `npm run test:regression` | শুধু Regression tests |
| `npm run test:login` | শুধু Login tests |
| `npm run test:logout` | শুধু Logout tests |
| `npm run test:registration` | শুধু Registration tests |
| `npm run test:cart` | শুধু Cart tests |

---

## 📊 Test Results

| Feature | Scenarios | Status |
|---------|-----------|--------|
| Login | 2 | ✅ Pass |
| Logout | 1 | ✅ Pass |
| Registration | 2 | ✅ Pass |
| Forgot Password | 2 | ✅ Pass |
| Cart Checkout | 2 | ✅ Pass |
| Smoke Tests | 3 | ✅ Pass |
| Regression R-02, R-03 | 2 | ✅ Pass |
| Regression R-01 | 1 | ⚠️ Pending* |

> **\* Known Issue:** The E-Commerce component on `practice.qabrains.com` intermittently fails to load (`Failed to fetch component data`). This is a server-side defect on the practice site. R-01 is tagged `@known_issue` and handled as Pending.

---

## 🔄 Java → TypeScript Migration Map

| Java | TypeScript | পরিবর্তন |
|------|-----------|---------|
| `pom.xml` | `package.json` | Maven → npm |
| `config.properties` + `ConfigReader.java` | `config/config.ts` | Properties → TypeScript object |
| `BaseTest.java` + `DriverFactory.java` | `BrowserManager.ts` | Static class → Singleton |
| `Hooks.java` | `src/hooks/Hooks.ts` | `@Before`/`@After` → same concept |
| `TestRunner.java` | `cucumber.js` | CucumberOptions → JS config |
| `LoginPage.java` | `LoginPage.ts` | `void` → `async/await` |
| `*Steps.java` | `*Steps.ts` | TestNG Assert → Node `assert` |
| `.feature` files | `.feature` files | **হুবহু একই — কোনো পরিবর্তন নেই** |

---

## 🔑 Key Differences: Java vs TypeScript

### 1. Async/Await
```java
// Java — Synchronous (blocking)
page.navigate("https://practice.qabrains.com/");
page.waitForLoadState();
```
```typescript
// TypeScript — Asynchronous (non-blocking)
await page.goto("https://practice.qabrains.com/");
await page.waitForLoadState();
```

### 2. Type System
```java
// Java
private final Page page;
public void login(String email, String password) { }
```
```typescript
// TypeScript
private readonly page: Page;
async login(email: string, password: string): Promise<void> { }
```

### 3. Null Check
```java
// Java
if (page == null) { page = BaseTest.getPage(); }
```
```typescript
// TypeScript
if (!page) { page = browserManager.getPage(); }
```

### 4. Assertions
```java
// Java — TestNG
Assert.assertTrue(result, "Login failed");
Assert.assertEquals(actual, expected, "Mismatch");
```
```typescript
// TypeScript — Node assert
assert.ok(result, "Login failed");
assert.strictEqual(actual, expected, "Mismatch");
```

### 5. Exception Handling
```java
// Java
try { ... } catch (Exception e) { e.printStackTrace(); }
```
```typescript
// TypeScript
try { ... } catch (e: any) { console.error(e.message); }
```

### 6. Locators
```java
// Java
page.locator("#email").first().fill(email);
page.locator("button[type='submit']").first().click();
```
```typescript
// TypeScript — same API, just await added
await page.locator("#email").first().fill(email);
await page.locator("button[type='submit']").first().click();
```

---

## 🏗️ Framework Architecture

```
Feature Files (.feature)
        ↓
Step Definitions (src/steps/)
        ↓
Page Object Model (src/pages/)
        ↓
BrowserManager (src/utils/BrowserManager.ts)
        ↓
Playwright → Chromium Browser
```

### Design Patterns Used
- **Page Object Model (POM)** — locators ও actions আলাদা class-এ
- **BDD (Gherkin)** — Given/When/Then দিয়ে human-readable tests
- **Singleton Pattern** — BrowserManager একটি instance সব জায়গায় শেয়ার করে
- **Hooks** — Before/After-এ browser lifecycle manage করা
- **Known Issue Handling** — `@known_issue` tag দিয়ে broken components gracefully skip করা
- **Screenshot on Failure** — যেকোনো step fail হলে auto screenshot

---

## 🏷️ Tags

| Tag | Description |
|-----|-------------|
| `@smoke` | Critical path — build verification |
| `@regression` | Full regression suite |
| `@Login` | Login scenarios |
| `@Logout` | Logout scenarios |
| `@Registration` | Registration scenarios |
| `@CartCheckout` | Cart scenarios |
| `@known_issue` | Known site bugs — skipped as Pending |

---

## 📸 Reports & Screenshots

**HTML Report location:**
```
reports/cucumber-report.html
```

**Failure screenshots:**
```
reports/screenshots/FAILED_<ScenarioName>.png
```

Open report in browser:
```bash
open reports/cucumber-report.html
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Compile TypeScript: `npx tsc`
4. Run tests: `npm test`
5. Commit: `git commit -m 'Add your feature'`
6. Push: `git push origin feature/your-feature`
7. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Ranajit Baran Chowdhury**
QA Automation Engineer
- 📧 Email: chyranajit@gmail.com
- 🐙 GitHub: [@ranajitchowdhury](https://github.com/ranajitchowdhury)
