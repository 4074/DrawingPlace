'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = login;
exports.signup = signup;

var _models = require('../models');

var _utils = require('../utils');

function login(params) {
    return _models.User.find({ username: params.username }).then(function (data) {
        if (data.length === 0) {
            throw new Error('用户不存在');
        }
        var user = data[0];

        if (user.authenticate(params.password)) {
            var info = user.getDefaultInfo();
            return info;
        } else {
            throw new Error('登录失败');
        }
    });
}

function signup(params) {
    return _models.User.create({
        username: params.username,
        email: '',
        password_origin: params.password
    });
}