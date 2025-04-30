import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import multer from 'multer';

import mongoose from 'mongoose';
import User from './models/user.js';
import Alert from './models/alert.js';
import Event from './models/event.js';
import LostPet from './models/lostpet.js';
import Marketplace from './models/marketplace.js';
import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

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
            community: user.community
        });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

app.post('/api/alert', upload.single('image'), async (req, res) => {
    const { email, community, title, description } = req.body;
    
    const payload = { email, community, title, description };

    if(req.file){
        payload.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    try {
        await Alert.create(payload);
        return res.json({ status: 'ok' });
    } 
    catch (error) {
        console.error('Error saving alert:', error);
        return res.json({ status: 'error', error: 'Failed to save alert' });
    }
});

app.post('/api/event', upload.none(), async (req, res) => {
    const { email, community, description, date } = req.body;

    const event = new Event({
        email,
        community,
        description,
        date,
    });

    try {
        await event.save();
        return res.json({ status: 'ok' });
    } catch (error) {
        console.error('Error saving event:', error);
        return res.json({ status: 'error', error: 'Failed to save event' });
    }
});

app.post('/api/lostPet', upload.single('image'), async (req, res) => {
    const { email, community, title, description } = req.body;
    if(!req.file){
        return res.status(400).json({ status: 'error', error: 'No file uploaded' });
    }

    const lostPet = new LostPet({
        email,
        community,
        title,
        description,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        } 
    });

    try {
        await lostPet.save();
        return res.json({ status: 'ok' });
    } catch (error) {
        console.error('Error saving lost pet:', error);
        return res.json({ status: 'error', error: 'Failed to save lost pet' });
    }
});

app.post('/api/marketplace', upload.single('image'), async (req, res) => {
    const { email, community, title, price, description } = req.body;
    if(!req.file){
        return res.status(400).json({ status: 'error', error: 'No file uploaded' });
    }

    const item = new Marketplace({
        email,
        community,
        title,
        price,
        description,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        } 
    });

    try {
        await item.save();
        return res.json({ status: 'ok' });
    } catch (error) {
        console.error('Error saving marketplace item:', error);
        return res.json({ status: 'error', error: 'Failed to save item' });
    }
});

app.get('/api/posts', async (req, res) => {
    const community = req.headers['community'];

    try {
      const [marketplace, alerts, events, lostPets] = await Promise.all([
        Marketplace.find({community}).lean(),
        Alert.find({community}).lean(),
        Event.find({community}).lean(),
        LostPet.find({community}).lean()
      ]);
  
      return res.json({
        status: 'ok',
        marketplace: marketplace,
        alerts: alerts,
        events: events,
        lostPets: lostPets
      });
    } 
    catch (error) {
      console.error('Error fetching posts:', error);
      return res
        .status(500)
        .json({ status: 'error', error: 'Failed to fetch posts' });
    }
});

app.listen(1337, () => {
    console.log('Server started on 1337')
})

app.get('/api/weather', async (req, res) => {
    const lat = req.query.lat || 32.7767;
    const lon = req.query.lon || -96.7970; //default set to Dallas TX
    const apiKey = process.env.OPENWEATHER_API_KEY;
  
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            units: 'imperial',
            appid: apiKey
          }
        }
      );
      res.json(response.data);
    } catch (err) {
      console.error('Weather fetch error:', err.response?.data || err.message); 
      res.status(500).json({ error: 'Failed to fetch weather' });
    }
  });
  