Feature: Github Search

  Scenario: I search for a github repository
    Given I search form cukes-js
    Then I expect to find this library
