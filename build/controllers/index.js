'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaceController = exports.AuthController = exports.HomeController = undefined;

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _place = require('./place');

var _place2 = _interopRequireDefault(_place);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HomeController = _home2.default;
exports.AuthController = _auth2.default;
exports.PlaceController = _place2.default;