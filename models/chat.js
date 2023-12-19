import mongoose from 'mongoose';
const {Schema} =mongoose;

const chatSchema = new Schema({
  ID: { type: Number, required: true },
  User1: { type: Number, required: true },
  User2: { type: Number, required: true },
  
});

const Chats = mongoose.model('Chats', chatSchema);

export default Chats;