import mongoose from 'mongoose';

const Alert = new mongoose.Schema({
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