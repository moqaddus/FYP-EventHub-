import mongoose from 'mongoose';
const {Schema} =mongoose;

const orgSchema=new Schema({
  ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Status: { type: String, enum: ['Gold', 'Silver', 'Bronze'], required: true },
//Organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  Description: { type: String },
  OrganizationEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  SendMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],//Added

},
{timestamps:true}
);

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;