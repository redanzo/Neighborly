import mongoose from 'mongoose';

const LostPet = new mongoose.Schema({
  title: { 
    type: String, 
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

export default mongoose.model('LostPet', LostPet);