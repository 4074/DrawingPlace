'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _services = require('../services');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/get', function (req, res) {

    var colors = ['000', 'fff', 'aaa', '555', 'fed3c7', 'ffc4ce', 'faac8e', 'ff8b83', 'f44336', 'e91e63', 'e2669e', '9c27b0', '673ab7', '3f51b5', '004670', '057197', '2196f3', '00bcd4', '3be5db', '97fddc', '167300', '37a93c', '89e642', 'd7ff07', 'fff6d1', 'f8cb8c', 'ffeb3b', 'ffc107', 'ff9800', 'ff5722', 'b83f27', '795548'];

    _services.PlaceService.findPoints().then(function (data) {
        var result = {
            colors: colors,
            points: data || [],
            delay: 2
        };
        res.json((0, _utils.jsonit)(true, result));
    }).catch(function (err) {
        res.json((0, _utils.jsonit)(false, err.message));
    });
});

exports.default = router;