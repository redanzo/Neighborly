const express = require('express');
const app = express();
const cors = require('cors');
const jose = require('jose');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/user.js');

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const tutor = req.body.role === 'tutor' ? true : false;
        
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            tutor: tutor,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: err });
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
        const token = await new jose.SignJWT({
            name: user.name,
            email: user.email,
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .sign(new TextEncoder().encode(process.env.JWTKey));

        return res.json({
            status: 'ok',
            user: token,
            tutor: user.tutor
        });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

module.exports = app;