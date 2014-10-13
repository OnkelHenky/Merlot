/**
 * Created by Alexander Henka on 01.08.14.
 * Copyright by Alexander Henka
 */


/**
 * @description
 * Contains steps for interacting with form and input element on a web page
 * @type {navigationSteps}
 */
module.exports = forms_and_input_Steps = function () {

    /**
     * Step to interact with an text field aka:  <input type='text'> element.
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'text' is the text that should be entered into the text field
     * 'identifiedBy' is the property of the hyperlink that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor enters "([^"]*)" into textfield whose ([^"]*) is "([^"]*)"$/, function(text, identifiedBy, identifierValue ,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName': 'textField',
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
            });

        var _stepDescr = "The actor enters "+text+" into textfield whose "
            +_domElement.getSearchAttributeName()
            +" is "+ _domElement.getSearchAttributeValue();


        this.browser.actorTryToFindThisElement(_domElement).
            then(function runAccessibilityEvaluation(webElement) {
                return that.browser.evalAccessibility(webElement,_domElement)
                    .then(function storeIssues(issues) {
                        if(issues){
                            var obj = {};
                            obj.stepDescr = _stepDescr;
                            obj.isssues = issues;
                            that.browser.addAccessibilityIssue(obj);
                        }
                        return webElement
                    });
            }).
            then(function enterText(webElement) {
                return that.browser.enterText(webElement, text); //  auxilia.inputText.call(that,text,webElement);
            }).
            then(function onOk(prm) {
                callback();
            }).
            then(null, function onError(err) {
                that.browser.errorHandler(err,_SELECTdomElement,_stepDescr,callback);
               // callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
            });

    });


    /**
     * Step to enter a provided username into a text field
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'identifiedBy' is the property of the text field that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor enters the username into textfield whose ([^"]*) is "([^"]*)"$/, function(identifiedBy, identifierValue ,callback) {
        var that = this,
            _domElement,
            _logger = this.browser.logger;

        if (that.browser.actor.getUsername() !== undefined) {

            var _username = that.browser.actor.getUsername();
            _domElement = this.browser.createDOMElement({
                'tagName': 'textField',
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
            });

            var _stepDescr = "The actor enters the username into textfield whose "
                +_domElement.getSearchAttributeName()
                +" is "+ _domElement.getSearchAttributeValue();

            this.browser.actorTryToFindThisElement(_domElement).
                then(function runAccessibilityEvaluation(webElement) {
                    return that.browser.evalAccessibility(webElement,_domElement)
                        .then(function storeIssues(issues) {
                            if(issues){
                                var obj = {};
                                obj.stepDescr = _stepDescr;
                                obj.isssues = issues;
                                that.browser.addAccessibilityIssue(obj);
                            }
                            return webElement
                        });
                }).
                then(function (webElement) {
                    return that.browser.enterText(webElement, _username);
                }).
                then(function onOk(prm) {
                    callback();
                }).
                then(null, function onError(err) {
                    that.browser.errorHandler(err,_SELECTdomElement,_stepDescr,callback);
                    //callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
                });


        } else {
            callback.fail(new Error("No username defined for this actor, use 'Given Username is 'username'' in the cucumber scenario definition, to set a username ").message);
        }

    });

    /**
     * Step to enter a provided password into a text field
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'identifiedBy' is the property of the text field that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor enters the password into textfield whose ([^"]*) is "([^"]*)"$/, function(identifiedBy, identifierValue ,callback) {
        var that = this,
            _domElement; // that.browser.actor.getPassword() || "NOPE, no PW",//callback.fail(new ReferenceError("No password defined for this actor, use 'Given Password is 'password'' in the cucumber scenario definition, to set a password ").message),

        if (that.browser.actor.getPassword() !== undefined) {
            var _password = that.browser.actor.getPassword();
            _domElement = this.browser.createDOMElement({
                'tagName': 'textField',
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
            });

            var _stepDescr = "The actor enters the username into textfield whose "
                +_domElement.getSearchAttributeName()
                +" is "+ _domElement.getSearchAttributeValue();

            this.browser.actorTryToFindThisElement(_domElement).
                then(function runAccessibilityEvaluation(webElement) {
                    return that.browser.evalAccessibility(webElement,_domElement)
                        .then(function storeIssues(issues) {
                            if(issues){
                                var obj = {};
                                obj.stepDescr = _stepDescr;
                                obj.isssues = issues;
                                that.browser.addAccessibilityIssue(obj);
                            }
                            return webElement
                        });
                }).
                then(function (webElement) {
                    return that.browser.enterText(webElement, _password);
                }).
                then(function onOk(prm) {
                    callback();
                }).
                then(null, function onError(err) {
                    that.browser.errorHandler(err,_SELECTdomElement,_stepDescr,callback);
                   // callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _domElement).message);
                });

        } else {
            callback.fail(new Error("No password defined for this actor, use 'Given Password is 'password'' in the cucumber scenario definition, to set a password ").message);
        }

    });

    /**
     * Step to select an option from a group of radio buttons
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'identifiedBy' is the property of the option element that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'radiogroupName' is the name attribute of the radio group
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor selects the option whose ([^"]*) is "([^"]*)" from the radiogroup "([^"]*)"$/, function(identifiedBy,identifierValue,radiogroupName,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName' : 'radiobutton',
                'name' : radiogroupName,
                'identifiedBy' : identifiedBy,
                'identifierValue' : identifierValue
            });


        var _stepDescr = "The actor selects the option whose "
            +_domElement.getSearchAttributeName()
            +" is "+ _domElement.getSearchAttributeValue()
            +"from the radiogroup " + radiogroupName ;

        /*Find the radio group first*/
        this.browser.actorTryToFindThisElement(_domElement).
            then(function runAccessibilityEvaluation(webElement) {
                return that.browser.evalAccessibility(webElement,_domElement)
                    .then(function storeIssues(issues) {
                        if(issues){
                            var obj = {};
                            obj.stepDescr = _stepDescr;
                            obj.isssues = issues;
                            that.browser.addAccessibilityIssue(obj);
                        }
                        return webElement
                    });
            }).
            then(function findTheRadioButtonInTheRadioGroup(webElement){
                /*Here we have the first element in the radio group*/
                return that.browser.interactWithRadioButton(webElement,_domElement);
            }).
            then(function onOK() {
                callback();
            }).
            then(null, function onError(err) {
                that.browser.logger.error(err.name + ": " + err.message);
                that.browser.errorHandler(err,_SELECTdomElement,_stepDescr,callback);
                //callback.fail(err.name + ": " + err.message);
            });
    });

    /**
     * Step to choose an option from a selection, aka drop down menu
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'identifiedBy' is the property of the option element that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'identifierValue' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor chooses "([^"]*)" from the selection whose ([^"]*) is "([^"]*)"$/, function(chooseValue,identifiedBy,identifierValue,callback) {
        var that = this,
            _SELECTdomElement = this.browser.createDOMElement({
                'tagName': 'select',
                'identifiedBy': identifiedBy,
                'identifierValue': identifierValue
            }),
            _SELECTOptionElement = this.browser.createDOMElement({
                'tagName': 'option',
                'identifiedBy': 'textNode',
                'identifierValue': chooseValue
            });

        var _stepDescr = "The actor chooses "+chooseValue+" from the selection whose "
            +_SELECTdomElement.getSearchAttributeName()
            +" is "+ _SELECTdomElement.getSearchAttributeValue();

        this.browser.actorTryToFindThisElement(_SELECTdomElement).
            then(function runAccessibilityEvaluation(webElement) {
                return that.browser.evalAccessibility(webElement,_SELECTdomElement)
                    .then(function storeIssues(issues) {
                        if(issues){
                            var obj = {};
                            obj.stepDescr = _stepDescr;
                            obj.isssues = issues;
                            that.browser.addAccessibilityIssue(obj);
                        }
                        return webElement
                    });
            }).
            then(function interactWithSelectionAndChooseOption(selectionElement) {
                return that.browser.interactWithSelection(selectionElement, _SELECTOptionElement);
            }).
            then(function onOk() {
                callback();
            }).
            then(null, function onError(err) {
                that.browser.errorHandler(err,_SELECTdomElement,_stepDescr,callback);
               // callback.fail(new Error("Merlot reported an error! " + err + " with DOMElement: " + _SELECTdomElement).message);
            });

    });

    /**
     * Step to interact with an image
     * The step first performs an look up for the element and a interaction if the look up was successfully.
     * 'identifiedBy' is the property of the option element that need to be found.
     *                Allowed values are: @name, @href, @value, @label, @css, @style and >text
     * 'value' is the value of the identifiedBy property
     *                Allowed values are: Any string or numeric combination, that is allowed in the respective identifiedBy property
     * 'callback' is the cucumber callback.
     */
    this.When(/^The actor interacts with an image whose ([^"]*) is "([^"]*)"$/, function(identifiedBy, value ,callback) {
        var that = this,
            _domElement = this.browser.createDOMElement({
                'tagName' : 'img',
                'searchAttribute' : {
                    "name":  'id',
                    'value': elementID
                }
            });

        var _stepDescr = "The actor interacts with a image whose "
            +_domElement.getSearchAttributeName()
            +" is "+ _domElement.getSearchAttributeValue();

        this.browser.actorTryToFindThisElement(_domElement).
            then(function runAccessibilityEvaluation(webElement) {
                return that.browser.evalAccessibility(webElement,_domElement)
                    .then(function storeIssues(issues) {
                        if(issues){
                            var obj = {};
                            obj.stepDescr = _stepDescr;
                            obj.isssues = issues;
                            that.browser.addAccessibilityIssue(obj);
                        }
                        return webElement
                    });
            }).
            then(function (webElement) {
                return that.browser.click(webElement,that.browser.webdriver.Key.ENTER);
            }).
            then(function onOk() {
                callback();
            }).
            then(null, function onError(err) {
                that.browser.errorHandler(err,_domElement,_stepDescr,callback);
               // callback.fail(new Error("Merlot reported an error! " + err +" with DOMElement: "+_domElement).message);
            });

    });
};