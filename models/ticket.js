import mongoose from 'mongoose';
const {Schema} =mongoose;


const ticketSchema = new Schema({
  ID: { type: Number, required: true },
  UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'PlatformUser', required: true },///Change
  EventID:{ type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
  TicketCode: { type: String, required: true },
});

const ticket = model('Ticket', ticketSchema);

//module.exports = ticket
export default ticket