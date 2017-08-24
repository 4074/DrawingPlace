import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    point: Object,
    user: String,
    create_at: Date
}, {
    collection: 'actions'
})

export default mongoose.model('Action', schema)