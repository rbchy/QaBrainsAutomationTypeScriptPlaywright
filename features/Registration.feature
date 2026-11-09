Feature: User Registration
  As a new user
  I want to register an account
  So that I can access the application

  Background:
    Given User is on the registration page

  @smoke @regression @Registration
  Scenario: Successful user registration with a unique email
    When User registers with a unique email
    Then User should be registered successfully

  @regression @Registration
  Scenario: Registration should fail with invalid email
    When User registers with email "chyranajitgmail.com"
    Then Email validation error message should be displayed
