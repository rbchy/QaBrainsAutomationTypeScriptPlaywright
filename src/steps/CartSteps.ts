// =============================================
// src/steps/CartSteps.ts
// Java-এর CartSteps.java এর TypeScript equivalent
// =============================================

import { When, Then, Before } from "@cucumber/cucumber";
import { strict as assert } from "assert";
import { browserManager } from "../utils/BrowserManager";
import { CartPage } from "../pages/CartPage";

let cartPage: CartPage;

function getCartPage(): CartPage {
  if (!cartPage) {
    cartPage = new CartPage(browserManager.getPage());
  }
  return cartPage;
}

Before(() => { cartPage = undefined as any; });

When("User adds products to cart", async () => {
  await getCartPage().addProductToCart(0);
});

Then("Product should appear in cart", async () => {
  const present = await getCartPage().isProductInCart(0);
  assert.strictEqual(present, true, "❌ Error: Product was not found in the cart after adding!");
  console.log("✅ Success: Product verified in cart.");
});

When("User removes product from cart", async () => {
  await getCartPage().removeProduct(0);
});

Then("Cart should be empty", async () => {
  const present = await getCartPage().isProductInCart(0);
  assert.strictEqual(present, false, "❌ Error: Cart is NOT empty after performing remove action!");
  console.log("✅ Success: Cart is empty.");
});
