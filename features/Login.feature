Feature: Login Functionality
  As a user
  I want to login to the application
  So that I can access my account

  Background:
    Given User is on the login page

  @smoke @regression @Login
  Scenario: Login with valid credentials
    When User enters valid username and password
    Then User should be logged in successfully

  @regression @Login
  Scenario: Login with invalid credentials
    When User enters invalid username and password
    Then Error message "Your email and password both are invalid!" should be displayed
