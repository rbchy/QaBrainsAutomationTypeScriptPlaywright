Feature: Cart Functionality
  As a shopper on the e-commerce demo
  I want to add and remove products
  So that my cart holds exactly what I chose

  Background:
    Given User is logged in to the e-commerce site
    And The cart is empty

  @smoke @regression @Cart
  Scenario: Add product to cart
    When User adds 1 products to cart
    Then 1 products should be in the cart
    And The cart should still hold 1 products after reloading the shop

  @smoke @regression @Cart
  Scenario: Remove product from cart
    When User adds 1 products to cart
    And User removes product from cart
    Then 0 products should be in the cart
    And The cart should still hold 0 products after reloading the shop
