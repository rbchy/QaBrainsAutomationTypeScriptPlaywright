// =============================================
// src/steps/ShopSteps.ts — cart and product checks on the e-commerce demo
// =============================================

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { browserManager } from "../utils/BrowserManager";
import { ShopPage } from "../pages/ShopPage";

const shop = () => new ShopPage(browserManager.getPage());

Given("User is logged in to the e-commerce site", async () => {
  await shop().login();
});

Given("The cart is empty", async () => {
  await shop().emptyCart();
});

When("User adds {int} products to cart", async (count: number) => {
  for (let i = 0; i < count; i += 1) {
    await shop().addOne();
  }
});

When("User removes product from cart", async () => {
  await shop().removeOne();
});

Then("{int} products should be in the cart", async (count: number) => {
  await expect(shop().removeButtons).toHaveCount(count);
});

Then("The cart should still hold {int} products after reloading the shop", async (count: number) => {
  await shop().reload();
  await expect(shop().removeButtons).toHaveCount(count);
});

When("User opens the details of the first product", async () => {
  await shop().openFirstProductDetails();
});

Then("The product details page should show its name and price", async () => {
  const page = browserManager.getPage();
  await expect(page.getByText(/\$\d+\.\d{2}/).first()).toBeVisible();
  await expect(page.getByText(/Sample/).first()).toBeVisible();
});

Then(
  "Every product card should show a name, a price and an {string} button",
  async (buttonText: string) => {
    const s = shop();
    const products = await s.distinctProducts();
    expect(products, "products on the page").toBeGreaterThan(0);
    await expect(s.addButtons).toHaveCount(products);
    for (const text of await s.cardTexts()) {
      expect(text, "price on card").toMatch(/\$\d+\.\d{2}/);
      expect(text, "product name on card").toContain("Name");
      expect(text.toLowerCase(), "button on card").toContain(buttonText.toLowerCase());
    }
  }
);
