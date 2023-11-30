import mongoose from 'mongoose';
const {Schema} =mongoose;


const attendeeSchema = new Schema({
  ID: { type: Number, required: true },
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'PlatformUser', required: true },///Change
  TicketCode: { type: String, required: true },
  CheckedIn: { type: Boolean, default: false },
  Rating: { type: Number },
  Review: { type: String },
});

const Attendee = model('Attendee', attendeeSchema);

module.exports = Attendee;