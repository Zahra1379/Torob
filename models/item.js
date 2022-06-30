import mongoose from 'mongoose'

const MarketItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    url: {
        type: String,
    }
});

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name should not be empty.'],
    },
    category: {
        type: String,
    },
    description: {
        type: String
    },
    details: {
        type: Map,
        of: String
    },
    markets: {
        type: [MarketItemSchema],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

ItemSchema.index({
    name: 'text', category: 'text', description: 'text', "markets.name": 'text',
}, {
    weights: {
        name: 5, category: 1, description: 1, "markets.name": 1,
    }
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)
