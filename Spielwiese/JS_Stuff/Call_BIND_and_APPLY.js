/**
 * Created by Henka on 18.06.14.
 */


(function () {

var obj = {};
this.x = 9;
this.toman = "Hallo, ich bin global";


obj.value = 10;
obj.toman = "Hallo, ich bin Toman";
/** @param {...number} additionalValues */
obj.addValues = function(additionalValues) {
    for (var i = 0; i < arguments.length; i++) {
        this.value += arguments[i];
    }
    return this.value;
};

obj.doSomething = function (arg1, arg2, arg3) {
    console.log(this.toman);
    console.log("Arg1 = "+arg1);
    console.log("Arg2 = "+arg2);
    console.log("Arg3= " +arg3);
};

// Evaluates to 30 because obj is used as the value for 'this' when
// obj.addValues() is called, so obj.value becomes 10 + 20.
console.log(obj.doSomething(1,2,3));
console.log(obj.addValues(20));

var f = obj.addValues;
// Evaluates to NaN because window is used as the value for 'this' when
// f() is called. Because and window.value is undefined, adding a number to
// it results in NaN.
console.log(f(20));
// This also has the unintentional side effect of adding a value to window:

var r = obj.doSomething.bind(obj);
r(1,2,3);
r.apply(obj,[2,3,1]);



var module = {
        x: 81,
        getX: function() { return this.x; }
    };



var whatiSX = module.getX(); // 81
console.log('whatiSX = '+whatiSX);

var getX = module.getX;
console.log(getX()); // 9, because in this case, "this" refers to the global object

// create a new function with 'this' bound to module
var boundGetX = getX.bind(module);
boundGetX(); // 81

})();
