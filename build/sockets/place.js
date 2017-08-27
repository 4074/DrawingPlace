'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = draw;

var _utils = require('../utils');

var _services = require('../services');

function draw(socket) {
    socket.on('draw', function (params, cb) {
        var user = params.user,
            data = params.data;

        socket.emit('draw', data);
        socket.broadcast.emit('draw', data);
        cb((0, _utils.jsonit)(true));

        // save to database
        _services.PlaceService.createAction({
            point: data,
            user: user.username
        });

        _services.PlaceService.savePoint(_extends({}, data, {
            user: user.username
        }));
    });
}