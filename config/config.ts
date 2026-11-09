// =============================================
// config/config.ts — one place for URLs, accounts and run settings.
// Environment variables win: HEADLESS=true (CI), BROWSER=firefox|webkit.
// =============================================

export const config = {
  url: "https://practice.qabrains.com/",

  browser: (process.env.BROWSER ?? "chromium") as "chromium" | "firefox" | "webkit",
  headless: (process.env.HEADLESS ?? "false").toLowerCase() === "true",
  timeout: 15_000, // element / assertion timeout (ms)
  stepTimeout: 60_000, // one Cucumber step (ms)

  // Public practice accounts published by QA Brains
  validEmail: "qa_testers@qabrains.com",
  validPassword: "Password123",
  shopEmail: "test@qabrains.com",
  shopPassword: "Password123",

  viewportWidth: 1440,
  viewportHeight: 900,
};
