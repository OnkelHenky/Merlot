/**
 * Created by Alexander Henka on 11.07.14.
 * Copyright by Alexander Henka
 */


var exports = module.exports;

/**
 * @description
 * Check if a property is a not undefined and a valid string
 * @param stringToTest
 * @returns {*|boolean}
 */
module.exports.isString = function(stringToTest) {
   return (stringToTest && (typeof stringToTest === 'string' || stringToTest instanceof String));
};

/**
 * @description
 * Check if a property is a number
 * @param numberToTest
 * @returns {boolean}
 */
module.exports.isNumber = function(numberToTest) {
    return !isNaN(numberToTest);
};

