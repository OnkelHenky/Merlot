Feature: Example feature
  As a student of mobile media
  I should be able to read the contact page
  to get information about teachers, staffs and laboratories

  Scenario: Go to the contact page
    Given Actor is "Anna"
    And She goes on the website "http://www.mi.hdm-stuttgart.de/mmb"
    When She clicks on the link with text "Forschung & Kooperation"
    Then She should see "Übersicht - Mobile Medien" in the title
    And She clicks on the link with href "http://www.mi.hdm-stuttgart.de/mmb/forschung/unternehmen"
    Then She should see "Unternehmen - Mobile Medien" in the title