import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title should not be empty.'],
    },
    children: {
        type: Array
    }
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)
