import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        community: {
            type: String,
            required: true,
        },
        address: {
            line1: {
                type: String,
                required: true,
            },
            line2: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
        },
    },
    {
        collection: 'users',
    }
);

export default mongoose.model('User', User);