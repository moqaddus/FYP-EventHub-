import userSchema from '../models/user.js'
import OrgSchema from '../models/organization.js'
import PlatformAdmin from '../models/platformAdmin.js'
import PlatfromUser from '../models/platformUser.js'
import bcrypt from 'bcryptjs';
//const bcrypt=require('bcryptjs');
import {v4 as uuidv4 } from 'uuid';
uuidv4();


export const register=async(req,res,next)=>{
  //if already registered(email)

  const {Username,Email,Password,type}=req.body
  try {
    //if already registered
    const emailInUse=await userSchema.exists({Email});
    const usernameInUse=await userSchema.exists({Password});
    if(emailInUse)
    {
      res.status(401).json({message:'Already registered with this email'})
    }
    if(usernameInUse)
    {
      res.status(401).json({message:'Username not available'})
    }
    else
    {

    //hashed passowrd
    const hashedPassword=await bcrypt.hash(Password,10);
    const user=new userSchema({ID:uuidv4(),Username:Username,Email:Email,Password:hashedPassword,type:type})
    await user.save();
    res.status(201).json({user:user})
    }
  } catch (error) {
    console.log({error});
    
  }
}

export const login=async(req,res,next)=>{

  const {Email,Password}=req.body
  try {
    const foundUser=await userSchema.findOne({Email:Email})
    //console.log('password:', password);
    //console.log('foundUser.password:', foundUser.password);
    if(!foundUser)
    {
      res.status(401).json({message:'User not found(invalid email'})
    }
    else
    {

      const match=await bcrypt.compare(Password,foundUser.Password);
      if(!match)
      {
        res.status(401).json({message:'Wrong password'})
      }
      else
      {
        //access token for that login
        try {
          //const token=foundUser.createJWT();
          //res.cookie('access_token', token, { httpOnly: true });
          res.status(200).json({name:foundUser.Username})


         // res.status(200).json({foundUser})
          
        } catch (error) {
          console.log(error);
        }
        
      }
    }
  } catch (error) {

    console.log(error)
    
  }
}

//NOT USING IT(Wrong).
//Not checked till now
export const getOneUser=async(req,res,next)=>{

  let finalFoundUser;
  try {
    const {id:_id}=req.params
    const foundUser=await userSchema.findOne({_id});
    if(!foundUser)
    {
      return res.status(200).json({message:'User Not found'})
    }
    else
    {
      if(foundUser.type="OrgAdmin")
      {
        const orgAdmin=await OrgSchema.findOne({ID:_id});
        finalFoundUser={...foundUser,...orgAdmin}
      }
      else if(foundUser.type="PlatformAdmin")
      {
        const platformAdmin=await PlatformAdmin.findOne({ID:_id});
        finalFoundUser={...foundUser,...platformAdmin}
      }
      else
      {
        const platformUser=await PlatfromUser.findOne({ID:_id});
        finalFoundUser={...foundUser,...platformUser}
      }
      return res.status(200).json({finalFoundUser});
    }
    
  } catch (error) {
    console.log(error)
    return res.status(409).json(error);
    
  }

}
