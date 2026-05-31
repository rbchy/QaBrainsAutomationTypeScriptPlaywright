"use strict";
// =============================================
// src/steps/CartSteps.ts
// Java-এর CartSteps.java এর TypeScript equivalent
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
const BrowserManager_1 = require("../utils/BrowserManager");
const CartPage_1 = require("../pages/CartPage");
let cartPage;
function getCartPage() {
    if (!cartPage) {
        cartPage = new CartPage_1.CartPage(BrowserManager_1.browserManager.getPage());
    }
    return cartPage;
}
(0, cucumber_1.Before)(() => { cartPage = undefined; });
(0, cucumber_1.When)("User adds products to cart", async () => {
    await getCartPage().addProductToCart(0);
});
(0, cucumber_1.Then)("Product should appear in cart", async () => {
    const present = await getCartPage().isProductInCart(0);
    assert_1.strict.strictEqual(present, true, "❌ Error: Product was not found in the cart after adding!");
    console.log("✅ Success: Product verified in cart.");
});
(0, cucumber_1.When)("User removes product from cart", async () => {
    await getCartPage().removeProduct(0);
});
(0, cucumber_1.Then)("Cart should be empty", async () => {
    const present = await getCartPage().isProductInCart(0);
    assert_1.strict.strictEqual(present, false, "❌ Error: Cart is NOT empty after performing remove action!");
    console.log("✅ Success: Cart is empty.");
});
//# sourceMappingURL=CartSteps.js.map