Feature: Logout Functionality
  As a logged-in user
  I want to logout from the application
  So that my session is securely closed

  Background:
    Given User is on the login page
    And User is logged in

  @smoke @regression @Logout
  Scenario: Logged in user should be able to logout
    When User clicks on logout button
    Then User should be logged out successfully
