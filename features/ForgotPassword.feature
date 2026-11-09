Feature: Forgot Password functionality
  As a user
  I want to reset my password
  So that I can regain access to my account

  @smoke @regression @ForgotPassword
  Scenario: Registered user can reset password
    Given User is on Forgot Password page
    When User requests a password reset for "chyranajit@gmail.com"
    Then User should see success message "Password is reset successfully"

  @regression @ForgotPassword
  Scenario: Malformed e-mail is rejected
    Given User is on Forgot Password page
    When User requests a password reset for "chyranajitgmail.com"
    Then User should see error message "missing an '@'"
