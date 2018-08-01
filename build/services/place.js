'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findPoints = findPoints;
exports.createAction = createAction;
exports.savePoint = savePoint;

var _models = require('../models');

function findPoints() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _models.Point.find(params).select('-_id -create_at -update_at -__v');
}

function createAction(params) {
    var point = params.point,
        user = params.user;

    return _models.Action.create({
        point: point,
        user: user,
        create_at: new Date()
    });
}

function savePoint(params) {
    var x = params.x,
        y = params.y,
        w = params.w,
        h = params.h,
        c = params.c,
        user = params.user;

    return _models.Point.findOne({
        x: x, y: y
    }).then(function (data) {
        if (data) {
            data.w = w;
            data.h = h, data.c = c, data.user = user;
            data.update_at = new Date();

            return data.save();
        } else {
            return _models.Point.create({
                x: x,
                y: y,
                w: w,
                h: h,
                c: c,
                user: user,
                create_at: new Date(),
                update_at: new Date()
            });
        }
    });
}