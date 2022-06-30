import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username should not be empty.'],
        maxlength: [60, 'username should not be longer than 60 characters.'],
    },
    password: {
        type: String,
        required: [true, 'password should not be empty.'],
    },
    email: {
        type: String,
        required: [true, 'email should not be empty.'],
    },
    roles: {
        type: [String],
    },
    markets: {
        type: [mongoose.Types.ObjectId],
    },
    favorites: {
        type: [mongoose.Types.ObjectId],
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
