import mongoose from 'mongoose';
const {Schema} =mongoose;

const userSchema=new Schema({
  ID: { type: Number, required: true },
  Email: { type: String, required: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  type:{ type: String, enum: ['PlatformAdmin','OrgAdmin','PlatformUser'], required: true },
},
{timestamps:true}
)


const User = mongoose.model('User', userSchema);

module.exports = User;