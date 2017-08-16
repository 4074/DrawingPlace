import mongoose from 'mongoose'
import session from 'express-session'
import connectMongo from 'connect-mongo'

import config from './config'

export default function initSession() {
    const MongoStore = connectMongo(session)
    const sess = {
        key: config.app.name + '-session',
        secret: config.app.name,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            maxAge: 30 * 24 * 3600 * 1000
        }   
    }
    
    return session(sess)
}