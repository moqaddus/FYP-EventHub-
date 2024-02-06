import PlatfromUser from '../models/platformUser.js'
import bcrypt from 'bcryptjs';
import InterestSchema from '../models/interest.js'
import userSchema from '../models/user.js'

let interestIds;
//will take id from params(foreign key)
export const addNewUser=async(req,res,next)=>{
  try {
    const {id:ID}=req.user;
  //let Interests=[]
  const {Bio,Interests}=req.body;
  if(Interests)
  {
    interestIds = await Promise.all(Interests.map(async (interestName) => {
      // Try to find the interest by name
      const interest = await InterestSchema.findOne({ Name: interestName });

      // If found, return the ID; otherwise, you might want to handle this case
      return interest ? interest._id : null;
    }));
  }

  const User=new PlatfromUser({ID,Interests:interestIds,Bio})
  User.save();
  res.status(201).json({user:User})
}
   catch (error) {
    console.log(error);
    
  }
}

//will get platfromUser id.
export const updateUser=async(req,res,next)=>{
  const {id:_id}=req.user
  const foundUser=await userSchema.findOne({_id});
  if(foundUser)
  {
    const {Password,Username}=req.body;
    if(Username)
    {
      const usernameInUse=await userSchema.exists({Username});
      res.status(409).json({message:'Username not available'})
    }
    if(Password || Username)
    {
      const hashedPassword=await bcrypt.hash(Password,10);
      req.body.Password=hashedPassword
      await userSchema.updateOne({_id},req.body)
    }
    const User=await PlatfromUser.updateOne({ID:_id},req.body)
    res.status(201).json({user:User})
  }
  else
  {
    res.status(404).json("User not found")
  }
  
}

//Will get id of platform user
export const getOneUser=async(req,res,next)=>{

  const {id:_id}=req.user;
  const foundUser=await userSchema.findOne({_id});
  if(foundUser)
  {
    const foundOne=await PlatfromUser.findOne({ID:_id});
    const newUser=({...foundOne,Username:foundUser.Username,Email:foundUser.Email})
    res.status(201).json({user:newUser})

  }
  else{
    return res.status(200).json({message:'User Not found'})
  }
}

//we will get platForm user id to be deleted in params
export const deleteUser=async(req,res,next)=>{

  try {
    const {id:_id}=req.user;
    const foundUser=await userSchema.findOne({_id});
    if(!foundUser)
    {
       return res.status(200).json({message:'User Not found'})
    }
  else
  {
    try {
      await PlatfromUser.deleteOne({ID:_id})
      try {
        await userSchema.deleteOne({_id})
        return res.status(201).json({message:'Successfully Deleted'})
      } catch (error) {
        return res.status(409).json({message:'Unable to delete Corresponding User obj'})
      }
    } catch (error) {
      return res.status(409).json({message:'Unable to delete Platform User'})
    }
    
  }
  } catch (error) {
    
  }
  

}

//getAll
  