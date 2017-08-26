/**
 * Created by Alexander Henka on 11.07.14.
 * Copyright by Alexander Henka
 */


/**
 * @description
 * Check if property is a not undefined and a valid string
 * @param stringToTest
 * @returns {*|boolean}
 */
module.exports.isString = function(stringToTest) {
   return (stringToTest && (typeof stringToTest === 'string' || stringToTest instanceof String));
};

/**
 * @description
 * Check if  property is a number
 * @param numberToTest
 * @returns {boolean}
 */
module.exports.isNumber = function(numberToTest) {
    return !isNaN(numberToTest);
};

/**
 * @description
 * Resolving the identifier of an DOMElement by cutting if the '@' form the cucumber scenario steps
 * Example: if you have a step like: 'The actor chooses "Saab" from the selection whose @id is "cars"'
 * The '@' in '@id' indicates the the attribute: 'id' with the value 'cars' should be selected.
 * The '@' is just an abbreviation for attribute and must be cut of before further processing.
 * @param identifiedBy
 * @returns {*}
 */
module.exports.resolveAttributeName = function (identifiedBy) {
    let _resolvedIdentifiedBy = void 0;  //undefined

    switch (identifiedBy) {
        case "@id":
        case "@name":
        case "@href":
        case "@value":
        case "@label":
        case "@css":
        case "@style":
            _resolvedIdentifiedBy = identifiedBy.split("@")[1];
            /* Cutting of the '@' */
            break;
        case "textNode":
        case ">text":
            _resolvedIdentifiedBy = "textNode"; //identifiedBy.split(">")[1]; /* Cutting of the '>' */
            break;
        default:
            throw new Error('"' + identifiedBy + '" is not valid identifier! e.g.; "@id", "@name", "@value" or ">text", to get the text node value');
            break;
    }
    return _resolvedIdentifiedBy;
};
