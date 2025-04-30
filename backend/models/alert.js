import mongoose from 'mongoose';

const Alert = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  community: { 
    type: String, 
    required: true 
  },
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
  }
},
{
  timestamps: true,
});

export default mongoose.model('Alert', Alert);