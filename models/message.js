import mongoose from 'mongoose';
const {Schema} =mongoose;

const messagesSchema = new Schema({
  ID: { type: Number, required: true },
  Message: { type: String, required: true },
  TimeStamp: { type: Date, default: Date.now },

  //Sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;