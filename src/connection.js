import mongoose from 'mongoose'
import bluebird from 'bluebird'
import config from './config'

mongoose.Promise = bluebird

export default mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.name, {
    useMongoClient: true
})