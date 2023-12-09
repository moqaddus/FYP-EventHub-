import adminSchema from '../models/platformAdmin.js';
import eventSchema from '../models/event.js'
import PlatformAdmin from '../models/platformAdmin.js';


// export const ChangeEventStatus=async(req,res,next)=>{
//   try {
//    const {id:_id}=req.params;
//   const event=await eventSchema.findOne({_id});

//   if(event)
//   {
//     event.Status=req.body;
//   } 
//   } catch (error) {
//     console.log({error});
//   }
  

// }


//update
export const updateAdmin=async(req,res,next)=>{
  try {

    const {id:foundId}=req.params;
    await userSchema.updateOne({_id:foundId},req.body)
  } catch (error) {
    
  }
}