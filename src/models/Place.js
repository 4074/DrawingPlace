import mongoose from 'mongoose'

const schema = new mongoose.Schema({

}, {
    collection: 'Places'
})

export default mongoose.model('Place', schema)