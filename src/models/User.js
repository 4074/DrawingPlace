import mongoose from 'mongoose'
import crypto from 'crypto'
import validator from 'validator'
import moment from 'moment'

var schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String },
    mobile: { type: Number },
    avatar: { type: String },

    password: { type: String, default: '' },
    salt: { type: String, default: '' },

    level: { type: Number, default: 1 },
    role: { type: Number, default: 0 },
    status: {type: Number, default: 0 },
    
    create_at: { type: Date, default: Date.now }
}, {
    collection: 'users'
})

var defaultInfoProperties = 'username email level role status avatar addtime lasttime'.split(' ')

schema
    .virtual('password_origin')
    .set(function (source) {
        this.salt = this.makeSalt()
        this.password = this.encrypt(source)
    })
    .get(function () {
        return this.password_origin || ''
    })

schema.virtual('create_at_formatted').get(function(source){
    const t = moment(source).format('YYYY-MM-DD hh:mm:ss')
    return t
})

schema.path('username').validate(function (val) {
    var blen = val.length
    return blen >= 4 && blen <= 16
}, 'Length of {PATH} must be between 4 to 16')

// schema.path('email').validate(function (val) {
//     return validator.isEmail(val)
// }, '{PATH} is not email')


schema.methods = {

    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },

    encrypt: function (password) {
        if (!password) return ''
        let encrypted
        try {
            encrypted = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
            return encrypted
        } catch (err) {
            return ''
        }
    },

    authenticate: function (password) {
        return this.encrypt(password) === this.password
    },

    getDefaultInfo: function() {
        var result = {}
        var self = this
        defaultInfoProperties.forEach((name) => {
            result[name] = self[name]
        })

        return result
    },

    updateLoginLastTime: function() {
        this.lasttime = Date()
        this.save()
    }
}

schema.statics = {
    list: function (options, cb) {
        if(typeof options === 'function') {
            cb = options
            options = {}
        }
        var criteria = options.criteria || {}
        var self = this

        this.count(criteria, function (err, count) {
            if (err) return cb(err);

            if (count === 0) {
                return cb(null, [])
            }

            self.find(criteria)
                .sort({ 'addtime': -1 })
                .exec(function (err, data) {

                    if (err) return cb(err);
                    // cb(err, data.map((user)=> {
                    //     return user.getDefaultInfo()
                    // }))
                    cb(err, data)
                })

        })

    }
}

export default mongoose.model('User', schema)