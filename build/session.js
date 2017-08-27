'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initSession;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSession() {
    var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
    var sess = {
        key: _config2.default.app.name + '-session',
        secret: _config2.default.app.name,
        store: new MongoStore({ mongooseConnection: _mongoose2.default.connection }),
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: false,
            maxAge: 30 * 24 * 3600 * 1000
        }
    };

    return (0, _expressSession2.default)(sess);
}