import mongoose from 'mongoose';
const {Schema} =mongoose;

const interestSchema = new Schema({
  ID: { type: Number, required: true },
  Name: { type: String, required: true },
  Users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Interests = mongoose.model('Interests', interestSchema);

module.exports = Interests;