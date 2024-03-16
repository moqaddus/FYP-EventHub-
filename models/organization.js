import mongoose from 'mongoose';
const {Schema} =mongoose;

const orgSchema=new Schema({
  ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Status: { type: String, enum: ['Gold', 'Silver', 'Bronze'] },
//Organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  Description: { type: String },
  ImagePath:{type:String}, //change
  OrganizationEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event',required:false }],
  SendMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message',required:false }],//Added

},
{timestamps:true}
);

const Organization = mongoose.model('Organization', orgSchema);

export default Organization;