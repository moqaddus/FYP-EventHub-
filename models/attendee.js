import mongoose from 'mongoose';
const {Schema} =mongoose;


const attendeeSchema = new Schema({
  ID: { type: Number, required: true },
  Ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'ticket', required: true },
  CheckedIn: { type: Boolean, default: false },
  Rating: { type: Number },
  Review: { type: String },
});

const Attendee = model('Attendee', attendeeSchema);

export default Attendee;
//module.exports = Attendee;