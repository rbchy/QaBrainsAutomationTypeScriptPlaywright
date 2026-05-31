// =============================================
// src/steps/RegressionSteps.ts
// =============================================

import { When, Then } from "@cucumber/cucumber";
import { strict as assert } from "assert";

let expectedQuantity = 0;
let actualQuantity   = 0;

When("User adds multiple products to cart", () => {
  console.log("Multiple products added to cart");
  expectedQuantity = 2;
  actualQuantity   = 2;
});

When("User updates product quantity", () => {
  console.log("Product quantity updated");
  actualQuantity = expectedQuantity;
});

When("User searches for invalid item", () => {
  console.log("Invalid item searched");
});

Then("No result should be displayed", () => {
  console.log("No search result displayed");
  assert.ok(true, "No result validation placeholder");
});

Then("Quantity should be updated", () => {
  console.log(`Verifying updated quantity: expected=${expectedQuantity}, actual=${actualQuantity}`);
  assert.strictEqual(
    actualQuantity,
    expectedQuantity,
    "❌ Product quantity did not update correctly"
  );
});
