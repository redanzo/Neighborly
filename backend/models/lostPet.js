import mongoose from 'mongoose';

const LostPet = new mongoose.Schema({
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

export default mongoose.model('LostPet', LostPet);