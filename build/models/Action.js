'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
    point: Object,
    user: String,
    create_at: Date
}, {
    collection: 'actions'
});

exports.default = _mongoose2.default.model('Action', schema);