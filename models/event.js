import mongoose from 'mongoose';
const {Schema} =mongoose;

const eventSchema = new Schema({

  Name: { type: String, required: true },
  Description: { type: String },
  EventDate: { type: Date, required: true },
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: true },
  Location: { type: String, required: true },
  // Type: { type: String }, // If needed, uncomment this line
  TotalTickets: { type: Number, required: true },
  SoldTickets: { type: Number, required: true },
  TicketPrice:{type:Number,required:true},
  eventTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }],
  Status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },

  ApprovedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'PlatformAdmin' },
  Organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  Media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
});

const Event = mongoose.model('Event', eventSchema);

export default Event;