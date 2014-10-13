Accessibility Report
====================

Scenario:  __Interact with a selection and options__

Date:      _Mon. Sep. 22. 2014 17:53:48_

Scenario Description
--------------------

Testbed feature
As a user of Merlot
I should be able to interact with drop down menus,
and to enter his/hers login credentials.

Scenario: Interact with a selection and options
 
    Given Actor is "Anna"
    
    And Actor navigates to the website with URL: "file:///Users/Henka/Arbeit/Development/JavaScript/Projekte/Merlot/spielwiese/testProject/html5-boilerplate/index.html"
    
    Then The actor should be on a web page with "Merlot Testbed" in the title
    When The actor chooses "Saab" from the selection whose @id is "cars"
    And The actor interacts with a button whose @value is "input_type_button"
    Then The actor should be on a web page with "Merlot Testbed" in the title
    When The actor interacts with a "img" element whose @id is "headerBild"
    Then The actor should be on a web page with "Merlot Testbed" in the title


Actor is Anna
-------------


Report
------

 * Step   : "When The actor interacts with a "img" element whose @id is "headerBild""
   ERROR  : Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.
   NOTICE : If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
 
 * Step   : "When The actor interacts with a "img" element whose @id is "headerBild""
   ERROR  : Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.
   NOTICE : If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
    
 * Step   : "When The actor interacts with a "img" element whose @id is "headerBild""
   ERROR  : Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.
   NOTICE : If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.

 *  Check that a change of context does not occur when this input field receives focus.

 *  Check that a change of context does not occur when this input field receives focus.

 *  Check that a change of context does not occur when this input field receives focus.

 *  Check that a change of context does not occur when this input field receives focus.

 *  Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.

 *  If this image cannot be fully described in a short text alternative, ensure a long text alternative is also available, such as in the body text or through a link.
