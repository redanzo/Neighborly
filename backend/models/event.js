import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  community: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  }
});

export default mongoose.model('Event', Event);