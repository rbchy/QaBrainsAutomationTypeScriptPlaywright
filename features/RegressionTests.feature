Feature: Regression Test Suite

  Background:
    Given User is logged in to the e-commerce site

  @regression @Cart
  Scenario: R-01 Add multiple products to cart
    When User adds 3 products to cart
    Then 3 products should be in the cart

  @regression @Shop
  Scenario: R-02 Open product details
    When User opens the details of the first product
    Then The product details page should show its name and price

  @regression @Shop
  Scenario: R-03 Every product shows a name, price and cart button
    Then Every product card should show a name, a price and an "Add to cart" button
