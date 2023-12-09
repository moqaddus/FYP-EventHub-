import OrgSchema from '../models/organization.js'


//We will get the id of user registered just now--> will go to next page to take description and Subscription
//type from useer(Status) and make new organization using ID,Description and Status.
export const addNewOrg=async(req,res,next)=>{
  try {
    const {id}=req.params
  const {Description,Status}=req.body;
  const org=new OrgSchema({ID:id,Description,Status})
  await org.save();
  res.status(201).json({organization:org}) 
  } catch (error) {
    console.log({error});
  }
 
}

