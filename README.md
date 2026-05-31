# QA Brains Automation — TypeScript + Playwright + Cucumber

## 🗂️ প্রজেক্ট স্ট্রাকচার

```
ts-playwright-project/
├── config/
│   └── config.ts           ← Java-এর config.properties + ConfigReader
├── features/               ← সব .feature ফাইল (Java থেকে হুবহু same)
│   ├── Login.feature
│   ├── Logout.feature
│   ├── CartCheckout.feature
│   ├── Registration.feature
│   ├── ForgotPassword.feature
│   ├── SmokeTests.feature
│   └── RegressionTests.feature
├── src/
│   ├── utils/
│   │   └── BrowserManager.ts  ← Java-এর BaseTest + DriverFactory
│   ├── hooks/
│   │   └── Hooks.ts           ← Java-এর Hooks.java (@Before / @After)
│   ├── pages/                 ← Java-এর pages package
│   │   ├── LoginPage.ts
│   │   ├── LogoutPage.ts
│   │   ├── CartPage.ts
│   │   ├── ForgotPasswordPage.ts
│   │   └── RegistrationPage.ts
│   └── steps/                 ← Java-এর stepdefinitions package
│       ├── LoginSteps.ts
│       ├── LogoutSteps.ts
│       ├── CartSteps.ts
│       ├── CommonSteps.ts
│       ├── ForgotPasswordSteps.ts
│       ├── RegistrationSteps.ts
│       ├── RegressionSteps.ts
│       └── SmokeSteps.ts
├── reports/                ← HTML + JSON reports তৈরি হবে এখানে
├── package.json            ← Java-এর pom.xml এর equivalent
├── tsconfig.json           ← TypeScript compiler config
└── cucumber.js             ← Java-এর TestRunner.java এর equivalent
```

---

## ⚙️ Setup করার পদ্ধতি

```bash
# 1. Dependencies install করুন
npm install

# 2. Playwright browsers install করুন
npx playwright install chromium
```

---

## ▶️ Test চালানো

```bash
# সব test
npm test

# শুধু Smoke tests
npm run test:smoke

# শুধু Regression tests
npm run test:regression

# শুধু Login tests
npm run test:login
```

---

## 🔄 Java → TypeScript: কোনটা কোনটায় পরিণত হয়েছে?

| Java ফাইল | TypeScript ফাইল | পরিবর্তন |
|---|---|---|
| `pom.xml` | `package.json` | Maven → npm |
| `config.properties` + `ConfigReader.java` | `config/config.ts` | Properties file → TypeScript object |
| `BaseTest.java` + `DriverFactory.java` | `BrowserManager.ts` | Class → Singleton instance |
| `Hooks.java` | `src/hooks/Hooks.ts` | `@Before`/`@After` একই কাজ করে |
| `TestRunner.java` | `cucumber.js` | CucumberOptions → JS config |
| `LoginPage.java` | `LoginPage.ts` | `void` → `async/await` |
| সব `*Steps.java` | সব `*Steps.ts` | TestNG Assert → Node `assert` |
| `.feature` files | `.feature` files | **হুবহু একই!** |

---

## 🔑 গুরুত্বপূর্ণ পার্থক্যসমূহ

### 1. Async/Await
```java
// Java (Blocking/Synchronous)
page.navigate("https://example.com");
page.waitForLoadState();
```
```typescript
// TypeScript (Non-blocking/Asynchronous)
await page.goto("https://example.com");
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

### 4. Assert
```java
// Java (TestNG)
Assert.assertTrue(result, "message");
Assert.assertEquals(actual, expected, "message");
```
```typescript
// TypeScript (Node assert)
assert.strictEqual(result, true, "message");
assert.strictEqual(actual, expected, "message");
```

### 5. Exception Handling
```java
// Java
try { ... } catch (Exception e) { ... }
```
```typescript
// TypeScript
try { ... } catch (e: any) { ... }  // 'any' type লাগে
```
