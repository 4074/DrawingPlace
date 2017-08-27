'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    c: String,
    user: String,
    create_at: Date,
    update_at: Date
}, {
    collection: 'points'
});

exports.default = _mongoose2.default.model('Point', schema);