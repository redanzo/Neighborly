import mongoose from 'mongoose';

// Define the User schema
const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        tutor: { type: Boolean, default: false },
    },
    {
        collection: 'users',
    }
);

// Export the User model
export default mongoose.model('User', User);