import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    
}, {
    collection: 'places'
})

export default mongoose.model('Place', schema)