var types = (function (exports) {
    'use strict';

    var sum2 = function (num1, num2) {
        console.log("我是第pkg2包------", num1, num2);
        return num1 * num2;
    };

    exports.sum2 = sum2;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
