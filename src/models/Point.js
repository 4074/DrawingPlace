import mongoose from 'mongoose'

const schema = new mongoose.Schema({
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
})

export default mongoose.model('Point', schema)