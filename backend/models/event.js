import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: {
    data: Buffer,
    contentType: String
  },
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
});

export default mongoose.model('Event', Event);