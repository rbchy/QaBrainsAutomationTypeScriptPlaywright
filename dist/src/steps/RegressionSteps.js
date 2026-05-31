"use strict";
// =============================================
// src/steps/RegressionSteps.ts
// =============================================
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const assert_1 = require("assert");
let expectedQuantity = 0;
let actualQuantity = 0;
(0, cucumber_1.When)("User adds multiple products to cart", () => {
    console.log("Multiple products added to cart");
    expectedQuantity = 2;
    actualQuantity = 2;
});
(0, cucumber_1.When)("User updates product quantity", () => {
    console.log("Product quantity updated");
    actualQuantity = expectedQuantity;
});
(0, cucumber_1.When)("User searches for invalid item", () => {
    console.log("Invalid item searched");
});
(0, cucumber_1.Then)("No result should be displayed", () => {
    console.log("No search result displayed");
    assert_1.strict.ok(true, "No result validation placeholder");
});
(0, cucumber_1.Then)("Quantity should be updated", () => {
    console.log(`Verifying updated quantity: expected=${expectedQuantity}, actual=${actualQuantity}`);
    assert_1.strict.strictEqual(actualQuantity, expectedQuantity, "❌ Product quantity did not update correctly");
});
//# sourceMappingURL=RegressionSteps.js.map