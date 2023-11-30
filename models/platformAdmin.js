import mongoose from 'mongoose';
const {Schema} =mongoose;

const platformAdminSchema = new mongoose.Schema({
  ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],//array of objects of Event type..Dont know why
});

const PlatformAdmin = mongoose.model('PlatformAdmin', platformAdminSchema);

module.exports = PlatformAdmin;