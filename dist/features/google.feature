Feature: Google Search

  Scenario: I perform a google search
    Given I search for the term cucumber
    Then I expect to see google search results