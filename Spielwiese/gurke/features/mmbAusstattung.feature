Feature: Example feature
  As a student of mobile media
  I should be able to read the contact page
  to get answers to my questions about mobile media and the studies at the HdM

  Scenario: Go to the contact page
    Given I go on the website "http://www.mi.hdm-stuttgart.de/mmb"
    When I click on the link with href "http://www.mi.hdm-stuttgart.de/mmb/studium/fragen-zum-studium/fragen-im-studium/index_html"
    Then I should see "Studium - Fragen imStudium - Mobile Medien" in the title