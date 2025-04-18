import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import mongoose from 'mongoose';
import User from './models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.post('/api/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            community: req.body.community,
            address: {
                line1: req.body.address.line1,
                line2: req.body.address.line2,
                city: req.body.address.city,
                state: req.body.address.state,
                zip: req.body.address.zip
            }
        });
        await user.save();
        return res.json({ status: 'ok' });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return res.json({ status: 'error', error: 'Duplicate email' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });
    if (!user) {
        return res.json({ status: 'error', error: 'invalid login' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
    if (isPasswordValid) {
        const token = await new SignJWT({
            name: user.name,
            email: user.email,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .sign(new TextEncoder().encode(process.env.JWTKey));

        return res.json({
            status: 'ok',
            user: token,
        });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

app.listen(1337, () => {
    console.log('Server started on 1337')
})