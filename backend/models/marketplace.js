import mongoose from 'mongoose';

const Marketplace = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  contact: { 
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

export default mongoose.model('Marketplace', Marketplace);