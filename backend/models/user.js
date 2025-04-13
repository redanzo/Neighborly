import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        collection: 'users',
    }
);

export default mongoose.model('User', User);