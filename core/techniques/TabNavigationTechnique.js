/**
 * Created by Henka on 19.06.14.
 */


module.exports = tabNavigationTechnique = function (tagName,ele) {

    var that = this,
        _by = that.webdriver.By;

    var deferred = that.webdriver.promise.defer(),
        webElement;

    var  action_to_be_performed = that.driver.actions().sendKeys(that.webdriver.Key.TAB);

    /**
     * Helper function to check if a attribute is present
     * @param webElement
     * @param attribute
     * @returns {boolean}
     */
    var isAttributePresent = function(webElement , attribute) {
        var result = false;
        try {
            result = webElement.getAttribute(attribute);
            if (result != null){
                result = true;
            }
        } catch (exception) {
            console.error('Error from "isAttributePresent": '+exception);
        }
        return result;
    };

    /**
     * Helper function to check if a web element hast a text node
     * @param webElement
     * @returns {boolean}
     */
    var hasTextNode = function(webElement) {
        var result = false;
        try {
            result = webElement.getText();
            if (result != null){
                result = true;
            }
        } catch (exception) {
            console.error('Error from "hasTextNode": '+exception);
        }
        return result;
    };


    var helperFunction = function (ele) {
        return action_to_be_performed.perform()
            .then(function () {
                if(webElement === undefined){
                    webElement = that.driver.switchTo().activeElement();
                }else{
                    that.webdriver.WebElement.equals(webElement,that.driver.switchTo().activeElement()).then(function (eq) {
                        if(eq){
                            var _errorText;
                            switch (true){
                                case (ele.href && !(ele.id && ele.text)):
                                    _errorText = 'Element with href= '+ele.href+'cloud not be found or reached!';
                                    break;
                                case (ele.id && !(ele.href && ele.text)):
                                    _errorText = 'Element with id= '+ele.id+'cloud not be found or reached!';
                                    break;
                                case (ele.text && !(ele.id && ele.href)):
                                    _errorText = 'Element with text= '+ele.text+'cloud not be found or reached!';
                                    break;
                            }
                            return deferred.reject(new Error(_errorText));
                        }

                    });

                }

                return that.driver.switchTo().activeElement();
            })
            .then(function (activeElement) {
                switch (true){
                    case (ele.href && !(ele.id && ele.text)):
                        if (isAttributePresent(activeElement, 'href')) {
                            return activeElement.getAttribute('href')
                                .then(function (text) {
                                    return (text === ele.href) ? activeElement : helperFunction(ele);
                                });

                        } else {
                            return helperFunction(ele);
                        }
                        break;
                    case (ele.id && !(ele.href && ele.text)):
                        if (isAttributePresent(activeElement, 'id')) {
                            return activeElement.getAttribute('id')
                                .then(function (text) {
                                    return (text === ele.id) ? activeElement : helperFunction(ele);
                                });

                        } else {
                            return helperFunction(ele);
                        }
                        break;
                    case (ele.text && !(ele.id && ele.href)):
                        if (hasTextNode(activeElement)) {
                            return  activeElement.getText()
                                .then(function (text) {
                                    return (text === ele.text) ? activeElement : helperFunction(ele);
                                });

                        } else {
                            return helperFunction(ele);
                        }
                        break;
                    default :
                        return deferred.reject(new Error('Element with href= '+ele+' not found!'));
                        break;
                }
            })
    };
    return helperFunction(ele);

};