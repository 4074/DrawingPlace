'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (server) {
    var io = (0, _socket2.default)(server);
    io.of('/socket/chat').on('connection', function (socket) {
        (0, _chat2.default)(socket);
    });

    io.of('/socket/place').on('connection', function (socket) {
        (0, _place2.default)(socket);
    });
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _chat = require('./chat');

var _chat2 = _interopRequireDefault(_chat);

var _place = require('./place');

var _place2 = _interopRequireDefault(_place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();