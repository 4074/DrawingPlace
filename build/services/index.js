'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaceService = exports.UserService = undefined;

var _user = require('./user');

var _UserService = _interopRequireWildcard(_user);

var _place = require('./place');

var _PlaceService = _interopRequireWildcard(_place);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.UserService = _UserService;
exports.PlaceService = _PlaceService;