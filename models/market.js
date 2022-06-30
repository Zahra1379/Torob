import mongoose from 'mongoose'

const MarketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

export default mongoose.models.Market || mongoose.model('Market', MarketSchema)
