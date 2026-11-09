Feature: Smoke Tests

  @smoke
  Scenario: S-01 Verify Home page loads
    Given User launches the application
    Then Home page should load successfully

  @smoke
  Scenario: S-02 Verify demo module navigation
    Given User launches the application
    When User opens each demo module from the menu
      | Registration    | registration    |
      | Forgot Password | forgot-password |
      | Form Submission | form-submission |
      | Drag and Drop List | drag          |
    Then Each module page should open

  @smoke
  Scenario: S-03 Verify the e-commerce demo site opens
    Given User launches the application
    When User opens each demo module from the menu
      | E-Commerce Site | ecommerce |
    Then Each module page should open
