'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _services = require('../services');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/get', function (req, res) {
    var user = req.session.user ? req.session.user : {
        username: 'nobody'
    };
    req.session.user = user;
    res.json((0, _utils.jsonit)(true, user));
});

router.post('/login', function (req, res) {
    var params = req.body.data;

    if (!params.username || !params.password) {
        return res.json((0, _utils.jsonit)(false, "参数不足"));
    }

    _services.UserService.login(params).then(function (data) {
        req.session.user = data;
        res.json((0, _utils.jsonit)(true, data));
    }, function (err) {
        res.json((0, _utils.jsonit)(false, err.message));
    });
});

router.post('/logout', function (req, res) {
    req.session.regenerate(function (err) {
        if (err) console.log(err);
        res.json((0, _utils.jsonit)(!err));
    });
});

router.post('/signup', function (req, res) {
    var params = req.body.data;

    _services.UserService.signup({
        username: params.username,
        password: params.password
    }).then(function (data) {
        req.session.user = data;
        res.json((0, _utils.jsonit)(true, data));
    }).catch(function (err) {
        res.json((0, _utils.jsonit)(false, err.message));
    });
});

exports.default = router;