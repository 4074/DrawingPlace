"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.jsonit = jsonit;
exports.pushData = pushData;
function jsonit() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "操作成功";
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (typeof status !== "boolean") {
        data = status;
        status = true;
    }
    if (!data && typeof message !== "string") {
        data = message, message = "操作成功";
    }
    return {
        status: status,
        message: message,
        data: data
    };
}

function pushData(source, target, keys) {
    var split = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ' ';

    keys = typeof keys === 'string' ? keys.split(split) : keys;
    keys.forEach(function (k) {
        target[k] = source[k];
    });
    return target;
}