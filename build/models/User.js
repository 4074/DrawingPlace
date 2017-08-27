'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose2.default.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String },
    mobile: { type: Number },
    avatar: { type: String },

    password: { type: String, default: '' },
    salt: { type: String, default: '' },

    level: { type: Number, default: 1 },
    role: { type: Number, default: 0 },
    status: { type: Number, default: 0 },

    create_at: { type: Date, default: Date.now }
}, {
    collection: 'users'
});

var defaultInfoProperties = 'username email level role status avatar addtime lasttime'.split(' ');

schema.virtual('password_origin').set(function (source) {
    this.salt = this.makeSalt();
    this.password = this.encrypt(source);
}).get(function () {
    return this.password_origin || '';
});

schema.virtual('create_at_formatted').get(function (source) {
    var t = (0, _moment2.default)(source).format('YYYY-MM-DD hh:mm:ss');
    return t;
});

schema.path('username').validate(function (val) {
    var blen = val.length;
    return blen >= 4 && blen <= 16;
}, 'Length of {PATH} must be between 4 to 16');

// schema.path('email').validate(function (val) {
//     return validator.isEmail(val)
// }, '{PATH} is not email')


schema.methods = {

    makeSalt: function makeSalt() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },

    encrypt: function encrypt(password) {
        if (!password) return '';
        var encrypted = void 0;
        try {
            encrypted = _crypto2.default.createHmac('sha1', this.salt).update(password).digest('hex');
            return encrypted;
        } catch (err) {
            return '';
        }
    },

    authenticate: function authenticate(password) {
        return this.encrypt(password) === this.password;
    },

    getDefaultInfo: function getDefaultInfo() {
        var result = {};
        var self = this;
        defaultInfoProperties.forEach(function (name) {
            result[name] = self[name];
        });

        return result;
    },

    updateLoginLastTime: function updateLoginLastTime() {
        this.lasttime = Date();
        this.save();
    }
};

schema.statics = {
    list: function list(options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }
        var criteria = options.criteria || {};
        var self = this;

        this.count(criteria, function (err, count) {
            if (err) return cb(err);

            if (count === 0) {
                return cb(null, []);
            }

            self.find(criteria).sort({ 'addtime': -1 }).exec(function (err, data) {

                if (err) return cb(err);
                // cb(err, data.map((user)=> {
                //     return user.getDefaultInfo()
                // }))
                cb(err, data);
            });
        });
    }
};

exports.default = _mongoose2.default.model('User', schema);